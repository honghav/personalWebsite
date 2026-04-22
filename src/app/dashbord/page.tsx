"use client";

import { useState } from "react";
import ExperienceCRUD from "./experience/page";
import ProjectsPage from "./projects/page";
import SkillsPage from "./skill/page";
import SocialLinksPage from "./socials/page";
import { Layout } from "lucide-react";
import ProfilePage from "./profile/page";


type Tab = "Experiences" | "Projects" | "Skills" | "Socials" | "Profile";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("Experiences");

    const tabs: Tab[] = ["Experiences", "Projects", "Skills", "Socials", "Profile"];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <header className="mt-30 bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-xl font-bold text-indigo-600">Portfolio CMS</h1>
                        <nav className="flex space-x-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Dynamic Content Area */}
            <main className="py-10">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-150">
                        {activeTab === "Profile" && <ProfilePage />}
                        {activeTab === "Experiences" && <ExperienceCRUD />}
                        {activeTab === "Projects" && <ProjectsPage />}
                        {activeTab === "Skills" && <SkillsPage />}
                        {activeTab === "Socials" && <SocialLinksPage />}
                    </div>
                </div>
            </main>
        </div>
    );
}