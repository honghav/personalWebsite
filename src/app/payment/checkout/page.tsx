"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // More reliable than base64
import { generateABAQR } from "@/app/api/actions/aba-qr";

export default function ABACheckout() {
    const [qrData, setQrData] = useState<{ qrString: string; abapay_deeplink: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const amount = 1.0;

    const handleGeneratePayment = async () => {
        setLoading(true);
        setError("");

        try {
            // Replace with your actual dynamic amount and unique ID
            const tranId = `INV-${Date.now()}`;

            const result = await generateABAQR(amount, tranId);

            if (result?.status?.code === "0") {
                setQrData({
                    qrString: result.qrString,
                    abapay_deeplink: result.abapay_deeplink
                });
            } else {
                setError(result?.status?.message || "Failed to generate QR");
            }
        } catch (err) {
            setError("System connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* ABA Logo Placeholder */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-900">ABA PayWay</h2>
                    <p className="text-gray-500 text-sm">Secure KHQR Payment</p>
                </div>

                {!qrData ? (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 font-medium">Total Amount</p>
                            <p className="text-3xl font-bold text-blue-900">$1.00</p>
                        </div>

                        <button
                            onClick={handleGeneratePayment}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Pay with ABA QR"}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                ) : (
                    <div className="p-4 border rounded shadow-lg bg-white">
                        <h3 className="font-bold mb-2 text-blue-800">Scan to Pay</h3>

                        {/* Render the QR code using the string from ABA */}
                        <QRCodeSVG value={qrData.qrString} size={256} />

                        <div className="mt-4">
                            <p className="text-gray-600">Total: ${amount}</p>
                            <a href={qrData.abapay_deeplink} className="text-blue-500 font-bold block mt-2">
                                Open in ABA App
                            </a>
                        </div>
                    </div>
                ) }

                <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest">
                    Powered by ABA Bank
                </p>
            </div>
        </div>
    );
}