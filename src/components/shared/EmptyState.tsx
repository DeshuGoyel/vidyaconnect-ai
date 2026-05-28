import { Button } from "@/components/ui/button";

export function EmptyState({ title, body, action }: { title: string; body: string; action?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-saffron-50 text-2xl">✨</div>
      <h3 className="font-heading text-xl font-extrabold text-ink-800">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-400">{body}</p>
      {action ? <Button className="mt-5">{action}</Button> : null}
    </div>
  );
}
