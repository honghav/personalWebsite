"use client";

import { useEffect, useState } from "react";
import { profileService } from "../../../../services/profile";
import { Myself } from "../../../../constants/general";
import { getPublicImageUrl } from "../../../../constants/getImage";
import { uploadImage } from "../../../../constants/cloudflear";

export default function ProfilePage() {
    const [profile, setProfile] = useState<Myself | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false); // New state for image upload

    useEffect(() => {
        async function load() {
            const data = await profileService.get();
            if (data) setProfile(data);
            setLoading(false);
        }
        load();
    }, []);

    // 1. New function to handle the image upload to R2
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !profile) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await uploadImage(formData);

            if (result.success && result.url) {
                // The result.url contains the full path, but we usually 
                // just want to save the fileName in the database.
                // We extract the fileName from the URL:
                const fileName = result.url.split('/').pop();

                // Update local state so the preview image updates immediately
                setProfile({ ...profile, image: fileName || "" });
                alert("Image uploaded successfully!");
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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;
        setSaving(true);
        const { error } = await profileService.update(profile);
        setSaving(false);

        if (error) alert("Error updating profile");
        else alert("Profile updated successfully!");
    };

    if (loading) return <div className="p-8">Loading Profile...</div>;

    return (
        <div className="max-w-3xl">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-gray-500">Manage your public identity and bio.</p>
            </header>
            <form onSubmit={handleUpdate} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                        <img
                            // This will now show the new image immediately after upload
                            src={getPublicImageUrl(String(profile?.image)) || "/placeholder.png"}
                            alt="Profile"
                            className={`w-24 h-24 rounded-full object-cover border-4 border-indigo-50 ${uploading ? 'opacity-50' : ''}`}
                        />
                        {uploading && <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">...</div>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-400 uppercase">
                            {uploading ? "Uploading..." : "Change Profile Photo"}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full mt-1 p-2 bg-gray-50 border rounded-lg text-sm"
                            onChange={handleFileChange} // Trigger upload on change
                            disabled={uploading}
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Current path: {profile?.image}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase">Full Name</label>
                        <input
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={profile?.name || ""}
                            onChange={e => setProfile({ ...profile!, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase">Profession</label>
                        <input
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={profile?.profession || ""}
                            onChange={e => setProfile({ ...profile!, profession: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase">Description / Bio</label>
                    <textarea
                        rows={6}
                        className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={profile?.description || ""}
                        onChange={e => setProfile({ ...profile!, description: e.target.value })}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:bg-gray-400"
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
}