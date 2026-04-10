import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="mb-10">
        <Image
          src="/logo-color.png"
          alt="Sunray Studio"
          width={160}
          height={56}
          className="h-10 w-auto"
        />
      </Link>

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10">
        <span className="font-display text-4xl font-bold text-gold">404</span>
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-[#e9eeff] md:text-3xl">
        Хуудас олдсонгүй
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        Уучлаарай, таны хайж буй хуудас олдсонгүй. Хаяг зөв эсэхийг шалгаж,
        дахин оролдоно уу.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center rounded-xl bg-navy px-8 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
        >
          Нүүр хуудас
        </Link>
        <Link
          href="/shop"
          className="inline-flex min-h-[48px] items-center rounded-xl border border-white/20 px-8 text-sm font-medium text-gray-300 transition-colors hover:border-gold/30 hover:text-white"
        >
          Дэлгүүр
        </Link>
      </div>
    </div>
  );
}
