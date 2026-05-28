import { Badge } from "@/components/ui/badge";

export function MapFilters() {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {["500m", "1km", "2km", "5km", "Math", "₹500-₹1000", "4.5+"].map((filter, index) => (
        <Badge key={filter} tone={index === 0 ? "saffron" : "dark"} className="shrink-0">{filter}</Badge>
      ))}
    </div>
  );
}
