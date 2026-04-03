import Image from "next/image";
import { Wrench } from "lucide-react";

export const metadata = {
  title: "Засвар хийж байна | Sunray Studio",
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <Image
        src="/logo-color.png"
        alt="Sunray Studio"
        width={160}
        height={56}
        className="mb-10 h-10 w-auto"
      />

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10">
        <Wrench className="h-10 w-10 text-gold" strokeWidth={1.5} />
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-navy md:text-3xl">
        Засвар хийж байна
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        Бид системийг сайжруулж байна. Удахгүй дахин ашиглах боломжтой болно.
        Тэвчээртэй хүлээнэ үү.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-gold" />
          <span className="text-sm font-medium text-navy">Удахгүй бэлэн болно</span>
        </div>

        <div className="mt-4 space-y-1 text-sm text-gray-400">
          <p>Холбоо барих: <a href="mailto:info@sunray.mn" className="text-gold hover:underline">info@sunray.mn</a></p>
          <p>Утас: <a href="tel:+97698509999" className="text-gold hover:underline">9850-9999</a></p>
        </div>
      </div>
    </div>
  );
}
