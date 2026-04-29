import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("ABA Callback received:", body);

  // body contains: tran_id, status, amount, etc.
  // TODO: Verify the hash, then update your database order status here

  const { tran_id, status } = body;

  if (status === "0") {
    // Payment successful — mark order as paid in your DB
    console.log(`Order ${tran_id} paid successfully`);
  }

  return NextResponse.json({ success: true });
}