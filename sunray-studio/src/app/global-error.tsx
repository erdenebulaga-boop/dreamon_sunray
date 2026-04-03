"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="mn">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-sans">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <span className="text-4xl font-bold text-red-500">500</span>
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Алдаа гарлаа
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
          Системд алдаа гарлаа. Түр хүлээж дахин оролдоно уу.
        </p>

        <button
          onClick={reset}
          className="mt-8 inline-flex min-h-[48px] items-center rounded-xl bg-gray-900 px-8 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Дахин оролдох
        </button>
      </body>
    </html>
  );
}
