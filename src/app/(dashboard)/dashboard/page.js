"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 transition-all hover:shadow-md">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Welcome Back,{" "}
        <span className="text-blue-600 capitalize">
          {session?.user?.name || "User"}
        </span>
        ! 👋
      </h1>
      <p className="text-gray-500 mt-3 text-lg">
        আপনি সফলভাবে লগইন করেছেন। এখান থেকে আপনার কার্যক্রম পরিচালনা করুন।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-800">Active Session</h4>
          <p className="text-sm text-blue-600">ID Token is active</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <h4 className="font-bold text-green-800">Connection</h4>
          <p className="text-sm text-green-600">WSO2 Identity Server Secure</p>
        </div>
      </div>
    </div>
  );
}
