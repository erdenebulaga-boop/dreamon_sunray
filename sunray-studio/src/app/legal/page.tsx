"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const tabs = [
  { key: "terms", label: "Үйлчилгээний нөхцөл" },
  { key: "privacy", label: "Нууцлалын бодлого" },
  { key: "return", label: "Буцаалтын бодлого" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("terms");

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-12 md:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Нүүр хуудас
      </Link>

      <h1 className="mt-4 font-display text-3xl font-semibold text-navy md:text-4xl">
        Хууль эрх зүй
      </h1>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 overflow-x-auto scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all ${
              activeTab === tab.key
                ? "bg-navy text-white"
                : "border border-white/20 text-gray-400 hover:border-gold/30 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-400">
        {activeTab === "terms" && (
          <>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">1. Ерөнхий нөхцөл</h2>
              <p className="mt-3">
                Энэхүү вэбсайтыг ашигласнаар та дараах үйлчилгээний нөхцлийг хүлээн зөвшөөрч
                байна. Sunray Studio нь бүтээгдэхүүн, үнэ, хүргэлтийн нөхцлийг өөрчлөх эрхтэй.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">2. Захиалга & Төлбөр</h2>
              <p className="mt-3">
                Захиалга баталгаажсаны дараа төлбөр нэхэмжлэгдэнэ. QPay, картаар болон зээлийн
                үйлчилгээгээр төлбөр хийх боломжтой. Захиалга баталгаажсан тохиолдолд
                и-баримт автоматаар үүснэ.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">3. Хүргэлт</h2>
              <p className="mt-3">
                Улаанбаатар хот дотор 1-3 өдрийн дотор хүргэнэ. Хөдөө орон нутагт 3-7 өдрийн
                дотор хүргэнэ. 100,000₮-с дээш захиалгад хүргэлт үнэгүй.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">4. Хариуцлагын хязгаарлалт</h2>
              <p className="mt-3">
                Sunray Studio нь бүтээгдэхүүний чанар, найрлага, хадгалалтын нөхцлийг
                баримталсан тохиолдолд бүрэн хариуцна. Хэрэглэгч өөрийн буруутай ашигласнаас
                үүссэн хохирлыг хариуцахгүй.
              </p>
            </section>
          </>
        )}

        {activeTab === "privacy" && (
          <>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">1. Хувийн мэдээлэл цуглуулах</h2>
              <p className="mt-3">
                Бид таны нэр, утас, и-мэйл, хүргэлтийн хаяг зэрэг мэдээллийг захиалга
                боловсруулах зорилгоор цуглуулна. Энэ мэдээллийг гуравдагч талд дамжуулахгүй.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">2. Мэдээлэл хадгалах</h2>
              <p className="mt-3">
                Таны мэдээлэл аюулгүй серверт хадгалагдана. Нууц үг нь шифрлэгдсэн хэлбэрээр
                хадгалагдах бөгөөд бид таны нууц үгийг харах боломжгүй.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">3. Күүки (Cookie)</h2>
              <p className="mt-3">
                Вэбсайт нь хэрэглэгчийн туршлагыг сайжруулахын тулд күүки ашиглана. Та
                хөтчийн тохиргоогоор күүки идэвхгүй болгох боломжтой.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">4. Мэдээлэл устгах</h2>
              <p className="mt-3">
                Та хүссэн үедээ хувийн мэдээллээ устгуулах хүсэлт гаргах боломжтой. Бидэнтэй
                info@sunray.mn хаягаар холбогдоно уу.
              </p>
            </section>
          </>
        )}

        {activeTab === "return" && (
          <>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">1. Буцаалтын нөхцөл</h2>
              <p className="mt-3">
                Бүтээгдэхүүнийг хүлээн авснаас хойш 7 хоногийн дотор буцаах боломжтой.
                Бүтээгдэхүүн задлагдаагүй, ашиглагдаагүй байх шаардлагатай.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">2. Буцаалт хийх журам</h2>
              <p className="mt-3">
                Буцаалт хийхийн тулд info@sunray.mn хаягт захиалгын дугаар, шалтгааны хамт
                хүсэлт илгээнэ үү. Бид 24 цагийн дотор хариу өгнө.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">3. Буцаан олголт</h2>
              <p className="mt-3">
                Буцаалт зөвшөөрөгдсөн тохиолдолд 3-5 ажлын өдрийн дотор мөнгийг буцаан
                шилжүүлнэ. Шилжүүлэг таны анхны төлсөн хэлбэрээр хийгдэнэ.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-gray-100">4. Буцаах боломжгүй тохиолдол</h2>
              <p className="mt-3">
                Задалсан, ашигласан бүтээгдэхүүн буцаах боломжгүй. Хямдралтай бүтээгдэхүүний
                буцаалт тухай бүр шийдвэрлэгдэнэ.
              </p>
            </section>
          </>
        )}
      </div>

      {/* Contact */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold text-gray-100">Асуулт байна уу?</p>
        <p className="mt-1 text-sm text-gray-400">
          Бидэнтэй{" "}
          <a href="mailto:info@sunray.mn" className="font-medium text-gold hover:underline">
            info@sunray.mn
          </a>{" "}
          эсвэл{" "}
          <a href="tel:+97698509999" className="font-medium text-gold hover:underline">
            9850-9999
          </a>{" "}
          утсаар холбогдоно уу.
        </p>
      </div>
    </div>
  );
}
