export function AttendanceHeatmap() {
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 30 }, (_, index) => (
        <span
          key={index}
          className={`h-6 rounded-md ${index % 7 === 0 ? "bg-danger/50" : index % 4 === 0 ? "bg-ink-100" : "bg-success/70"}`}
        />
      ))}
    </div>
  );
}
