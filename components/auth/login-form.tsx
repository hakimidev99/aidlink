"use client";

import React, { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://aidlink-jhur.onrender.com";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (apiError) setApiError(null);
  };
=======
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
<<<<<<< HEAD
    setApiError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.token) {
        const token = response.data.token;
        localStorage.setItem("auth_token", token);

        try {
          // Decode JWT payload safely inline
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join(""),
          );

          const decoded = JSON.parse(jsonPayload);
          const role = decoded?.role?.toUpperCase();

          // Dynamic redirection based on verified role payload
          if (role === "ADMIN") {
            router.push("/admin");
          } else if (role === "BENEFICIARY") {
            router.push("/beneficiary");
          } else if (role === "DONOR") {
            router.push("/donor");
          } else if (role === "PARTNER") {
            router.push("/partner");
          } else {
            // Fallback if role string doesn't match standard routing profiles
            router.push("/");
          }
        } catch (decodeError) {
          console.error(
            "Failed to parse token payload structure:",
            decodeError,
          );
          // Fallback redirect if decoding fails but token exists
          router.push("/beneficiary");
        }
      } else {
        throw new Error("Invalid token payload returned from server.");
      }
    } catch (err: any) {
      console.error("Login authorization error:", err);
      const backendMessage = err.response?.data?.message || err.message;
      setApiError(
        backendMessage || "Authentication failed. Check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col justify-center rounded-3xl border border-white/40 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 sm:p-10 transition-all duration-300">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Welcome Back
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-zinc-400">
          Sign in to your AidLink workspace
        </p>
      </div>

      {apiError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 animate-in fade-in duration-200">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="user@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="*************"
          required
        />

        <div className="mt-1 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-gray-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 bg-white/50 accent-primary focus:ring-primary"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-bold text-primary transition-colors hover:text-secondary underline underline-offset-2"
=======
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex w-full max-w-md flex-col rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-black/10 p-10">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-medium text-text-heading">
          Login Account
        </h2>
      </div>
      <div className="mb-8 h-px w-full bg-white/20 dark:bg-white/10" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="rounded-lg bg-error/10 border border-error/20 px-4 py-3 text-sm text-error">
            {error}
          </div>
        )}
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="•••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="mt-2 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-body">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary focus:ring-primary"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-secondary transition-colors hover:text-secondary"
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          >
            Forgot password?
          </Link>
        </div>
<<<<<<< HEAD

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-xl text-base font-bold shadow-md shadow-primary/10 transition-all"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <div className="flex items-center justify-center mt-4">
          <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-xs font-bold text-primary transition-colors hover:text-secondary ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
=======
        <Button type="submit" className="mt-4 w-full" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/20 dark:bg-white/10" />
        <span className="text-sm text-text-muted">or</span>
        <div className="h-px flex-1 bg-white/20 dark:bg-white/10" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-secondary dark:bg-white/5 px-6 py-3 text-sm font-medium text-text-heading backdrop-blur-md transition-all hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-secondary dark:bg-white/5 px-6 py-3 text-sm font-medium text-text-heading backdrop-blur-md transition-all hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-body">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-secondary transition-colors hover:text-secondary"
          >
            Sign up
          </Link>
        </p>
      </div>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    </div>
  );
}
