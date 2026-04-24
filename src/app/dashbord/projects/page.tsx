"use client";
import { useEffect, useState } from "react";
import { projectService } from "../../../../services/project";
import { handleDelete, ProjectList, Projects } from "../../../../constants/feature";
import ProjectForm from "../../../../component/projectForm";


export default function ProjectsPage() {
    const [projects, setProjects] = useState<Projects[]>([]);
    const [editing, setEditing] = useState<Projects | null | boolean>(false);

    const load = async () => setProjects(ProjectList);

    useEffect(() => { load(); }, []);



    const handleSave = async (data: Projects) => {
        if (typeof editing === 'object' && editing?.id) {
            await projectService.update(editing.id, data);
        } else {
            await projectService.create(data);
        }
        setEditing(false);
        load();
    };

    return (
        <div className="p-8 max-w-5xl  mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add</button>
            </div>

            <div className="grid gap-4">
                {projects.map(p => (
                    <div key={p.id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm">
                        <div>
                            <h3 className="font-bold">{p.title}</h3>
                            <p className="text-sm text-gray-500">{p.description}</p>
                            <div className="flex gap-1 mt-2">
                                {p.tags.map(t => <span key={t} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">{t}</span>)}
                            </div>
                        </div>
                        <div className="flex gap-4 text-sm font-medium">
                            <button onClick={() => setEditing(p)} className="text-blue-600">Edit</button>
                            <button onClick={() => handleDelete(p.id!)} className="text-red-500">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {editing && (
                <ProjectForm
                    initialData={typeof editing === 'object' ? editing : null}
                    onClose={() => setEditing(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}