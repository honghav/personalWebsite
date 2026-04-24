"use client";
import { useEffect, useState } from "react";
import { Skill, SKILLS } from "../../../../constants/skills";
import { skillService } from "../../../../services/skills";
import SkillForm from "../../../../component/SkillForm";
import { getPublicImageUrl } from "../../../../constants/getImage";


export default function SkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [editing, setEditing] = useState<Skill | null | boolean>(false);

    const load = async () => setSkills(SKILLS);
    useEffect(() => { load(); }, []);

    const handleSave = async (data: Skill) => {
        if (typeof editing === 'object' && editing?.id) {
            await skillService.update(editing.id, data);
        } else {
            await skillService.create(data);
        }
        setEditing(false);
        load();
    };

    const categories: Skill["category"][] = ["Frontend", "Backend", "Tools"];

    return (
        <div className="p-8  max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Skills & Tech Stack</h1>
                <button onClick={() => setEditing(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">+ Add Skill</button>
            </div>

            <div className="space-y-8">
                {categories.map(cat => (
                    <div key={cat}>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{cat}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {skills.filter(s => s.category === cat).map(skill => (
                                <div key={skill.id} className="p-4 bg-white border rounded-xl flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        {skill.image_url && <img src={getPublicImageUrl(String(skill.image_url))} alt="" className="w-8 h-8 object-contain" />}
                                        <div>
                                            <div className="font-bold">{skill.name}</div>
                                            <div className="text-xs text-gray-500">{skill.level}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 text-sm">
                                        <button onClick={() => setEditing(skill)} className="text-indigo-600 font-medium">Edit</button>
                                        <button onClick={async () => { if (confirm("Delete?")) { await skillService.delete(skill.id!); load(); } }} className="text-red-400">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {editing && (
                <SkillForm
                    initialData={typeof editing === 'object' ? editing : null}
                    onClose={() => setEditing(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}