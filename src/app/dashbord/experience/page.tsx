"use client";

import { useEffect, useState } from "react";
import { Experience } from "../../../../constants/Experience";
import { createExperienceService, deleteExperienceService, getExperienceService, updateExperienceService } from "../../../../services/experience";
import ExperienceForm from "../../../../component/experienceFrom";

export default function ExperienceCRUD() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await getExperienceService();
        setExperiences(data ?? []);
    }

    const handleOpenModal = (exp: Experience | null = null) => {
        setSelectedExp(exp);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: any) => {
        if (confirm("Delete this entry?")) {
            const success = await deleteExperienceService(id);
            if (success) setExperiences(prev => prev.filter(e => e.id !== id));
        }
    };

    const handleSave = async (payload: Experience) => {
        if (selectedExp?.id) {
            await updateExperienceService(selectedExp.id, payload);
        } else {
            await createExperienceService(payload);
        }
        loadData();
        setIsModalOpen(false);
    };

    return (
        <div className=" mt-30 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Experience Manager</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-sm"
                    >
                        + Add New
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Company & Role</th>
                                <th className="px-6 py-4">Period</th>
                                <th className="px-6 py-4">Skills</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {experiences.map((exp) => (
                                <tr key={exp.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{exp.company}</div>
                                        <div className="text-gray-500">{exp.role}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {exp.period_start} — {exp.period_end || "Present"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {exp.skills.map(s => (
                                                <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs border border-indigo-100">{s}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button onClick={() => handleOpenModal(exp)} className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                                        <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <ExperienceForm
                    initialData={selectedExp}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}