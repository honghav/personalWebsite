"use server";

import CryptoJS from "crypto-js";

export async function generateABAQR(amount: number, tranId: string) {
  const API_URL = "https://checkout.payway.com.kh/api/payment-gateway/v1/payments/generate-qr";
  const MERCHANT_ID = process.env.ABA_MERCHANT_ID!;
  const API_KEY = process.env.ABA_API_KEY!;

  // 1. Correct Request Time: must be YYYYMMDDHHMMSS (no dashes or colons)
  const reqTime = new Date().toISOString()
    .replace(/[-:T]/g, "")
    .split(".")[0]; 

  // 2. Data for Hash: MUST follow this exact order:
  // req_time + merchant_id + tran_id + amount + first_name + last_name + email + phone + payment_option
  const firstName = "John";
  const lastName = "Doe";
  const email = "test@example.com";
  const phone = "012345678";
  const paymentOption = "abapay_khqr";

  const hashStr = 
    reqTime + 
    MERCHANT_ID + 
    tranId + 
    amount.toString() + 
    firstName + 
    lastName + 
    email + 
    phone + 
    paymentOption;

  // 3. Generate HMAC SHA512 Base64
  const hash = CryptoJS.HmacSHA512(hashStr, API_KEY).toString(CryptoJS.enc.Base64);

  const payload = {
    req_time: reqTime,
    merchant_id: MERCHANT_ID,
    tran_id: tranId,
    amount: amount.toString(), // Some versions prefer string "1.00"
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    payment_option: paymentOption,
    hash: hash,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { status: { code: "1", message: "Connection Failed" } };
  }
}