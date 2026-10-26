"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
  ShoppingBag,
  Store,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";

import "@/styles/auth.css";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  delay: `${(i % 6) * 0.4}s`,
  size: 2 + (i % 3),
}));

function FloatingIcon({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-2xl ${className ?? ""}`}
    >
      <div className="dg-float">{children}</div>
    </motion.div>
  );
}

function LoginHero() {
  return (
    <div className="relative hidden min-h-full overflow-hidden lg:flex lg:w-[52%] lg:flex-col lg:justify-between">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, #0a0f1e 0%, #111827 35%, #1e1b4b 70%, #0f172a 100%)",
        }}
      />
      <div className="dg-blob-1 pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="dg-blob-2 pointer-events-none absolute bottom-32 right-0 h-80 w-80 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="dg-blob-3 pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="dg-particle pointer-events-none absolute rounded-full bg-white"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay }}
        />
      ))}

      <FloatingIcon className="left-[12%] top-[18%] text-orange-400" delay={0.2}>
        <Store size={28} strokeWidth={1.75} />
      </FloatingIcon>
      <FloatingIcon className="right-[14%] top-[22%] text-violet-300 dg-float-delay" delay={0.35}>
        <ShoppingBag size={26} strokeWidth={1.75} />
      </FloatingIcon>
      <FloatingIcon className="left-[18%] bottom-[28%] text-sky-300" delay={0.5}>
        <Package size={26} strokeWidth={1.75} />
      </FloatingIcon>
      <FloatingIcon className="right-[20%] bottom-[32%] text-emerald-300 dg-float-delay" delay={0.65}>
        <TrendingUp size={26} strokeWidth={1.75} />
      </FloatingIcon>
      <FloatingIcon className="left-[42%] top-[38%] text-amber-300/90" delay={0.8}>
        <BarChart3 size={24} strokeWidth={1.75} />
      </FloatingIcon>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
              DG
            </div>
            <span className="text-sm font-medium tracking-wide text-slate-400">Enterprise Seller Platform</span>
          </div>
          <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-white xl:text-[2.75rem] xl:leading-[1.15]">
            Welcome to DropshipGuru Seller Portal
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
            Manage your business across multiple marketplaces from one secure dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { label: "Amazon", color: "#FF9900" },
              { label: "Meesho", color: "#9B59B6" },
              { label: "Flipkart", color: "#2874F0" },
            ].map((m, i) => (
              <motion.span
                key={m.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
              >
                <span className="size-2 rounded-full" style={{ background: m.color }} />
                {m.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <p className="relative z-10 px-12 pb-8 text-xs text-slate-600 xl:px-16">
        Secured with enterprise-grade encryption · Demo environment
      </p>
    </div>
  );
}

export function LoginPage() {
  const router = useRouter();
  const { user, ready, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ready && user) router.replace("/marketplace");
  }, [ready, user, router]);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "dg-ripple-dot";
    const size = Math.max(rect.width, rect.height);
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${e.clientX - rect.left - size / 2}px`;
    dot.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    const result = await login(email, password, rememberMe);
    setLoading(false);
    if (result.ok) {
      router.push("/marketplace");
    } else {
      setErrors({ form: result.error });
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f8fafc]">
        <div className="dg-btn-spinner border-slate-300 border-t-indigo-600" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <LoginHero />

      <div className="relative flex flex-1 flex-col justify-center bg-[#f8fafc] px-5 py-12 sm:px-10 lg:px-14 xl:px-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.06),transparent_45%)]" />

        <div className="mb-8 lg:hidden">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">DG</div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">DropshipGuru Seller Portal</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage your marketplaces</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="dg-glass-card relative mx-auto w-full max-w-[440px] rounded-3xl border border-white/60 p-8 shadow-[0_24px_64px_rgba(15,23,42,0.12)] sm:p-10"
        >
          <div className="mb-8 hidden lg:block">
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/25">
                DG
              </div>
              <span className="text-xl font-semibold tracking-tight text-slate-900">DropshipGuru</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">Sign in to your seller account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {errors.form ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {errors.form}
              </motion.div>
            ) : null}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dropshipguru.in"
                  className={`dg-login-input w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-900 transition-colors ${errors.email ? "border-red-400" : "border-slate-200"}`}
                />
              </div>
              {errors.email ? <p className="mt-1.5 text-xs text-red-600">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className={`dg-login-input w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-sm text-slate-900 transition-colors ${errors.password ? "border-red-400" : "border-slate-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password ? <p className="mt-1.5 text-xs text-red-600">{errors.password}</p> : null}
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-slate-300 accent-indigo-600"
                />
                Remember me
              </label>
              <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </button>
            </div>

            <motion.button
              ref={btnRef}
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              onClick={handleRipple}
              className="dg-signin-btn flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="dg-btn-spinner" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Demo credentials: admin@dropshipguru.in · 123456
          </p>
        </motion.div>
      </div>
    </div>
  );
}
