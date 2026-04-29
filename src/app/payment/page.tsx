"use client";

import { useState } from "react";

interface QrData {
    tran_id: string;
    qrImage: string;
    qrString: string;
    amount: number;
    currency: string;
    abapay_deeplink: string;
}

export default function PaymentPage() {
    const [qrData, setQrData] = useState<QrData | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleGenerateQr() {
        setLoading(true);
        setError(null);
        setQrData(null);

        const res = await fetch("/api/payment/generate-qr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: 0.01,
                currency: "USD",
                customerInfo: {
                    firstName: "ABA",
                    lastName: "Bank",
                    email: "aba.bank@gmail.com",
                    phone: "012345678",
                },
                items: [{ name: "Test Product", quantity: 1, price: 0.01 }],
            }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(`Error ${data.code}: ${data.error}`);
            return;
        }

        setQrData(data);
        pollPaymentStatus(data.tran_id);
    }

    async function pollPaymentStatus(tran_id: string) {
        const interval = setInterval(async () => {
            const res = await fetch("/api/payment/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tran_id }),
            });
            const data = await res.json();
            const status = data?.data?.payment_status;

            if (status === "APPROVED") {
                setPaymentStatus("✅ Payment Successful!");
                clearInterval(interval);
            } else if (status === "FAILED" || status === "CANCELLED") {
                setPaymentStatus("❌ Payment Failed");
                clearInterval(interval);
            }
        }, 3000);

        setTimeout(() => clearInterval(interval), 600_000);
    }

    return (
        <div className="max-w-md mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold mb-6">ABA PayWay Checkout</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {!qrData && !paymentStatus && (
                <button
                    onClick={handleGenerateQr}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Generating QR..." : "Pay $0.01 USD"}
                </button>
            )}

                        {qrData && !paymentStatus && (
                                <div className="space-y-4">
                                        <p className="text-gray-500">Scan with ABA Mobile or KHQR app</p>

                                        {/* Use <img> directly with base64 — no next/image domain config needed */}
                                        {qrData.qrImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                        src={qrData.qrImage}
                                                        alt="ABA Pay QR Code"
                                                        width={300}
                                                        height={300}
                                                        className="mx-auto border rounded-xl"
                                                />
                                        ) : (
                                                <p className="text-red-500">QR image not available</p>
                                        )}

                                        <p className="font-semibold">
                                                Amount: {qrData.amount} {qrData.currency}
                                        </p>

                                        <a
                                                href={qrData.abapay_deeplink}
                                                className="block bg-red-600 text-white px-6 py-3 rounded-lg"
                                        >
                                                Open in ABA Mobile App
                                        </a>

                                        <p className="text-sm text-gray-400 animate-pulse">
                                                Waiting for payment...
                                        </p>
                                </div>
                        )}

                        {paymentStatus && (
                                <div className="text-xl font-bold mt-6">{paymentStatus}</div>
                        )}
                </div>
        );
}