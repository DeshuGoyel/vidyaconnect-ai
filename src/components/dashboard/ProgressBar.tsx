export function ProgressBar({ label, value, thin = false }: { label: string; value: number; thin?: boolean }) {
  const color = value > 75 ? "bg-success" : value >= 50 ? "bg-warning" : "bg-danger";
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-extrabold text-ink-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className={`overflow-hidden rounded-full bg-ink-100 ${thin ? "h-1" : "h-2"}`}>
        <div className={`${color} h-full rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
