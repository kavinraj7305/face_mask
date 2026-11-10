"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/checkout";
  const error = searchParams.get("error");

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-3">Bavapriya</p>
      <h1 className="font-serif text-3xl text-[#3A4F41] mb-3">Sign in to place your order</h1>
      <p className="text-[#3A4F41]/75 mb-8">
        Use your Google account so we can save the order against your email and show you
        the details afterwards.
      </p>

      {error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          Google sign-in did not complete. Check the Google client ID and secret in
          <code className="mx-1">.env.local</code>, then try again.
        </p>
      )}

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full flex items-center justify-center gap-3 bg-white border border-[#3A4F41]/15 rounded-full py-3 px-6 font-medium text-[#3A4F41] hover:bg-[#F4F1EA] transition"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-sm text-[#3A4F41]/60 mt-6">
        <Link href="/cart" className="underline">
          Back to cart
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
