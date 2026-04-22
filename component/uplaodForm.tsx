"use client";

import { useState } from "react";
import { uploadImage } from "../constants/cloudflear";

export default function UploadForm() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    async function handleAction(formData: FormData) {
        setIsUploading(true);
        const result = await uploadImage(formData);
        setIsUploading(false);

        if (result.success) {
            setImageUrl(result.url!);
            alert("Upload successful!");
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="p-4 border rounded-lg max-w-md">
            <form action={handleAction} className="flex flex-col gap-4">
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                <button
                    type="submit"
                    disabled={isUploading}
                    className="bg-blue-600 text-white py-2 rounded-md disabled:bg-gray-400"
                >
                    {isUploading ? "Uploading..." : "Upload to R2"}
                </button>
            </form>

            {imageUrl && (
                <div className="mt-4">
                    <p className="text-sm mb-2">Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" className="w-full rounded-md shadow" />
                </div>
            )}
        </div>
    );
}