"use client";

import { useState } from "react";
import { Experience } from "../constants/Experience";

interface Props {
    initialData: Experience | null;
    onClose: () => void;
    onSave: (data: any) => void;
}

export default function ExperienceForm({ initialData, onClose, onSave }: Props) {
    const [formData, setFormData] = useState({
        company: initialData?.company || "",
        role: initialData?.role || "",
        period_start: initialData?.period_start || "",
        period_end: initialData?.period_end || "",
        skills: initialData?.skills?.join(", ") || "",
        description: initialData?.description?.join("\n") || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            // Convert comma-separated string back to Array
            skills: formData.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
            // Convert new-line separated string back to Array
            description: formData.description.split("\n").filter(d => d.trim() !== ""),
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit" : "Add"} Experience</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                                required
                                className="w-full mt-1 p-2 border rounded-md"
                                value={formData.company}
                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                                required
                                className="w-full mt-1 p-2 border rounded-md"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={formData.period_start}
                                onChange={e => setFormData({ ...formData, period_start: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                            <input
                                type="date"
                                className="w-full mt-1 p-2 border rounded-md"
                                value={formData.period_end}
                                onChange={e => setFormData({ ...formData, period_end: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills (Comma separated)</label>
                        <input
                            placeholder="React, Next.js, TypeScript"
                            className="w-full mt-1 p-2 border rounded-md"
                            value={formData.skills}
                            onChange={e => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description (One point per line)</label>
                        <textarea
                            rows={4}
                            className="w-full mt-1 p-2 border rounded-md"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}