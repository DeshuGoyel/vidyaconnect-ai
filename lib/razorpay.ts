import { formatRupee } from "@/utils/formatters";

export async function startRazorpayCheckout(amount: number) {
  return {
    status: "mocked",
    message: `${formatRupee(amount)} payment flow is ready for Razorpay SDK wiring.`
  };
}
