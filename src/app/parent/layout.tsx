import { BottomNav } from "@/components/layout/BottomNav";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      {children}
      <BottomNav />
    </div>
  );
}
