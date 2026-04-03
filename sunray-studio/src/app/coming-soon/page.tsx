"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Check } from "lucide-react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <Image
        src="/logo-color.png"
        alt="Sunray Studio"
        width={180}
        height={64}
        className="mb-10 h-12 w-auto"
      />

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy/5">
        <Sparkles className="h-10 w-10 text-navy" strokeWidth={1.5} />
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-navy md:text-3xl">
        Тун удахгүй
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        Бид шинэ зүйл бэлдэж байна. И-мэйл хаягаа үлдээвэл эхний мэдээллийг
        хүлээн авах боломжтой.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-sm gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="И-мэйл хаяг"
          required
          className="min-h-[48px] flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
        <button
          type="submit"
          className="min-h-[48px] rounded-xl bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
        >
          {submitted ? <Check className="h-5 w-5" /> : "Бүртгүүлэх"}
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-sm font-medium text-green-600">
          Амжилттай бүртгэгдлээ!
        </p>
      )}

      <div className="mt-12 flex items-center gap-6 text-sm text-gray-400">
        <a href="mailto:info@sunray.mn" className="hover:text-gold transition-colors">info@sunray.mn</a>
        <span className="h-4 w-px bg-gray-200" />
        <a href="tel:+97698509999" className="hover:text-gold transition-colors">9850-9999</a>
      </div>
    </div>
  );
}
