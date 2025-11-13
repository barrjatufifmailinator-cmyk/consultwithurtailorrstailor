"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PaystackButton from "../../components/PaystackButton.mjs";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("Consultation");
  const [price, setPrice] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const t = searchParams.get("title") || "Consultation";
    const p = Number(searchParams.get("price")) || 0;
    const e = searchParams.get("email") || "";
    setTitle(t);
    setPrice(p);
    setEmail(e);
  }, [searchParams]);

  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
    router.push("/payment/confirmation");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center font-didot">
      <h1 className="text-3xl md:text-5xl font-bold text-[#800020] mb-6">
        Complete Your Payment
      </h1>

      <p className="text-lg md:text-xl mb-6">
        You are booking: <span className="font-semibold">{title}</span>
      </p>
      <p className="text-lg md:text-xl mb-8">
        Amount: <span className="font-bold">₵{price}</span>
      </p>

      <PaystackButton
        email={email || "customer@example.com"}
        amount={price}
        onSuccess={handlePaymentSuccess}
      />

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-transform duration-300 hover:scale-105"
      >
        Back to Home
      </button>
    </div>
  );
}
