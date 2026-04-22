"use client";
import { useState } from "react";
import { Skill } from "../constants/skills";
import { uploadImage } from "../constants/cloudflear";
import { getPublicImageUrl } from "../constants/getImage";

export default function SkillForm({ initialData, onClose, onSave }: any) {
    const [form, setForm] = useState<Omit<Skill, "id">>({
        name: initialData?.name || "",
        level: initialData?.level || "Intermediate",
        category: initialData?.category || "Frontend",
        image_url: initialData?.image_url || "",
    });
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await uploadImage(formData);

            if (result.success && result.url) {
                // Extract fileName from the R2 URL to save in your DB
                const fileName = result.url.split('/').pop();
                setForm({ ...form, image_url: fileName || "" });
            } else {
                alert("Upload failed: " + result.error);
            }
        } catch (error) {
            console.error("Skill icon upload error:", error);
            alert("Error uploading icon");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Skill" : "Add Skill"}</h2>

                <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">

                    {/* Skill Icon Preview */}
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border shadow-sm overflow-hidden">
                            <img
                                src={getPublicImageUrl(String(form.image_url)) || "/placeholder-skill.png"}
                                alt="Skill Icon"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase block">Skill Icon</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={uploading}
                                className="text-xs mt-1 block w-full text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Skill Name</label>
                        <input
                            className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                            <select
                                className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value as any })}
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Tools">Tools</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Level</label>
                            <input
                                className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-indigo-500"
                                value={form.level}
                                onChange={e => setForm({ ...form, level: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Hidden input to ensure image_url is part of the form state */}
                    <input type="hidden" value={form.image_url} />

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 hover:text-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {uploading ? "Uploading..." : "Save Skill"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}