"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleLogout = async () => {
    try {
      const logoutUrl = "https://idp.a2i.local/oidc/logout";
      const postLogoutRedirectUri = "http://localhost:3000/login";

      await signOut({ redirect: false });
      window.location.href = `${logoutUrl}?id_token_hint=${session.id_token}&post_logout_redirect_uri=${postLogoutRedirectUri}`;
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (status === "loading")
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          session={session}
          onLogout={handleLogout}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
