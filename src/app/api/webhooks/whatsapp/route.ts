import { NextResponse } from "next/server";
import { getTeachers, getBookings, getLatestReport } from "@/lib/supabase/queries";

// Process-wide memory state map to track conversation session by sender phone number
// Supported states: "IDLE" | "AWAITING_SEARCH"
const sessions = new Map<string, { state: string; lastActivity: number }>();

const SESSION_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes session expiration

function getSession(phone: string) {
  const now = Date.now();
  const session = sessions.get(phone);
  if (session && now - session.lastActivity < SESSION_TIMEOUT_MS) {
    session.lastActivity = now;
    return session;
  }
  const newSession = { state: "IDLE", lastActivity: now };
  sessions.set(phone, newSession);
  return newSession;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const phone = String(form.get("From") ?? "").replace("whatsapp:", "").trim();
    const body = String(form.get("Body") ?? "").trim();

    if (!phone) {
      return new NextResponse(`<Response><Message>Error: Phone number is missing.</Message></Response>`, {
        headers: { "Content-Type": "text/xml" }
      });
    }

    const session = getSession(phone);
    let reply = "";

    // STATE MACHINE LOGIC
    if (session.state === "IDLE") {
      if (body === "1") {
        session.state = "AWAITING_SEARCH";
        reply = "📚 Konsa subject padhna hai aur aapki locality kya hai?\n\n(Example reply: *Maths, Indiranagar*)";
      } else if (body === "2") {
        // Query current student bookings from database
        const dbBookings = await getBookings();
        const dbTeachers = await getTeachers();
        if (dbBookings.length > 0) {
          const bookingList = dbBookings.map((b, idx) => {
            const dateStr = new Date(b.scheduled_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit"
            });
            const t = dbTeachers.find(teach => teach.id === b.teacher_id);
            const teacherName = t?.user?.name ?? "Ananya Sharma";
            return `*${idx + 1}. ${b.subject}* (${b.session_type === "home" ? "🏠 Home Visit" : "💻 Online"})\n📅 ${dateStr}\n👨‍🏫 Teacher: ${teacherName}\n📝 Notes: ${b.notes ?? "None"}`;
          }).join("\n\n");
          reply = `🗓️ *Aapki aane wali classes:*\n\n${bookingList}\n\n*Reply karein:* \n0️⃣ Main Menu par wapas jane ke liye.`;
        } else {
          reply = "🔍 Aapki koi upcoming tuition bookings nahi mili.\n\n*Reply karein:* \n0️⃣ Main Menu par wapas jane ke liye.";
        }
      } else if (body === "3") {
        // Fetch AI Progress report from database
        const report = await getLatestReport();
        const score = report.overall_score;
        const style = report.learning_dna?.style ?? "Visual + Practice-led";
        const recList = report.recommendations.map((r, idx) => `*${idx + 1}. ${r.title}* - ${r.body}`).join("\n");
        const alertsList = report.alerts.map((a) => `${a.level === "urgent" ? "⚠️" : "💡"} ${a.title}: ${a.body}`).join("\n");

        reply = `🤖 *AI Weekly Report Summary:*\n\n📈 *Overall Score:* ${score}%\n🔄 *Attendance:* ${report.attendance_percentage}%\n🧬 *Learning DNA:* ${style}\n\n📝 *AI Summary (Hindi):*\n_"${report.summary_text}"_\n\n💡 *Smart Alerts:*\n${alertsList}\n\n🎯 *Actionable Recommendations:*\n${recList}\n\n*Reply karein:* \n0️⃣ Main Menu par wapas jane ke liye.`;
      } else if (body === "4") {
        reply = "📞 *VidyaConnect AI Help & Support:*\n\nNeed assistance? Humare team se connect karne ke liye support@vidyaconnect.in par email karein ya direct portal par chat support open karein!\n\n*Reply karein:* \n0️⃣ Main Menu par wapas jane ke liye.";
      } else {
        // Default Greet Menu
        reply = "Namaste! 🙏 Main *VidyaConnect AI* hoon. Pan-India's #1 tuition matching platform.\n\nAap aaj kya dhoondh rahe hain? Please type options *1*, *2*, *3*, or *4*:\n\n1️⃣ Teacher dhundna hai (Find Local Tutor)\n2️⃣ Booking dekhni hai (View Schedule)\n3️⃣ Progress report chahiye (Weekly AI Report)\n4️⃣ Help chahiye (Get Support)";
      }
    } else if (session.state === "AWAITING_SEARCH") {
      if (body === "0") {
        session.state = "IDLE";
        reply = "Namaste! 🙏 Main *VidyaConnect AI* hoon.\n\n1️⃣ Teacher dhundna hai\n2️⃣ Booking dekhni hai\n3️⃣ Progress report chahiye\n4️⃣ Help chahiye";
      } else {
        // Parse subject and locality from user text (e.g. "Maths, Indiranagar")
        const parts = body.split(",").map(p => p.trim().toLowerCase());
        const searchSubject = parts[0] || "";
        const searchLocality = parts[1] || "";

        // Query matching teachers from database
        const dbTeachers = await getTeachers();
        const matches = dbTeachers.filter(t => {
          const subjectMatch = searchSubject ? t.subjects?.some(s => s.toLowerCase().includes(searchSubject)) : true;
          const userLocality = t.user?.locality?.toLowerCase() ?? "";
          const userCity = t.user?.city?.toLowerCase() ?? "";
          const localityMatch = searchLocality ? (userLocality.includes(searchLocality) || userCity.includes(searchLocality)) : true;
          return subjectMatch && localityMatch;
        });

        const activeMatches = matches.length > 0 ? matches : dbTeachers.slice(0, 2);

        const listStr = activeMatches.map((t, idx) => {
          const name = t.user?.name ?? "Teacher";
          const locality = t.user?.locality ?? "Local";
          return `*${idx + 1}. ${name}* (⭐ ${t.rating} | ${t.experience_years} Yrs Exp)\n📍 Locality: ${locality}\n📚 Subjects: ${t.subjects?.join(", ") ?? ""}\n💰 Rate: ₹${t.price_home}/hr (Home Visit)\n🤖 AI Match Score: *${t.ai_match_score}%*\n_"Yeh teacher aapke area ke paas hain aur CBSE curriculum specialist hain."_`;
        }).join("\n\n");

        session.state = "IDLE";
        reply = `🎯 *AI ne aapke area mein ${activeMatches.length} best teachers dhoondhe hain:*\n\n${listStr}\n\n🎉 *Demo Book karne ke liye humari app download karein:* vidyaconnect.in\n\n0️⃣ Main Menu par wapas jane ke liye.`;
      }
    }

    return new NextResponse(`<Response><Message>${reply}</Message></Response>`, {
      headers: { "Content-Type": "text/xml" }
    });
  } catch (error) {
    console.error("WhatsApp webhook failed:", error);
    return new NextResponse(`<Response><Message>Technical issue occurred. Please try again later.</Message></Response>`, {
      headers: { "Content-Type": "text/xml" }
    });
  }
}
