# VidyaConnect AI 🎓
### India's First AI-Powered Tutoring Marketplace
**Built for OpenAI Build Week 2026 · Education Track · GPT-5.6 + Codex**

---

## 🎯 What It Does

VidyaConnect AI solves a real, massive problem: **230M+ Indian students rely on neighborhood tutors with zero quality control, zero AI assistance, and zero progress tracking.**

No platform today puts AI *inside* the actual 1-on-1 tutoring session. VidyaConnect changes that.

### 3 GPT-5.6 Features That Make It Genuinely Novel

| Feature | What it does |
|---------|-------------|
| **AI Match Engine** | 5-question diagnostic → GPT-5.6 matches student to best teacher by learning style (not just keyword search) |
| **Session Co-Pilot** | Teacher enters topic → GPT-5.6 generates structured explanation, 5 practice questions, printable worksheet in 3 languages |
| **Misconception Diagnosis** | Student's wrong answer → GPT-5.6 diagnoses the exact mental model causing the mistake, then corrects it |

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd vidyaconnect-ai-lovable-dev-mega-prompt
npm install

# 2. Setup environment (optional — demo works without API key)
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local for live GPT-5.6 output

# 3. Run
npm run dev
# → http://localhost:3000
```

**Works without API key** — all features run in demo mode with rich mock responses.

---

## 📱 Demo Flow (for video)

1. **`/`** — Landing page (dark, premium)
2. **`/signup`** — 5-question AI diagnostic → match result
3. **`/home`** — Home feed with teacher carousels
4. **`/teachers`** — Search + filter teacher discovery
5. **`/session`** ⭐ — **The star feature:**
   - Click "Class 10 Quadratic Equations" (pre-filled)
   - Toggle language to "Hinglish"
   - Add misconception: *"Student ne socha ki x=5 hoga"*
   - Click Generate → watch GPT-5.6 diagnose + teach
   - Click "Download / Print Worksheet"

---

## 🤖 How I Collaborated with Codex & GPT-5.6

The core of VidyaConnect Co-Pilot was built with Codex. I used Codex to scaffold the Next.js application, write the API routes, and structure the GPT-5.6 prompt pipeline that powers the Session Co-Pilot. Where I had to make product and engineering decisions — for example, choosing to start the output with a misconception diagnosis rather than a plain correction, and adding the Hindi/English/Hinglish output toggle for Indian tutors — I directed Codex and iterated on its output until the behavior was right.

GPT-5.6 is the reasoning engine of the product. When a tutor enters a topic, the student's class, and the specific mistake the student made, GPT-5.6 reverse-engineers the misconception behind that exact error and generates a level-appropriate explanation, five practice questions with answers, and a printable worksheet. The verbatim, source-grounded style of the prompts (built and refined in Codex) is what keeps the output reliable rather than generic.

Codex accelerated the parts that would otherwise have taken days — boilerplate, wiring, and error handling — so my time went into the product decisions that make this genuinely useful for India's neighborhood tutors.

### Where Codex was used specifically
- **Scaffolding** — `create-next-app`, folder structure, TypeScript config
- **API routes** — `/api/copilot`, `/api/match`, `/api/report` with timeout, AbortController, and mock fallback
- **Prompt engineering** — iterative refinement of the misconception diagnosis prompt (the key differentiator)
- **Component wiring** — `TeacherCard`, `BottomNav`, `PageWrapper`, `Button` — all written and debugged in Codex
- **Design system** — Tailwind v4 `@theme` block, custom shadows, animation keyframes

---

## 🏗️ Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS v4** (custom design system)
- **framer-motion** (micro-animations)
- **lucide-react** (icons)
- **OpenAI SDK** (GPT-5.6 API)

---

## 📁 Project Structure

```
app/
  page.tsx              ← Landing (dark premium hero)
  login/page.tsx        ← Auth
  signup/page.tsx       ← AI diagnostic quiz + match
  home/page.tsx         ← Home feed
  teachers/page.tsx     ← Discovery with filters
  session/page.tsx      ← AI Session Co-Pilot ⭐
  api/
    match/route.ts      ← GPT-5.6 teacher matching
    copilot/route.ts    ← GPT-5.6 session assistant
    report/route.ts     ← Learning DNA report
components/
  ui/Button.tsx
  layout/BottomNav.tsx
  layout/PageWrapper.tsx
  teachers/TeacherCard.tsx
lib/
  data.ts               ← Mock data
  openai.ts             ← OpenAI client
  utils.ts
```

---

## 🔑 Environment Variables

```env
OPENAI_API_KEY=sk-...   # Optional — demo runs without it
```

---

## ✨ Key Innovation

The **Misconception Diagnosis** feature is what separates VidyaConnect from every other EdTech platform:

Instead of just saying "the answer is X", GPT-5.6:
1. Identifies the exact wrong mental model the student used
2. Explains *why* that rule doesn't apply here
3. Bridges from the student's wrong thinking to the correct understanding

This is how expert human tutors think — and no existing platform automates this.

---

*VidyaConnect AI — Built with Codex + GPT-5.6 for OpenAI Build Week 2026*
