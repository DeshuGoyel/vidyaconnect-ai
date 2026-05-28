import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-ink-100 bg-white p-6 lg:block">
      <h2 className="font-heading text-xl font-extrabold text-ink-800">VidyaConnect</h2>
      <nav className="mt-8 grid gap-3 text-sm font-bold text-ink-500">
        <Link href="/home">Student Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/report">Parent Report</Link>
        <Link href="/teacher/dashboard">Teacher</Link>
      </nav>
    </aside>
  );
}
