"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        startTransition(async () => {
            try {
                const res = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (res?.error) {
                    setError("Email atau password tidak cocok");
                } else if (res?.ok) {
                    router.push("/dashboard");
                    router.refresh();
                }
            } catch (err) {
                setError("Terjadi kesalahan pada sistem");
            }
        });
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10">
                <div className="mb-8">
                    <h2 className="text-3xl text-gray-900 font-semibold">
                        Masuk
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Masuk untuk mengakses dashboard kamu
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@kamu.com"
                            disabled={isPending}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:opacity-60"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                disabled={isPending}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 disabled:opacity-60 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 text-white font-medium rounded-full py-3 text-sm transition-colors"
                    >
                        {isPending && <Loader2 size={16} className="animate-spin" />}
                        {isPending ? "Masuk..." : "Masuk"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Belum punya akun?{" "}
                    <Link
                        href="/auth/register"
                        className="font-medium text-gray-900 hover:underline"
                    >
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </main>
    );
}
