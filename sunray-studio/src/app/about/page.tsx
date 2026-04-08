"use client";

import Image from "next/image";
import {
  Sparkles,
  Shield,
  Target,
  Heart,
  Stethoscope,
  Zap,
  FlaskConical,
  TrendingUp,
  Award,
  Handshake,
  Users,
  Store,
  Smartphone,
  MapPinned,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero — full-width image with overlay */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/hero/hero-1.png"
          alt="Sunray Studio"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">
            2015 оноос
          </span>
          <h1 className="font-display text-4xl font-semibold text-white md:text-6xl">
            Байгууллагын танилцуулга
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-gray-200">
            Your Beauty, Our Passion
          </p>
        </div>
      </section>

      {/* Ерөнхий мэдээлэл — image left, text right */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/hero/hero-2.png"
                  alt="Sunray Salon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white p-5 shadow-xl md:-right-8">
                <p className="font-display text-3xl font-bold text-gold">9+</p>
                <p className="mt-1 text-sm font-medium text-gray-500">Жилийн туршлага</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Бидний тухай
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-gray-900 md:text-4xl">
                Ерөнхий мэдээлэл
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                &ldquo;Санрэй студи&rdquo; ХХК нь 2015 онд монгол улсынхаа хэрэглэгчдэд олон улсын дэвшилтэт гоо сайхны технологи, эмчилгээний бүтээгдэхүүнийг хүргэж, үр дүнд суурилсан мэргэжлийн үйлчилгээ үзүүлэх эрхэм зорилготойгоор үүсгэн байгуулагдсан. Санрэй салоноор дамжуулан өнөөдрийг хүртэл гоо сайхны цогц үйлчилгээг бүсгүйчүүдэд хүргэсээр ирсэн.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Манай компани нь арьс, үс, хумсны мэргэжлийн үйлчилгээ, гоо сайхны бараа бүтээгдэхүүний импорт худалдаа, бие галбиржуулах цогц үйлчилгээ, гоо сайхны сургалт, зөвлөгөө зэрэг чиглэлүүдээр үйл ажиллагаа явуулдаг. Чанар, итгэл, ёс зүй, үр дүнг үнэт зүйлээ болгон үйл ажиллагаагаа явуулж байна.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: Sparkles, text: "Арьс, үс, хумсны мэргэжлийн үйлчилгээ" },
                  { icon: Store, text: "Гоо сайхны бүтээгдэхүүний импорт, худалдаа" },
                  { icon: Users, text: "Бие галбиржуулах үйлчилгээ" },
                  { icon: Award, text: "Гоо сайхны сургалт, зөвлөгөө" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 rounded-xl bg-cream/50 p-4">
                    <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Зорилго, эрхэм үнэт зүйлс — 3 prominent cards */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="block text-center text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Эрхэм зорилго
          </span>
          <h2 className="mt-3 text-center font-display text-3xl font-semibold text-white md:text-4xl">
            Зорилго, эрхэм үнэт зүйлс
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">Зорилго</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                Таны гоо үзэсгэлэнг шинжлэх ухаанд тулгуурлан тодруулна
              </p>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
                <Sparkles className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">Эрхэм зорилго</h3>
              <p className="mt-3 text-base italic leading-relaxed text-gray-200">
                &ldquo;Таны гоо үзэсгэлэнг шинжлэх ухаанд тулгуурлан тодорхойлно&rdquo;
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
                <Heart className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">Үнэт зүйлс</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Чанар", "Итгэл", "Ёс зүй", "Үр дүн"].map((v) => (
                  <span key={v} className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Үйл ажиллагааны чиглэлүүд — icon grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Үйлчилгээ
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-gray-900 md:text-4xl">
            Үйл ажиллагааны үндсэн чиглэлүүд
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Stethoscope, title: "Арьс арчилгаа", desc: "White Skin, Baby Face, Aqua Peel, RF, HIFU" },
              { icon: FlaskConical, title: "Эмчилгээний бүтээгдэхүүн", desc: "Rexri, Keep Kiss брэндүүд" },
              { icon: Sparkles, title: "Үс арчилгаа", desc: "Hair Care Line цуврал" },
              { icon: Zap, title: "Гэрийн төхөөрөмж", desc: "K•Skin Home Devices" },
              { icon: Users, title: "Сургалт ба зөвлөгөө", desc: "Мэргэжлийн гоо сайхны сургалт" },
            ].map((item) => (
              <div key={item.title} className="group rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream transition-colors duration-300 group-hover:bg-gold/10">
                  <item.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Media & Awards */}
          <div className="mt-16 rounded-2xl bg-cream/50 p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/10">
                <Award className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Амжилт, хамтын ажиллагаа</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  9 жилийн хугацаанд Монголын уран бүтээлчид, модель миссүүдийг өөрийн салоны нүүр царай болгон гоо сайхны үйлчилгээнийхээ бодит үр дүнг танилцуулж, МҮОНТВ, HD Монгол, ТV-5 зэрэг телевизийн сувгуудаар тогтмол хүргэж ирсэн.
                </p>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  &ldquo;Best of Mongolia&rdquo; олон нийтийн санал асуулгаар <span className="font-semibold text-gray-900">2014, 2015, 2016, 2018</span> онуудад оны шилдэг гоо сайхны салоноор шалгарсан.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Тохирлын гэрчилгээ + Гадаад хамтын ажиллагаа */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            {/* Гэрчилгээ */}
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                <Shield className="h-5 w-5 text-gold" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-gray-900 md:text-3xl">
                Тохирлын гэрчилгээ
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                2026 онд манай байгууллага нь холбогдох хууль, стандартын шаардлагыг бүрэн хангаж, эрх бүхий байгууллагаас олгосон тохирлын гэрчилгээтэй болсон:
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Бүтээгдэхүүн, тоног төхөөрөмж нь аюулгүй, стандартын шаардлага хангасан",
                  "Үйлчилгээ нь эрүүл ахуй, чанарын шалгуурт нийцсэн",
                  "Үйл ажиллагаа нь холбогдох дүрэм журмын дагуу явагддаг",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-base leading-relaxed text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Гадаад хамтын ажиллагаа + Импорт */}
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                <Handshake className="h-5 w-5 text-gold" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-gray-900 md:text-3xl">
                Гадаад хамтын ажиллагаа
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Sunray Salon нь Солонгос, Хятад улсуудаас гоо сайхны брэндүүдийг албан ёсоор импортлон худалдаалдаг.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { country: "БНСУ", brand: "Rexri Korea" },
                  { country: "БНХАУ", brand: "Keep Kiss, K•Skin Home Devices" },
                  { country: "БНХАУ", brand: "Hair Care Line" },
                ].map((item) => (
                  <div key={item.brand} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <span className="flex-shrink-0 rounded-lg bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                      {item.country}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{item.brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Үйлчилгээний онцлог + Давуу тал — side by side */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Онцлог</span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-gray-900 md:text-3xl">
                Манай үйлчилгээний онцлог
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Арьсны оношилгоонд суурилсан зөвлөгөө",
                  "Дэвшилтэт гоо сайхны технологи ашигладаг",
                  "Эмчилгээний зориулалттай бүтээгдэхүүн хэрэглэдэг",
                  "Үр дүнд чиглэсэн мэргэжлийн үйлчилгээ",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-base leading-relaxed text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Давуу тал</span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-gray-900 md:text-3xl">
                Яагаад биднийг сонгох вэ?
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Албан ёсны импортлогчийн гэрээтэй",
                  "Мэргэжлийн түвшний гоо сайхны баг",
                  "Европ, Азийн брэндийн баталгаат бүтээгдэхүүн",
                  "Арьсны оношилгоо ба зөвлөгөөтэй үйлчилгээ",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-base leading-relaxed text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Зорилтот хэрэглэгчид + Борлуулалтын сувгууд — cards */}
      <section className="bg-cream/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Зорилтот хэрэглэгчид */}
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                <Users className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Зорилтот хэрэглэгчид</h3>
              <ul className="mt-6 space-y-3">
                {[
                  "Эмзэг, хуурай, өнгөө алдсан арьстай хэрэглэгчид",
                  "Мэргэжлийн арьс арчилгааны үйлчилгээ авахыг хүсэгчид",
                  "Гоо сайхны бизнес эрхлэгч, сургалтад хамрагдагсад",
                  "Home care бүтээгдэхүүн сонирхогчид",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Борлуулалтын сувгууд */}
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10">
                <TrendingUp className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Борлуулалтын сувгууд</h3>
              <div className="mt-6 space-y-4">
                {[
                  { icon: Store, text: "Салонд худалдаа" },
                  { icon: Smartphone, text: "Онлайн платформууд (Facebook, Instagram, www.sunray.mn)" },
                  { icon: MapPinned, text: "19 аймагт гэрээт борлуулагчидтай" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 rounded-xl bg-cream/50 p-4">
                    <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
