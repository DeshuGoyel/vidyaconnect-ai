import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { formatRupee } from "@/utils/formatters";

export default function ParentPaymentsPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Payments</h1>
      <Card className="mt-5">
        <p className="text-sm font-bold text-ink-400">VidyaWallet Balance</p>
        <p className="mt-2 font-heading text-5xl font-extrabold text-ink-800">{formatRupee(1200)}</p>
      </Card>
      <Button className="mt-5">Add Money</Button>
      <Card className="mt-5">
        <p className="font-semibold text-ink-500">Math tuition invoice • {formatRupee(3200)}</p>
        <p className="mt-2 font-semibold text-ink-500">Wallet topup • {formatRupee(1000)}</p>
      </Card>
    </PageWrapper>
  );
}
