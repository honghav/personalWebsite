"use client";
import { useEffect, useState } from "react";
import { SOCIAL_LINKS, SocialLink } from "../../../../constants/Socail";
import { socialService } from "../../../../services/socaillink";
import SocialForm from "../../../../component/SocialForm";
import { getPublicImageUrl } from "../../../../constants/getImage";


export default function SocialLinksPage() {
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [editing, setEditing] = useState<SocialLink | null | boolean>(false);

    const load = async () => setLinks(SOCIAL_LINKS);
    useEffect(() => { load(); }, []);

    const handleSave = async (data: SocialLink) => {
        if (typeof editing === 'object' && editing?.id) {
            await socialService.update(editing.id, data);
        } else {
            await socialService.create(data);
        }
        setEditing(false);
        load();
    };

    return (
        <div className="mt-30 p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Social Links</h1>
                <button onClick={() => setEditing(true)} className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                    + Add Link
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {links.map((link) => (
                    <div key={link.id} className="p-4 bg-white border rounded-xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg transition-colors ${link.hover_bg}`}>
                                <img src={getPublicImageUrl(String(link.image))} alt={link.alt} className="w-6 h-6 object-contain" />
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">{link.name}</div>
                                <div className="text-xs text-gray-400 truncate max-w-37.5">{link.href}</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setEditing(link)} className="text-gray-400 hover:text-blue-600">
                                Edit
                            </button>
                            <button
                                onClick={async () => { if (confirm("Remove link?")) { await socialService.delete(link.id!); load(); } }}
                                className="text-gray-400 hover:text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editing && (
                <SocialForm
                    initialData={typeof editing === 'object' ? editing : null}
                    onClose={() => setEditing(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}