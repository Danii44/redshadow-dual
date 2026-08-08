"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-lg text-center px-6 py-10">
        <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
        <p className="text-lg text-slate-300 mb-6">{error?.message || 'An unexpected error occurred.'}</p>
        <button
          className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-400"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
