"use client";

import UploadForm from "../../../../component/uplaodForm";
import { getPublicImageUrl } from "../../../../constants/getImage";
export default function UploadRtwo() {
    const filename = getPublicImageUrl("1776844003736-WIN_20251007_14_42_33_Pro.jpg");
    return (
        <div className="mt-45">
            <img
                src={filename}
                alt="R2 Bucket Image"
                className="object-contain"
            />
            <h1 className="text-2xl font-bold mb-2">Upload to R2</h1>
            <p className="mb-4">This page allows you to upload and query images from Cloudflare R2.</p>

            <UploadForm />
        </div>
    );
}