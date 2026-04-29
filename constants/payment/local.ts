export interface AbaQrRequest {
  merchant_id: string;
  tran_id: string;
  req_time: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  amount: number;
  currency: "USD" | "KHR";
  payment_option: "abapay" | "abapay_khqr" | "abapay_khqr_wechat_alipay";
  purchase_type: "purchase";
  items: string;           // base64 encoded JSON
  callback_url: string;    // base64 encoded URL
  lifetime?: number;       // minutes, default 10
  qr_image_template?: string;
  return_deeplink?: string | null;
  custom_fields?: string | null;
  return_params?: string | null;
  payout?: string | null;
  hash: string;
}

export interface AbaQrResponse {
  qrString: string;
  qrImage: string;         // base64 PNG
  abapay_deeplink: string;
  app_store: string;
  play_store: string;
  amount: number;
  currency: string;
  status: {
    code: string;
    message: string;
    trace_id: string;
  };
}

export interface AbaCheckRequest {
  merchant_id: string;
  tran_id: string;
  req_time: string;
  hash: string;
}

export interface AbaCheckResponse {
  status: {
    code: string;
    message: string;
    trace_id: string;
  };
  tran_id?: string;
  apv?: string;
  payment_status?: string; // "0" = pending, "1" = paid, "2" = failed
}