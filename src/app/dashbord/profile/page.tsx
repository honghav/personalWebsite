"use client";

import { useEffect, useState } from "react";
import { Myself } from "../../../../constants/general";
import { getMyselfService, updateMyselfService } from "../../../../services/myselfService";

export default function MyselfPage() {
    const [form, setForm] = useState<Myself>({
        name: "",
        profession: "",
        image: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    // FETCH
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMyselfService();
            if (data) setForm(data);
        };

        fetchData();
    }, []);

    // INPUT CHANGE
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // UPDATE
    const handleSubmit = async () => {
        setLoading(true);
        await updateMyselfService(form);
        setLoading(false);
        alert("Profile updated!");
    };

    return (
        <div className="p-6 max-w-xl space-y-4">
            <h1 className="text-xl font-bold">My Profile CRUD</h1>

            {/* NAME */}
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 w-full"
            />

            {/* PROFESSION */}
            <input
                name="profession"
                value={form.profession}
                onChange={handleChange}
                placeholder="Profession"
                className="border p-2 w-full"
            />

            {/* IMAGE */}
            <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/image/profile.jpg"
                className="border p-2 w-full"
            />

            {/* DESCRIPTION */}
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 w-full h-32"
            />

            {/* SAVE BUTTON */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2"
            >
                {loading ? "Saving..." : "Save"}
            </button>

            {/* PREVIEW */}
            <div className="mt-6 border p-4">
                <h2 className="font-bold">Preview</h2>
                <p>{form.name}</p>
                <p>{form.profession}</p>
                <p>{form.description}</p>
                <img src={form.image} className="w-32 mt-2" />
            </div>
        </div>
    );
}