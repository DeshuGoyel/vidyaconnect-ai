import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-extrabold text-ink-800">
      <Star className="h-4 w-4 fill-warning text-warning" />
      {rating.toFixed(1)}
    </span>
  );
}
