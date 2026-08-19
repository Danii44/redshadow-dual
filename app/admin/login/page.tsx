"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Incorrect password');
      }
    } catch {
      setError('An error occurred while signing in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-background text-foreground pt-24 pb-16">
      {/* Ambient background glow matching site aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4ff]/10 dark:bg-[#00d4ff]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7c3aed]/10 dark:bg-[#7c3aed]/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#090d16]/70 backdrop-blur-2xl shadow-2xl p-8 sm:p-10">
          
          {/* Header with Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center p-3 mb-4 shadow-sm">
              <img src="/assets/logo.webp" alt="Red Shadow Designs" className="w-full h-full object-contain" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Studio Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-black dark:text-white">
              Studio Admin
            </h1>
            <p className="text-black/60 dark:text-white/60 text-sm mt-1">
              Sign in to manage portfolio projects, upload images, and edit services.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 mb-2">
                Admin Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-black/40 dark:text-white/40 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter studio admin password"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-black dark:text-white text-sm placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff] dark:focus:border-[#00d4ff] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-sm tracking-wide hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#00d4ff]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60 hover:text-[#00d4ff] dark:hover:text-[#00d4ff] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Website
            </Link>
          </div>

        </div>
      </motion.div>
    </main>
  );
}
