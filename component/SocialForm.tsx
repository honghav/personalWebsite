"use client";
import { useState } from "react";
import { SocialLink } from "../constants/Socail";
import { uploadImage } from "../constants/cloudflear";
import { getPublicImageUrl } from "../constants/getImage";

export default function SocialForm({ initialData, onClose, onSave }: any) {
    const [form, setForm] = useState<Omit<SocialLink, "id">>({
        name: initialData?.name || "",
        href: initialData?.href || "",
        image: initialData?.image || "",
        alt: initialData?.alt || "",
        hover_bg: initialData?.hover_bg || "hover:bg-gray-100",
    });
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return; // Removed !form.image check so you can upload new ones

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await uploadImage(formData);

            if (result.success && result.url) {
                // Extract just the filename to save in Supabase
                const fileName = result.url.split('/').pop();
                setForm({ ...form, image: fileName || "" });
                alert("Icon uploaded successfully!");
            } else {
                alert("Upload failed: " + result.error);
            }
        } catch (error) {
            console.error(error);
            alert("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Link" : "Add Social Link"}</h2>

                <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-3">

                    {/* Icon Preview */}
                    <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-xl ${form.hover_bg} border transition-colors`}>
                            <img
                                src={getPublicImageUrl(form.image) || "/placeholder-icon.png"}
                                alt="Preview"
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            placeholder="Name (e.g. GitHub)"
                            className="p-2 border rounded text-sm"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Alt Text"
                            className="p-2 border rounded text-sm"
                            value={form.alt}
                            onChange={e => setForm({ ...form, alt: e.target.value })}
                        />
                    </div>

                    <input
                        placeholder="URL (https://...)"
                        className="w-full p-2 border rounded text-sm"
                        value={form.href}
                        onChange={e => setForm({ ...form, href: e.target.value })}
                        required
                    />

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Social Icon (Upload to R2)</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full p-2 border rounded text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-100"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        {uploading && <p className="text-xs text-blue-500 animate-pulse">Uploading icon...</p>}
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Hover Background (Tailwind Class)</label>
                        <input
                            placeholder="hover:bg-blue-500"
                            className="w-full p-2 border rounded mt-1 text-sm"
                            value={form.hover_bg}
                            onChange={e => setForm({ ...form, hover_bg: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:bg-gray-400"
                        >
                            {uploading ? "Uploading..." : "Save Link"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}