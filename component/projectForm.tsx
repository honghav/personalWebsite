"use client";
import { useState } from "react";

export default function ProjectForm({ initialData, onClose, onSave }: any) {
    const [form, setForm] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        link: initialData?.link || "",
        tags: initialData?.tags?.join(", ") || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...form,
            tags: form.tags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== ""),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Project" : "New Project"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        placeholder="Project Title"
                        className="w-full p-2 border rounded"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                    />
                    <input
                        placeholder="Link (https://...)"
                        className="w-full p-2 border rounded"
                        value={form.link}
                        onChange={e => setForm({ ...form, link: e.target.value })}
                    />
                    <input
                        placeholder="Tags (React, Tailwind, etc.)"
                        className="w-full p-2 border rounded"
                        value={form.tags}
                        onChange={e => setForm({ ...form, tags: e.target.value })}
                    />
                    <div className="flex justify-end gap-2 text-sm">
                        <button type="button" onClick={onClose} className="px-4 py-2 hover:bg-gray-100 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
}