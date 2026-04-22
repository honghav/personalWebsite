"use client";
import { useState } from "react";
import { Skill } from "../constants/skills";

export default function SkillForm({ initialData, onClose, onSave }: any) {
    const [form, setForm] = useState<Omit<Skill, "id">>({
        name: initialData?.name || "",
        level: initialData?.level || "Intermediate",
        category: initialData?.category || "Frontend",
        image_url: initialData?.image_url || "",
    });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Skill" : "Add Skill"}</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Skill Name</label>
                        <input
                            className="w-full p-2 border rounded mt-1"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                            <select
                                className="w-full p-2 border rounded mt-1"
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
                                className="w-full p-2 border rounded mt-1"
                                value={form.level}
                                onChange={e => setForm({ ...form, level: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Icon URL (Optional)</label>
                        <input
                            className="w-full p-2 border rounded mt-1"
                            value={form.image_url}
                            onChange={e => setForm({ ...form, image_url: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save Skill</button>
                    </div>
                </form>
            </div>
        </div>
    );
}