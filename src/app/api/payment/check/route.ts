import { NextRequest, NextResponse } from "next/server";
import { generateHash, getReqTime } from "../../../../../lib/aba-hash";

const API_KEY = process.env.ABA_API_KEY || "";
const MERCHANT_ID = process.env.ABA_MERCHANT_ID || "";
const BASE_URL =
  process.env.ABA_BASE_URL ??
  "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments";

function tryParseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tran_id = String(body?.tran_id ?? "");

    if (!tran_id) {
      return NextResponse.json({ code: "VALIDATION_ERROR", error: "tran_id is required" }, { status: 400 });
    }

    const req_time = getReqTime();

    const hashFields: [string, string | number | null][] = [
      ["merchant_id", MERCHANT_ID],
      ["req_time", req_time],
      ["tran_id", tran_id],
    ];

    const hash = generateHash(hashFields, API_KEY);

    const payload = new URLSearchParams({
      merchant_id: MERCHANT_ID,
      req_time,
      tran_id,
      hash,
    });

    const upstream = await fetch(`${BASE_URL}/check-transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      cache: "no-store",
    });

    const text = await upstream.text();
    const parsed = tryParseJson(text);

    if (!upstream.ok) {
      return NextResponse.json(
        {
          code: "ABA_UPSTREAM_ERROR",
          error: parsed?.message ?? parsed?.error ?? text,
          status: upstream.status,
          data: parsed ?? null,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed ?? { raw: text });
  } catch (error) {
    return NextResponse.json(
      {
        code: "ERROR",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}