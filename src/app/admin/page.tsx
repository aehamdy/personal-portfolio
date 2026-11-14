import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage your personal portfolio.",
};

export default function AdminPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <p className="mt-3 text-gray-500">
          Your portfolio management dashboard will live here.
        </p>
      </div>
    </main>
  );
}
