"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Login with WSO2</h1>
          <p className="text-gray-500 mt-2">
            Log in to your account to continue
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => signIn("wso2", { callbackUrl: "/dashboard" })}
            className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-95 shadow-md"
          >
            {/* WSO2 Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-semibold">
              Login with WSO2 Identity Server
            </span>
          </button>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Need an account?
            </span>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/register")}
          className="cursor-pointer w-full text-center text-sm font-medium text-blue-600 hover:underline"
        >
          Register for a new account
        </button>
      </div>
    </div>
  );
}
