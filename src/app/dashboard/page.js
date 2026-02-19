"use client";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
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

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 transition-all hover:shadow-md">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Welcome Back,{" "}
                <span className="text-blue-600 capitalize">
                  {session?.user?.name || "User"}
                </span>
                ! 👋
              </h1>
              <p className="text-gray-500 mt-3 text-lg">
                আপনি সফলভাবে লগইন করেছেন। এখান থেকে আপনার কার্যক্রম পরিচালনা
                করুন।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-800">Active Session</h4>
                  <p className="text-sm text-blue-600">ID Token is active</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-800">Connection</h4>
                  <p className="text-sm text-green-600">
                    WSO2 Identity Server Secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
