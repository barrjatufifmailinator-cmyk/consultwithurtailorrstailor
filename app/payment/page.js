import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
