import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { formatRupee } from "@/utils/formatters";

export default function TeacherEarningsPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Earnings</h1>
      <Card className="mt-5">
        <p className="text-sm font-bold text-ink-400">This month total</p>
        <p className="mt-2 font-heading text-5xl font-extrabold text-ink-800">{formatRupee(28600)}</p>
        <p className="mt-2 text-sm font-semibold text-ink-500">Pending: {formatRupee(4200)} • Cleared: {formatRupee(24400)}</p>
      </Card>
      <Card className="mt-5"><EarningsChart /></Card>
      <Button className="mt-5 w-full">Withdraw</Button>
    </PageWrapper>
  );
}
