"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg-primary">
      <div className="w-[90%] max-w-sm bg-card p-8 rounded-[var(--radius-dashboard)] border border-border shadow-glow">        <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text">Om Kareshwor Dham</h1>
        <p className="text-text-muted text-sm mt-2">Samity Member Login</p>
      </div>

        <div className="space-y-4">
          {/* Google Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-bg-primary hover:bg-bg-alt text-text p-4 rounded-xl border border-border-shaded transition-all active:scale-95"
          >
            <img src="https://authjs.dev/img/providers/google.svg" width="20" alt="Google" />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:opacity-90 text-white p-4 rounded-xl transition-all active:scale-95"
          >
            <img src="https://authjs.dev/img/providers/facebook.svg" width="20" alt="Facebook" className="border rounded" />
            <span className="font-medium">Continue with Facebook</span>
          </button>
        </div>

        <p className="text-center text-xs text-text-muted mt-8 px-4">
          Only authorized Samity members can access the dashboard.
        </p>
      </div>
    </div>
  );
}