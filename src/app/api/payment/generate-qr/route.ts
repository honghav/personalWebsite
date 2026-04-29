import { NextRequest, NextResponse } from "next/server";
import {   generateHash,
  getReqTime,
  generateTranId,
  encodeItems,
  encodeUrl, } from "../../../../../lib/aba-hash";


const MERCHANT_ID = process.env.ABA_MERCHANT_ID!;
const API_KEY = process.env.ABA_API_KEY!;
const BASE_URL = process.env.ABA_SANDBOX_URL!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency, customerInfo, items } = body;

    const req_time = getReqTime();
    const tran_id = generateTranId();
    const encodedItems = encodeItems(items);
    const callback_url = encodeUrl(`${APP_URL}/api/payment/callback`);

    // Format amount as string with 2 decimal places for hash
    const amountStr = parseFloat(amount).toFixed(2);

    // ⚠️ Field order MUST match ABA docs exactly
    const orderedFields: [string, string | number | null][] = [
      ["req_time",            req_time],
      ["merchant_id",         MERCHANT_ID],
      ["tran_id",             tran_id],
      ["first_name",          customerInfo.firstName],
      ["last_name",           customerInfo.lastName],
      ["email",               customerInfo.email],
      ["phone",               customerInfo.phone],
      ["amount",              amountStr],
      ["purchase_type",       "purchase"],
      ["payment_option",      "abapay_khqr"],
      ["items",               encodedItems],
      ["currency",            currency],
      ["callback_url",        callback_url],
      ["return_deeplink",     ""],
      ["custom_fields",       ""],
      ["return_params",       ""],
      ["payout",              ""],
      ["lifetime",            10],
      ["qr_image_template",   "template3_color"],
    ];

    const hash = generateHash(orderedFields, API_KEY);

    // Build payload object preserving the same order
    const payload: Record<string, string | number | null> = {};
    for (const [k, v] of orderedFields) {
      payload[k] = v;
    }
    payload.hash = hash;

    console.log("=== PAYLOAD TO ABA ===");
    console.log(JSON.stringify(payload, null, 2));

    const abaRes = await fetch(
      `${BASE_URL}/api/payment-gateway/v1/payments/generate-qr`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await abaRes.json();

    console.log("=== ABA RESPONSE ===");
    console.log(JSON.stringify(data, null, 2));

    if (data.status?.code !== "0") {
      return NextResponse.json(
        {
          error: data.status?.message ?? "ABA error",
          code: data.status?.code,
          trace_id: data.status?.trace_id,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      tran_id,
      qrImage: data.qrImage,       // "data:image/png;base64,..."
      qrString: data.qrString,
      abapay_deeplink: data.abapay_deeplink,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error("generate-qr error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}