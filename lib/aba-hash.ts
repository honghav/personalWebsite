import crypto from "crypto";

export function getReqTime(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

export function generateTranId(): string {
  return Date.now().toString();
}

export function encodeItems(
  items: Array<{ name: string; quantity: number; price: number }>
): string {
  return Buffer.from(JSON.stringify(items)).toString("base64");
}

export function encodeUrl(url: string): string {
  return Buffer.from(url).toString("base64");
}

export function generateHash(
  orderedFields: [string, string | number | null][],
  apiKey: string
): string {
  // ABA expects all values as strings, nulls/empty as ""
  const raw = orderedFields
    .map(([, v]) => (v == null || v === "" ? "" : String(v)))
    .join("");

  console.log("=== HASH DEBUG ===");
  console.log("Raw string to hash:", raw);

  const hmac = crypto.createHmac("sha512", apiKey);
  hmac.update(raw);
  return hmac.digest("base64");
}