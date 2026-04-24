export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-white">
            {children}
        </section>
    );
}