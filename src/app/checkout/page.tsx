"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  Shield,
  Truck,
  Zap,
  MapPin,
  User,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Building2,
  Info,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useUser } from "@/lib/user";
import { formatPrice } from "@/lib/format";
import { FadeIn } from "@/components/ui/motion";

const UB_DISTRICTS = [
  "Баянгол",
  "Баянзүрх",
  "Сүхбаатар",
  "Чингэлтэй",
  "Хан-Уул",
  "Сонгинохайрхан",
  "Налайх",
  "Багануур",
  "Багахангай",
];

// Delivery costs based on district proximity
const DISTRICT_DELIVERY: Record<string, { fast: number; normal: number }> = {
  "Сүхбаатар": { fast: 5000, normal: 3000 },
  "Чингэлтэй": { fast: 5000, normal: 3000 },
  "Баянгол": { fast: 6000, normal: 3500 },
  "Хан-Уул": { fast: 6000, normal: 3500 },
  "Баянзүрх": { fast: 7000, normal: 4000 },
  "Сонгинохайрхан": { fast: 8000, normal: 5000 },
  "Налайх": { fast: 12000, normal: 7000 },
  "Багануур": { fast: 15000, normal: 9000 },
  "Багахангай": { fast: 15000, normal: 9000 },
};

type DeliveryType = "normal" | "fast";
type InvoiceType = "personal" | "company" | "taxpayer";
type PaymentMethod = "qpay" | "card" | "loan" | "";

export default function CheckoutPage() {
  const { t, locale } = useI18n();
  const { items, totalPrice, clearCart } = useCart();
  const { isLoggedIn, setIsOpen: setUserOpen } = useUser();

  // Checkout state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Section 1: Address & Delivery
  const [district, setDistrict] = useState("");
  const [khoroo, setKhoroo] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("normal");

  // Section 2: Personal Info & E-Barimt
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceType, setInvoiceType] = useState<InvoiceType>("personal");
  const [companyRegId, setCompanyRegId] = useState("");

  // Section 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");

  // Section expand states
  const [expandedSection, setExpandedSection] = useState(1);

  // Validation
  const section1Complete = district !== "" && khoroo.trim() !== "" && address.trim() !== "";
  const section2Complete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    phone.trim() !== "" &&
    (invoiceType !== "company" || companyRegId.trim() !== "") &&
    (invoiceType !== "taxpayer" || companyRegId.trim() !== "");
  const section3Complete = paymentMethod !== "";

  // Auth gate: if not logged in, open login drawer
  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      setUserOpen(true);
      return;
    }
  };

  // Delivery cost calculation
  const deliveryCost = useMemo(() => {
    if (totalPrice >= 100000) return 0;
    if (!district) return 0;
    const rates = DISTRICT_DELIVERY[district];
    if (!rates) return deliveryType === "fast" ? 8000 : 5000;
    return deliveryType === "fast" ? rates.fast : rates.normal;
  }, [district, deliveryType, totalPrice]);

  const finalTotal = totalPrice + deliveryCost;

  const handleSubmit = () => {
    if (!section1Complete || !section2Complete || !section3Complete) return;
    const num = "SR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Empty cart ───
  if (items.length === 0 && !orderPlaced) {
    if (!isLoggedIn) {
      // Not logged in warning
      return (
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
            <Lock className="h-8 w-8 text-gold" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
            {locale === "mn" ? "Нэвтэрнэ үү" : "Please log in"}
          </h1>
          <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
            {locale === "mn"
              ? "Захиалга өгөхийн өмнө хаягтаа нэвтрэх шаардлагатай."
              : "You need to sign in before placing an order."}
          </p>
          <Button
            onClick={() => setUserOpen(true)}
            className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90"
          >
            {locale === "mn" ? "Нэвтрэх" : "Sign In"}
          </Button>
        </div>
      );
    }

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
          <ShoppingBag className="h-8 w-8 text-gray-300" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
          {t("checkout.emptyCart")}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{t("checkout.emptyCartDesc")}</p>
        <Link href="/shop">
          <Button className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90">
            {t("checkout.goShopping")}
          </Button>
        </Link>
      </div>
    );
  }

  // ─── Order success ───
  if (orderPlaced) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-navy">
              {t("checkout.orderPlaced")}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
              {t("checkout.orderPlacedDesc")}
            </p>
            <div className="mt-6 rounded-xl bg-cream px-6 py-4">
              <p className="text-xs text-gray-500">{t("checkout.orderNumber")}</p>
              <p className="mt-1 font-display text-xl font-semibold text-navy tracking-wider">
                {orderNumber}
              </p>
            </div>
            <Link href="/shop">
              <Button className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90">
                {t("checkout.continueShopping")}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    );
  }

  // ─── Auth gate check ───
  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
          <Lock className="h-8 w-8 text-gold" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
          {locale === "mn" ? "Нэвтэрнэ үү" : "Please log in"}
        </h1>
        <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
          {locale === "mn"
            ? "Захиалга өгөхийн өмнө хаягтаа нэвтрэх шаардлагатай."
            : "You need to sign in before placing an order."}
        </p>
        <Button
          onClick={() => setUserOpen(true)}
          className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90"
        >
          {locale === "mn" ? "Нэвтрэх" : "Sign In"}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-16">
      {/* Header */}
      <FadeIn>
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); window.history.back(); }}
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("checkout.backToCart")}
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-navy md:text-4xl">
          {t("checkout.title")}
        </h1>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left: Checkout sections */}
        <div className="lg:col-span-7 space-y-4">

          {/* ═══ SECTION 1: Address & Delivery ═══ */}
          <div className={`rounded-2xl border bg-white transition-all duration-300 ${expandedSection >= 1 ? "border-gray-200" : "border-gray-100 opacity-60"}`}>
            <button
              type="button"
              onClick={() => setExpandedSection(1)}
              className="flex w-full items-center justify-between px-6 py-5 md:px-8"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${section1Complete ? "bg-green-50 text-green-600" : "bg-navy/10 text-navy"}`}>
                  {section1Complete ? <CheckCircle2 className="h-5 w-5" /> : "1"}
                </div>
                <div className="text-left">
                  <h2 className="text-base font-semibold text-navy">
                    {locale === "mn" ? "Хүргэлтийн хаяг" : "Delivery Address"}
                  </h2>
                  {section1Complete && expandedSection !== 1 && (
                    <p className="text-xs text-gray-500 mt-0.5">{district}, {khoroo}-р хороо, {address}</p>
                  )}
                </div>
              </div>
              {expandedSection === 1 ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>

            {expandedSection === 1 && (
              <div className="border-t border-gray-100 px-6 pb-6 pt-5 md:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Дүүрэг" : "District"} *
                    </Label>
                    <Select value={district} onValueChange={setDistrict}>
                      <SelectTrigger className="mt-1.5 min-h-[44px] w-full rounded-xl border-gray-200 bg-gray-50/50 shadow-none focus-visible:ring-gold/30">
                        <SelectValue placeholder={t("checkout.selectDistrict")} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border border-gray-100 bg-white shadow-lg">
                        {UB_DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d} className="rounded-lg">{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Хороо" : "Khoroo"} *
                    </Label>
                    <Input value={khoroo} onChange={(e) => setKhoroo(e.target.value)} placeholder="1" className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Хаяг / Байр / Тоот" : "Address / Building / Apt"} *
                    </Label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Нэмэлт тэмдэглэл" : "Notes"}
                    </Label>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder={t("checkout.notesPlaceholder")} className="mt-1.5 rounded-xl border-gray-200 bg-gray-50/50 resize-none focus-visible:ring-gold/30" />
                  </div>
                </div>

                {/* Delivery speed */}
                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-700">
                    {locale === "mn" ? "Хүргэлтийн төрөл" : "Delivery Speed"}
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryType("normal")}
                      className={`flex flex-col items-start rounded-xl border p-4 transition-all ${deliveryType === "normal" ? "border-navy bg-navy/5 ring-1 ring-navy/20" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-navy">
                          {locale === "mn" ? "Энгийн" : "Normal"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {locale === "mn" ? "2-3 өдөр" : "2-3 days"}
                      </p>
                      {district && (
                        <p className="mt-1 text-xs font-semibold text-navy">
                          {totalPrice >= 100000
                            ? (locale === "mn" ? "Үнэгүй" : "Free")
                            : formatPrice(DISTRICT_DELIVERY[district]?.normal || 5000)}
                        </p>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType("fast")}
                      className={`flex flex-col items-start rounded-xl border p-4 transition-all ${deliveryType === "fast" ? "border-gold bg-gold/5 ring-1 ring-gold/30" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-gold" />
                        <span className="text-sm font-medium text-navy">
                          {locale === "mn" ? "Хурдан" : "Express"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {locale === "mn" ? "Өнөөдөр / Маргааш" : "Today / Tomorrow"}
                      </p>
                      {district && (
                        <p className="mt-1 text-xs font-semibold text-gold-dark">
                          {totalPrice >= 100000
                            ? (locale === "mn" ? "Үнэгүй" : "Free")
                            : formatPrice(DISTRICT_DELIVERY[district]?.fast || 8000)}
                        </p>
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  disabled={!section1Complete}
                  onClick={() => setExpandedSection(2)}
                  className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {locale === "mn" ? "Үргэлжлүүлэх" : "Continue"}
                </Button>
              </div>
            )}
          </div>

          {/* ═══ SECTION 2: Personal Info & E-Barimt ═══ */}
          <div className={`rounded-2xl border bg-white transition-all duration-300 ${section1Complete ? "border-gray-200" : "border-gray-100 opacity-40 pointer-events-none"}`}>
            <button
              type="button"
              onClick={() => section1Complete && setExpandedSection(2)}
              className="flex w-full items-center justify-between px-6 py-5 md:px-8"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${section2Complete ? "bg-green-50 text-green-600" : section1Complete ? "bg-navy/10 text-navy" : "bg-gray-100 text-gray-400"}`}>
                  {section2Complete ? <CheckCircle2 className="h-5 w-5" /> : "2"}
                </div>
                <div className="text-left">
                  <h2 className="text-base font-semibold text-navy">
                    {locale === "mn" ? "Мэдээлэл & И-Баримт" : "Info & Invoice"}
                  </h2>
                  {section2Complete && expandedSection !== 2 && (
                    <p className="text-xs text-gray-500 mt-0.5">{firstName} {lastName}, {phone}</p>
                  )}
                </div>
              </div>
              {!section1Complete ? (
                <Lock className="h-4 w-4 text-gray-300" />
              ) : expandedSection === 2 ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedSection === 2 && section1Complete && (
              <div className="border-t border-gray-100 px-6 pb-6 pt-5 md:px-8">
                {/* Personal info */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Нэр" : "First Name"} *
                    </Label>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Овог" : "Last Name"} *
                    </Label>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "Утас" : "Phone"} *
                    </Label>
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+976" className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      {locale === "mn" ? "И-мэйл" : "Email"}
                    </Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                </div>

                {/* E-Barimt / Invoice type */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-semibold text-navy">И-Баримт</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { key: "personal" as InvoiceType, mn: "Хувь хүн", en: "Personal" },
                      { key: "company" as InvoiceType, mn: "Албан байгууллага", en: "Company" },
                      { key: "taxpayer" as InvoiceType, mn: "Татвар төлөгч иргэн", en: "Taxpayer" },
                    ]).map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => { setInvoiceType(opt.key); setCompanyRegId(""); }}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-medium transition-all ${
                          invoiceType === opt.key
                            ? "border-navy bg-navy/5 text-navy ring-1 ring-navy/20"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${invoiceType === opt.key ? "border-navy" : "border-gray-300"}`}>
                          {invoiceType === opt.key && <div className="h-2 w-2 rounded-full bg-navy" />}
                        </div>
                        {locale === "mn" ? opt.mn : opt.en}
                      </button>
                    ))}
                  </div>

                  {(invoiceType === "company" || invoiceType === "taxpayer") && (
                    <div className="mt-4">
                      <div className="mb-3 flex items-start gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3">
                        <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-yellow-800 leading-relaxed">
                          {locale === "mn"
                            ? "Та регистрийн дугаараа зөв бичнэ үү. Төлбөр төлөгдсөн тохиолдолд регистрийн дугаараа солих боломжгүйг анхаарна уу!"
                            : "Please enter your registration number correctly. Note that it cannot be changed after payment."}
                        </p>
                      </div>
                      <Label className="text-sm font-medium text-gray-700">
                        {locale === "mn" ? "Регистрийн дугаар" : "Registration Number"} *
                      </Label>
                      <Input
                        value={companyRegId}
                        onChange={(e) => setCompanyRegId(e.target.value)}
                        placeholder={locale === "mn" ? "Регистрийн дугаар" : "Registration number"}
                        className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  disabled={!section2Complete}
                  onClick={() => setExpandedSection(3)}
                  className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {locale === "mn" ? "Үргэлжлүүлэх" : "Continue"}
                </Button>
              </div>
            )}
          </div>

          {/* ═══ SECTION 3: Payment Method ═══ */}
          <div className={`rounded-2xl border bg-white transition-all duration-300 ${section1Complete && section2Complete ? "border-gray-200" : "border-gray-100 opacity-40 pointer-events-none"}`}>
            <button
              type="button"
              onClick={() => section1Complete && section2Complete && setExpandedSection(3)}
              className="flex w-full items-center justify-between px-6 py-5 md:px-8"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${section3Complete ? "bg-green-50 text-green-600" : section1Complete && section2Complete ? "bg-navy/10 text-navy" : "bg-gray-100 text-gray-400"}`}>
                  {section3Complete ? <CheckCircle2 className="h-5 w-5" /> : "3"}
                </div>
                <h2 className="text-base font-semibold text-navy">
                  {locale === "mn" ? "Төлбөрийн хэлбэр" : "Payment Method"}
                </h2>
              </div>
              {!(section1Complete && section2Complete) ? (
                <Lock className="h-4 w-4 text-gray-300" />
              ) : expandedSection === 3 ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedSection === 3 && section1Complete && section2Complete && (
              <div className="border-t border-gray-100 px-6 pb-6 pt-5 md:px-8">
                <div className="space-y-3">
                  {/* QPay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("qpay")}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all ${paymentMethod === "qpay" ? "border-navy bg-navy/5 ring-1 ring-navy/20" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                      <span className="text-lg font-bold text-blue-600">Q</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-navy">QPay</p>
                      <p className="text-xs text-gray-500">
                        {locale === "mn" ? "QR код уншуулж төлөх" : "Pay via QR code"}
                      </p>
                    </div>
                    <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "qpay" ? "border-navy" : "border-gray-300"}`}>
                      {paymentMethod === "qpay" && <div className="h-2.5 w-2.5 rounded-full bg-navy" />}
                    </div>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all ${paymentMethod === "card" ? "border-navy bg-navy/5 ring-1 ring-navy/20" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-navy">
                        {locale === "mn" ? "Карт" : "Card"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {locale === "mn" ? "Visa, Mastercard" : "Visa, Mastercard"}
                      </p>
                    </div>
                    <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-navy" : "border-gray-300"}`}>
                      {paymentMethod === "card" && <div className="h-2.5 w-2.5 rounded-full bg-navy" />}
                    </div>
                  </button>

                  {/* Loan / Installment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("loan")}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all ${paymentMethod === "loan" ? "border-navy bg-navy/5 ring-1 ring-navy/20" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                      <Building2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-navy">
                        {locale === "mn" ? "Зээл / Хуваан төлөх" : "Loan / Installment"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {locale === "mn" ? "Storepay, LendMN" : "Storepay, LendMN"}
                      </p>
                    </div>
                    <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "loan" ? "border-navy" : "border-gray-300"}`}>
                      {paymentMethod === "loan" && <div className="h-2.5 w-2.5 rounded-full bg-navy" />}
                    </div>
                  </button>
                </div>

                <Button
                  type="button"
                  disabled={!section3Complete}
                  onClick={handleSubmit}
                  className="mt-6 w-full min-h-[52px] rounded-xl bg-navy text-base font-semibold text-white tracking-wide hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {locale === "mn" ? "Захиалга баталгаажуулах" : "Confirm Order"} — {formatPrice(finalTotal)}
                </Button>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    {locale === "mn" ? "Аюулгүй" : "Secure"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    {locale === "mn" ? "Хурдан хүргэлт" : "Fast delivery"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary (sticky) */}
        <div className="lg:col-span-5">
          <FadeIn delay={0.15}>
            <div className="sticky top-36 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
              <h2 className="font-display text-lg font-semibold text-navy">
                {t("checkout.orderSummary")}
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-warm-gray">
                      <Image
                        src={item.product.image}
                        alt={locale === "mn" ? item.product.name.mn : item.product.name.en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark">
                          {item.product.brand}
                        </p>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {locale === "mn" ? item.product.name.mn : item.product.name.en}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-navy whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t("checkout.subtotal")}</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    {t("checkout.shipping")}
                    {deliveryType === "fast" && <Zap className="h-3 w-3 text-gold" />}
                  </span>
                  <span className="font-medium text-gray-900">
                    {deliveryCost === 0
                      ? t("checkout.shippingFree")
                      : formatPrice(deliveryCost)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-base font-medium text-gray-900">{t("checkout.total")}</span>
                  <span className="text-xl font-bold text-navy">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {totalPrice >= 100000 && (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-center">
                  <p className="text-xs font-medium text-green-700">
                    {locale === "mn" ? "🎉 Хүргэлт үнэгүй!" : "🎉 Free delivery!"}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
