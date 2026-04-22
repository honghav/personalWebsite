"use client";
import { useState } from "react";
import { SocialLink } from "../constants/Socail";

export default function SocialForm({ initialData, onClose, onSave }: any) {
    const [form, setForm] = useState<Omit<SocialLink, "id">>({
        name: initialData?.name || "",
        href: initialData?.href || "",
        image: initialData?.image || "",
        alt: initialData?.alt || "",
        hover_bg: initialData?.hover_bg || "hover:bg-gray-100",
    });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Link" : "Add Social Link"}</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-3">

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            placeholder="Name (e.g. GitHub)"
                            className="p-2 border rounded"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Alt Text"
                            className="p-2 border rounded"
                            value={form.alt}
                            onChange={e => setForm({ ...form, alt: e.target.value })}
                        />
                    </div>

                    <input
                        placeholder="URL (https://...)"
                        className="w-full p-2 border rounded"
                        value={form.href}
                        onChange={e => setForm({ ...form, href: e.target.value })}
                    />

                    <input
                        placeholder="Icon Path (/icons/git.svg)"
                        className="w-full p-2 border rounded"
                        value={form.image}
                        onChange={e => setForm({ ...form, image: e.target.value })}
                    />

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">Hover Background (Tailwind Class)</label>
                        <input
                            placeholder="hover:bg-blue-500"
                            className="w-full p-2 border rounded mt-1"
                            value={form.hover_bg}
                            onChange={e => setForm({ ...form, hover_bg: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Save Link</button>
                    </div>
                </form>
            </div>
        </div>
    );
}