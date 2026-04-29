// src/app/api/images/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello Images API" });
}