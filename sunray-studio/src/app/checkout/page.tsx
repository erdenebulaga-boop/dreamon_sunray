"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
  ChevronRight,
  Building2,
  Info,
  Lock,
  Copy,
  Check,
  QrCode,
  Minus,
  Plus,
  Trash2,
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
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { useUser } from "@/lib/user";
import { formatPrice, getEffectivePrice } from "@/lib/format";
import { FadeIn } from "@/components/ui/motion";

const PROVINCES: Record<string, string[]> = {
  "Улаанбаатар": ["Баянгол", "Баянзүрх", "Сүхбаатар", "Чингэлтэй", "Хан-Уул", "Сонгинохайрхан", "Налайх", "Багануур", "Багахангай"],
  "Архангай": ["Эрдэнэбулган", "Өгийнуур", "Өлзийт", "Өндөр-Улаан", "Батцэнгэл", "Булган", "Жаргалант", "Ихтамир", "Тариат", "Төвшрүүлэх", "Хайрхан", "Хангай", "Хашаат", "Хотонт", "Цахир", "Цэнхэр", "Цэцэрлэг", "Чулуут", "Эрдэнэмандал"],
  "Баян-Өлгий": ["Өлгий", "Алтай", "Алтанцөгц", "Баяннуур", "Бугат", "Булган", "Буянт", "Дэлүүн", "Ногооннуур", "Сагсай", "Толбо", "Улаанхус", "Цэнгэл"],
  "Баянхонгор": ["Баянхонгор", "Баацагаан", "Баянбулаг", "Баянговь", "Баянлиг", "Баянцагаан", "Баянөндөр", "Бөмбөгөр", "Бууцагаан", "Галуут", "Гурванбулаг", "Жаргалант", "Жинст", "Заг", "Өлзийт", "Хүрээмарал", "Шинэжинст", "Эрдэнэцогт"],
  "Булган": ["Булган", "Баян-Агт", "Баяннуур", "Бугат", "Бүрэгхангай", "Гурванбулаг", "Дашинчилэн", "Могод", "Орхон", "Рашаант", "Сайхан", "Сэлэнгэ", "Тэшиг", "Хангал", "Хишиг-Өндөр", "Хутаг-Өндөр"],
  "Говь-Алтай": ["Алтай", "Баян-Уул", "Бигэр", "Бугат", "Дарви", "Дэлгэр", "Жаргалан", "Тайшир", "Тонхил", "Төгрөг", "Халиун", "Цогт", "Цээл", "Чандмань", "Шарга", "Эрдэнэ"],
  "Говьсүмбэр": ["Сүмбэр", "Баянтал", "Шивээговь"],
  "Дархан-Уул": ["Дархан", "Орхон", "Хонгор", "Шарын гол"],
  "Дорноговь": ["Сайншанд", "Айраг", "Алтанширээ", "Даланжаргалан", "Дэлгэрэх", "Замын-Үүд", "Иххэт", "Мандах", "Өргөн", "Сайхандулаан", "Улаанбадрах", "Хатанбулаг", "Хөвсгөл"],
  "Дорнод": ["Чойбалсан", "Баян-Уул", "Баяндун", "Баянтүмэн", "Булган", "Гурванзагал", "Дашбалбар", "Матад", "Сэргэлэн", "Халхгол", "Хөлөнбуйр", "Цагаан-Овоо", "Чулуунхороот"],
  "Дундговь": ["Мандалговь", "Адаацаг", "Баянжаргалан", "Говь-Угтаал", "Гурвансайхан", "Дэлгэрхангай", "Дэлгэрцогт", "Дэрэн", "Луус", "Өлзийт", "Өндөршил", "Сайнцагаан", "Сайхан-Овоо", "Хулд", "Цагаандэлгэр"],
  "Завхан": ["Улиастай", "Алдархаан", "Асгат", "Баянтэс", "Баянхайрхан", "Дөрвөлжин", "Завханмандал", "Идэр", "Их-Уул", "Нөмрөг", "Отгон", "Сантмаргац", "Сонгино", "Тосонцэнгэл", "Түдэвтэй", "Тэлмэн", "Ургамал", "Цагаанхайрхан", "Цагаанчулуут", "Цэцэн-Уул", "Шилүүстэй", "Эрдэнэхайрхан", "Яруу"],
  "Орхон": ["Эрдэнэт", "Жаргалант"],
  "Өвөрхангай": ["Арвайхээр", "Баруунбаян-Улаан", "Бат-Өлзий", "Баян-Өндөр", "Баянгол", "Богд", "Бүрд", "Гучин-Ус", "Зүүнбаян-Улаан", "Нарийнтээл", "Олзийт", "Сант", "Тарагт", "Төгрөг", "Уянга", "Хайрхандулаан", "Хаpaхорин", "Хужирт"],
  "Өмнөговь": ["Даланзадгад", "Баян-Овоо", "Баяндалай", "Булган", "Гурвантэс", "Мандал-Овоо", "Манлай", "Ноён", "Номгон", "Сэврэй", "Ханбогд", "Ханхонгор", "Хүрмэн", "Цогт-Овоо", "Цогтцэций"],
  "Сүхбаатар": ["Баруун-Урт", "Асгат", "Баяндэлгэр", "Дарьганга", "Мөнххаан", "Наран", "Онгон", "Сүхбаатар", "Түвшинширээ", "Түмэнцогт", "Уулбаян", "Халзан", "Эрдэнэцагаан"],
  "Сэлэнгэ": ["Сүхбаатар", "Алтанбулаг", "Баруунхараа", "Баянгол", "Ерөө", "Жавхлант", "Зүүнбүрэн", "Мандал", "Орхон", "Орхонтуул", "Сайхан", "Сант", "Түшиг", "Хушаат", "Цагааннуур", "Шаамар"],
  "Төв": ["Зуунмод", "Алтанбулаг", "Аргалант", "Архуст", "Батсүмбэр", "Баян", "Баяндэлгэр", "Баянжаргалан", "Баянхангай", "Баянцагаан", "Баянцогт", "Баянчандмань", "Борнуур", "Бүрэн", "Дэлгэрхаан", "Жаргалант", "Заамар", "Лүн", "Мөнгөнморьт", "Өндөрширээт", "Сэргэлэн", "Угтаалцайдам", "Цээл", "Эрдэнэ", "Эрдэнэсант"],
  "Увс": ["Улаангом", "Баруунтуруун", "Бөхмөрөн", "Давст", "Завхан", "Зүүнговь", "Зүүнхангай", "Малчин", "Наранбулаг", "Өлгий", "Өмнөговь", "Өндөрхангай", "Сагил", "Тариалан", "Тэс", "Түргэн", "Ховд", "Хяргас", "Цагаанхайрхан"],
  "Ховд": ["Ховд", "Алтай", "Булган", "Буянт", "Дарви", "Дуут", "Жаргалант", "Зэрэг", "Манхан", "Монгол Алтай", "Мөст", "Мянгад", "Үенч", "Цэцэг", "Чандмань", "Эрдэнэбүрэн"],
  "Хөвсгөл": ["Мөрөн", "Алаг-Эрдэнэ", "Арбулаг", "Баянзүрх", "Бүрэнтогтох", "Галт", "Жаргалант", "Их-Уул", "Рашаант", "Рэнчинлхүмбэ", "Тариалан", "Тосонцэнгэл", "Төмөрбулаг", "Түнэл", "Улаан-Уул", "Ханх", "Цагааннуур", "Цагаан-Уул", "Цагаан-Үүр", "Цэцэрлэг", "Чандмань-Өндөр", "Шинэ-Идэр", "Эрдэнэбулган"],
  "Хэнтий": ["Өндөрхаан", "Батноров", "Батширээт", "Биндэр", "Бор-Өндөр", "Галшар", "Дадал", "Дарьганга", "Дэлгэрхаан", "Жаргалтхаан", "Мөрөн", "Норовлин", "Өмнөдэлгэр", "Хэрлэн", "Цэнхэрмандал"],
};

// Delivery costs based on district/province
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
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const { isLoggedIn, user, createGuestUser, addOrder, setIsOpen: setUserOpen } = useUser();

  // Checkout state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<{
    items: typeof items;
    subtotal: number;
    deliveryCost: number;
    total: number;
    province: string;
    district: string;
    khoroo: string;
    address: string;
    notes: string;
    deliveryType: DeliveryType;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    invoiceType: InvoiceType;
    companyRegId: string;
    paymentMethod: PaymentMethod;
  } | null>(null);

  // Section 1: Address & Delivery
  const [province, setProvince] = useState("");
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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Section expand states
  const [expandedSection, setExpandedSection] = useState(1);

  // Validation
  const section1Complete = province !== "" && district !== "" && khoroo.trim() !== "" && address.trim() !== "";
  const section2Complete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    phone.trim() !== "" &&
    (invoiceType !== "company" || companyRegId.trim() !== "") &&
    (invoiceType !== "taxpayer" || companyRegId.trim() !== "");
  const section3Complete = paymentMethod !== "";

  // Field-level validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // Validate a section and scroll to first missing field
  const validateSection = (section: number): boolean => {
    const errors: { field: string; message: string }[] = [];

    if (section === 1) {
      if (!province) errors.push({ field: "province", message: "Хот / Аймаг сонгоно уу" });
      if (!district) errors.push({ field: "district", message: "Дүүрэг / Сум сонгоно уу" });
      if (!khoroo.trim()) errors.push({ field: "khoroo", message: "Баг / Хороо бөглөнө үү" });
      if (!address.trim()) errors.push({ field: "address", message: "Хаяг бөглөнө үү" });
    } else if (section === 2) {
      if (!firstName.trim()) errors.push({ field: "firstName", message: "Нэр бөглөнө үү" });
      if (!lastName.trim()) errors.push({ field: "lastName", message: "Овог бөглөнө үү" });
      if (!phone.trim()) errors.push({ field: "phone", message: "Утас бөглөнө үү" });
      if ((invoiceType === "company" || invoiceType === "taxpayer") && !companyRegId.trim()) {
        errors.push({ field: "companyRegId", message: "Регистрийн дугаар бөглөнө үү" });
      }
    }

    if (errors.length > 0) {
      const newErrors: Record<string, string> = {};
      errors.forEach((e) => { newErrors[e.field] = e.message; });
      setFieldErrors((prev) => ({ ...prev, ...newErrors }));

      // Scroll to first error
      const firstEl = document.getElementById(`field-${errors[0].field}`);
      if (firstEl) {
        firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  };

  // Pre-fill personal info from user context if logged in
  const prefilled = useRef(false);
  useEffect(() => {
    if (user && !prefilled.current) {
      prefilled.current = true;
      if (user.firstName && !firstName) setFirstName(user.firstName);
      if (user.lastName && !lastName) setLastName(user.lastName);
      if (user.phone && !phone) setPhone(user.phone);
      if (user.email && !email) setEmail(user.email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Delivery cost calculation
  const deliveryCost = useMemo(() => {
    if (totalPrice >= 100000) return 0;
    if (!district) return 0;
    if (province === "Улаанбаатар") {
      const rates = DISTRICT_DELIVERY[district];
      if (!rates) return deliveryType === "fast" ? 8000 : 5000;
      return deliveryType === "fast" ? rates.fast : rates.normal;
    }
    // Province delivery
    return deliveryType === "fast" ? 20000 : 12000;
  }, [province, district, deliveryType, totalPrice]);

  const finalTotal = totalPrice + deliveryCost;

  const handleSubmit = () => {
    if (!section1Complete) {
      setExpandedSection(1);
      setTimeout(() => validateSection(1), 100);
      return;
    }
    if (!section2Complete) {
      setExpandedSection(2);
      setTimeout(() => validateSection(2), 100);
      return;
    }
    if (!section3Complete) {
      setExpandedSection(3);
      const sectionEl = document.getElementById("section-payment");
      if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const num = "SR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderData = {
      items: [...items],
      subtotal: totalPrice,
      deliveryCost,
      total: finalTotal,
      province,
      district,
      khoroo,
      address,
      notes,
      deliveryType,
      firstName,
      lastName,
      phone,
      email,
      invoiceType,
      companyRegId,
      paymentMethod,
    };
    setSubmittedOrder(orderData);
    setOrderNumber(num);
    setOrderPlaced(true);

    // Create order record
    const newOrder: import("@/lib/user").Order = {
      id: num,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      total: finalTotal,
      items: items.reduce((sum, i) => sum + i.quantity, 0),
      lineItems: items.map((i) => ({
        name: i.product.name,
        image: i.product.image,
        price: getEffectivePrice(i.product),
        quantity: i.quantity,
      })),
      deliveryMethod: deliveryType,
      deliveryCost,
      district,
      khoroo,
      address,
      paymentMethod,
      buyerName: `${firstName} ${lastName}`,
      buyerPhone: phone,
      buyerEmail: email,
      ebarimt: invoiceType,
      companyReg: companyRegId || undefined,
      notes: notes || undefined,
    };

    // If not logged in, create guest (unconfirmed) user
    if (!isLoggedIn) {
      createGuestUser({ firstName, lastName, email, phone });
    }
    addOrder(newOrder);

    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Empty cart ───
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
          <ShoppingBag className="h-8 w-8 text-gray-300" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold text-navy">
          Сагс хоосон байна
        </h1>
        <p className="mt-2 text-sm text-gray-500">Захиалга өгөхийн өмнө бүтээгдэхүүн нэмнэ үү.</p>
        <Link href="/shop">
          <Button className="mt-8 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90">
            Дэлгүүр үзэх
          </Button>
        </Link>
      </div>
    );
  }

  // ─── Order success ───
  if (orderPlaced && submittedOrder) {
    const invoiceLabels: Record<string, string> = { personal: "Хувь хүн", company: "Албан байгууллага", taxpayer: "Татвар төлөгч иргэн" };
    const paymentLabels: Record<string, string> = { qpay: "QPay", card: "Карт (Visa, Mastercard)", loan: "Зээл / Хуваан төлөх" };
    const deliveryLabels: Record<string, string> = { normal: "Энгийн хүргэлт (2-3 өдөр)", fast: "Хурдан хүргэлт (Өнөөдөр / Маргааш)" };

    return (
      <div className="mx-auto max-w-3xl px-6 py-10 md:px-12 md:py-16">
        <FadeIn>
          {/* Success header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-semibold text-navy md:text-3xl">
              Захиалга амжилттай!
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
              Захиалга баталгаажлаа. Хүргэлтийн мэдээллийг тодруулахаар тантай удахгүй холбогдоно.
            </p>
          </div>

          {/* Guest account notice */}
          {user?.status === "unconfirmed" && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
              <p className="text-sm font-semibold text-amber-800">
                Таны мэдээллээр хаяг үүсгэгдлээ
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-700">
                Захиалгаа хянах, дахин захиалга өгөхийн тулд профайл хэсгээс хаягаа баталгаажуулна уу.
              </p>
              <Button
                onClick={() => setUserOpen(true)}
                className="mt-3 min-h-[44px] rounded-xl border-2 border-amber-600 bg-white px-6 text-sm font-semibold text-amber-800 hover:bg-amber-100"
              >
                Хаяг баталгаажуулах
              </Button>
            </div>
          )}

          {/* Order number & totals card */}
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Захиалгын дугаар</p>
                <p className="mt-1 font-display text-xl font-bold text-navy tracking-wider">{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Огноо</p>
                <p className="mt-1 text-sm font-medium text-gray-700">{new Date().toLocaleDateString("mn-MN")}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Барааны дүн</span>
                <span className="font-medium text-gray-900">{formatPrice(submittedOrder.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Хүргэлтийн төлбөр</span>
                <span className="font-medium text-gray-900">
                  {submittedOrder.deliveryCost === 0 ? "Үнэгүй" : formatPrice(submittedOrder.deliveryCost)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-2.5 mt-1">
                <span className="text-sm font-semibold text-navy">Нийт төлсөн дүн</span>
                <span className="text-lg font-bold text-navy">{formatPrice(submittedOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery info card */}
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5">
                <Truck className="h-5 w-5 text-navy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">{deliveryLabels[submittedOrder.deliveryType]}</p>
                <p className="text-xs text-gray-500">order@sunray.mn</p>
              </div>
            </div>

            {/* Ordered items */}
            <div className="space-y-3">
              {submittedOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 rounded-xl border border-gray-100 p-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.product.brand}</p>
                    <p className="text-sm font-medium text-navy line-clamp-2 leading-snug">{item.product.name}</p>
                    <p className="mt-1 text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-navy flex-shrink-0 text-right">{formatPrice(getEffectivePrice(item.product) * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Buyer info card */}
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <h3 className="text-base font-semibold text-navy mb-5">Захиалагчийн мэдээлэл</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Овог</p>
                <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.lastName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Нэр</p>
                <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.firstName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Утас</p>
                <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Цахим хаяг</p>
                <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.email || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">И-Баримт</p>
                <p className="mt-0.5 text-sm text-gray-700">{invoiceLabels[submittedOrder.invoiceType]}</p>
              </div>
              {submittedOrder.companyRegId && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Регистрийн дугаар</p>
                  <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.companyRegId}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Төлбөрийн хэлбэр</p>
                <p className="mt-0.5 text-sm text-gray-700">{paymentLabels[submittedOrder.paymentMethod] || "—"}</p>
              </div>
            </div>
          </div>

          {/* Delivery address card */}
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <h3 className="text-base font-semibold text-navy mb-5">Хүргэлтийн мэдээлэл</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <div className="col-span-2 sm:col-span-3">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Хүргэлтийн хаяг</p>
                <p className="mt-0.5 text-sm text-gray-700">
                  {submittedOrder.province}, {submittedOrder.district}, {submittedOrder.province === "Улаанбаатар" ? `${submittedOrder.khoroo}-р хороо` : submittedOrder.khoroo}, {submittedOrder.address}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Утас</p>
                <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Цахим хаяг</p>
                <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.email || "—"}</p>
              </div>
              {submittedOrder.notes && (
                <div className="col-span-2 sm:col-span-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Тэмдэглэл</p>
                  <p className="mt-0.5 text-sm text-gray-700">{submittedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Continue shopping */}
          <div className="mt-8 flex justify-center">
            <Link href="/shop">
              <Button className="min-h-[48px] rounded-xl bg-navy px-10 text-white hover:bg-navy/90">
                Дэлгүүр үргэлжлүүлэх
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 pb-32 md:px-12 md:py-16 lg:pb-16">
      {/* Header */}
      <FadeIn>
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); window.history.back(); }}
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Сагс руу буцах
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold text-navy md:text-4xl">
          Захиалга
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
                    Хүргэлтийн хаяг
                  </h2>
                  {section1Complete && expandedSection !== 1 && (
                    <p className="text-xs text-gray-500 mt-0.5">{province}, {district}, {province === "Улаанбаатар" ? `${khoroo}-р хороо` : khoroo}, {address}</p>
                  )}
                </div>
              </div>
              {expandedSection === 1 ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>

            {expandedSection === 1 && (
              <div className="border-t border-gray-100 px-6 pb-6 pt-5 md:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div id="field-province">
                    <Label className="text-sm font-medium text-gray-700">
                      Хот / Аймаг *
                    </Label>
                    <Select value={province} onValueChange={(v) => { setProvince(v); setDistrict(""); setKhoroo(""); clearFieldError("province"); }}>
                      <SelectTrigger className={`mt-1.5 min-h-[44px] w-full rounded-xl bg-gray-50/50 shadow-none focus-visible:ring-gold/30 ${fieldErrors.province ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`}>
                        <SelectValue placeholder="Хот / Аймаг сонгох" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] rounded-xl border border-gray-100 bg-white shadow-lg">
                        {Object.keys(PROVINCES).map((p) => (
                          <SelectItem key={p} value={p} className="rounded-lg">{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.province && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.province}</p>}
                  </div>
                  <div id="field-district">
                    <Label className="text-sm font-medium text-gray-700">
                      {province === "Улаанбаатар" ? "Дүүрэг" : "Дүүрэг / Сум"} *
                    </Label>
                    <Select value={district} onValueChange={(v) => { setDistrict(v); clearFieldError("district"); }} disabled={!province}>
                      <SelectTrigger className={`mt-1.5 min-h-[44px] w-full rounded-xl bg-gray-50/50 shadow-none focus-visible:ring-gold/30 disabled:opacity-50 ${fieldErrors.district ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`}>
                        <SelectValue placeholder={province === "Улаанбаатар" ? "Дүүрэг сонгох" : "Дүүрэг / Сум сонгох"} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] rounded-xl border border-gray-100 bg-white shadow-lg">
                        {(PROVINCES[province] || []).map((d) => (
                          <SelectItem key={d} value={d} className="rounded-lg">{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldErrors.district && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.district}</p>}
                  </div>
                  <div id="field-khoroo">
                    <Label className="text-sm font-medium text-gray-700">
                      {province === "Улаанбаатар" ? "Хороо" : "Баг"} *
                    </Label>
                    <Input value={khoroo} onChange={(e) => { setKhoroo(e.target.value); clearFieldError("khoroo"); }} placeholder={province === "Улаанбаатар" ? "1" : "Багийн нэр"} className={`mt-1.5 min-h-[44px] rounded-xl bg-gray-50/50 focus-visible:ring-gold/30 ${fieldErrors.khoroo ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`} />
                    {fieldErrors.khoroo && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.khoroo}</p>}
                  </div>
                  <div className="sm:col-span-2" id="field-address">
                    <Label className="text-sm font-medium text-gray-700">
                      Хаяг / Байр / Тоот *
                    </Label>
                    <Input value={address} onChange={(e) => { setAddress(e.target.value); clearFieldError("address"); }} className={`mt-1.5 min-h-[44px] rounded-xl bg-gray-50/50 focus-visible:ring-gold/30 ${fieldErrors.address ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`} />
                    {fieldErrors.address && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.address}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Нэмэлт тэмдэглэл
                    </Label>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Хүргэлтийн нэмэлт заавар..." className="mt-1.5 rounded-xl border-gray-200 bg-gray-50/50 resize-none focus-visible:ring-gold/30" />
                  </div>
                </div>

                {/* Delivery speed */}
                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-700">
                    Хүргэлтийн төрөл
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
                          Энгийн
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        2-3 өдөр
                      </p>
                      {district && (
                        <p className="mt-1 text-xs font-semibold text-navy">
                          {totalPrice >= 100000
                            ? "Үнэгүй"
                            : formatPrice(province === "Улаанбаатар" ? (DISTRICT_DELIVERY[district]?.normal || 5000) : 12000)}
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
                          Хурдан
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {province === "Улаанбаатар" ? "Өнөөдөр / Маргааш" : "3-5 өдөр"}
                      </p>
                      {district && (
                        <p className="mt-1 text-xs font-semibold text-gold-dark">
                          {totalPrice >= 100000
                            ? "Үнэгүй"
                            : formatPrice(province === "Улаанбаатар" ? (DISTRICT_DELIVERY[district]?.fast || 8000) : 20000)}
                        </p>
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (validateSection(1)) setExpandedSection(2);
                  }}
                  className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90"
                >
                  Үргэлжлүүлэх
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
                    Мэдээлэл & И-Баримт
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
                  <div id="field-firstName">
                    <Label className="text-sm font-medium text-gray-700">
                      Нэр *
                    </Label>
                    <Input value={firstName} onChange={(e) => { setFirstName(e.target.value); clearFieldError("firstName"); }} className={`mt-1.5 min-h-[44px] rounded-xl bg-gray-50/50 focus-visible:ring-gold/30 ${fieldErrors.firstName ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`} />
                    {fieldErrors.firstName && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.firstName}</p>}
                  </div>
                  <div id="field-lastName">
                    <Label className="text-sm font-medium text-gray-700">
                      Овог *
                    </Label>
                    <Input value={lastName} onChange={(e) => { setLastName(e.target.value); clearFieldError("lastName"); }} className={`mt-1.5 min-h-[44px] rounded-xl bg-gray-50/50 focus-visible:ring-gold/30 ${fieldErrors.lastName ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`} />
                    {fieldErrors.lastName && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.lastName}</p>}
                  </div>
                  <div id="field-phone">
                    <Label className="text-sm font-medium text-gray-700">
                      Утас *
                    </Label>
                    <Input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); clearFieldError("phone"); }} placeholder="+976" className={`mt-1.5 min-h-[44px] rounded-xl bg-gray-50/50 focus-visible:ring-gold/30 ${fieldErrors.phone ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`} />
                    {fieldErrors.phone && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.phone}</p>}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      И-мэйл
                    </Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 min-h-[44px] rounded-xl border-gray-200 bg-gray-50/50 focus-visible:ring-gold/30" />
                  </div>
                </div>

                {/* E-Barimt / Invoice type */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-semibold text-navy">И-Баримт</span>
                  </div>

                  <div className="flex flex-col gap-2 sm:grid sm:grid-cols-3">
                    {([
                      { key: "personal" as InvoiceType, label: "Хувь хүн" },
                      { key: "company" as InvoiceType, label: "Албан байгууллага" },
                      { key: "taxpayer" as InvoiceType, label: "Татвар төлөгч иргэн" },
                    ]).map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => { setInvoiceType(opt.key); setCompanyRegId(""); }}
                        className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm sm:text-xs sm:justify-center font-medium transition-all ${
                          invoiceType === opt.key
                            ? "border-navy bg-navy/5 text-navy ring-1 ring-navy/20"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <div className={`h-4 w-4 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${invoiceType === opt.key ? "border-navy" : "border-gray-300"}`}>
                          {invoiceType === opt.key && <div className="h-2 w-2 rounded-full bg-navy" />}
                        </div>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {(invoiceType === "company" || invoiceType === "taxpayer") && (
                    <div className="mt-4" id="field-companyRegId">
                      <div className="mb-3 flex items-start gap-2 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3">
                        <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-yellow-800 leading-relaxed">
                          Та регистрийн дугаараа зөв бичнэ үү. Төлбөр төлөгдсөн тохиолдолд регистрийн дугаараа солих боломжгүйг анхаарна уу!
                        </p>
                      </div>
                      <Label className="text-sm font-medium text-gray-700">
                        Регистрийн дугаар *
                      </Label>
                      <Input
                        value={companyRegId}
                        onChange={(e) => { setCompanyRegId(e.target.value); clearFieldError("companyRegId"); }}
                        placeholder="Регистрийн дугаар"
                        className={`mt-1.5 min-h-[44px] rounded-xl bg-gray-50/50 focus-visible:ring-gold/30 ${fieldErrors.companyRegId ? "border-red-500 ring-1 ring-red-200" : "border-gray-200"}`}
                      />
                      {fieldErrors.companyRegId && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.companyRegId}</p>}
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (validateSection(2)) setExpandedSection(3);
                  }}
                  className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90"
                >
                  Үргэлжлүүлэх
                </Button>
              </div>
            )}
          </div>

          {/* ═══ SECTION 3: Payment Method ═══ */}
          <div id="section-payment" className={`rounded-2xl border bg-white transition-all duration-300 ${section1Complete && section2Complete ? "border-gray-200" : "border-gray-100 opacity-40 pointer-events-none"}`}>
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
                  Төлбөрийн хэлбэр
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
                  <div className={`rounded-xl border transition-all ${paymentMethod === "qpay" ? "border-navy ring-1 ring-navy/20" : "border-gray-200"}`}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod(paymentMethod === "qpay" ? "" : "qpay")}
                      className={`flex w-full items-center gap-4 p-4 transition-all ${paymentMethod === "qpay" ? "bg-navy/5" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                        <span className="text-lg font-bold text-blue-600">Q</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-navy">QPay</p>
                        <p className="text-xs text-gray-500">
                          QR код уншуулж төлөх
                        </p>
                      </div>
                      <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "qpay" ? "border-navy" : "border-gray-300"}`}>
                        {paymentMethod === "qpay" && <div className="h-2.5 w-2.5 rounded-full bg-navy" />}
                      </div>
                    </button>

                    {/* QPay expanded detail */}
                    {paymentMethod === "qpay" && (
                      <div className="border-t border-gray-100">
                        {/* Mobile: Bank list */}
                        <div className="p-4 md:hidden">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Банк сонгох</p>
                          <div className="space-y-2">
                            {[
                              { name: "Хаан банк", color: "bg-green-600", letter: "Х" },
                              { name: "Худалдаа хөгжлийн банк", color: "bg-blue-600", letter: "Х" },
                              { name: "Төрийн банк", color: "bg-sky-600", letter: "Т" },
                              { name: "Голомт банк", color: "bg-orange-500", letter: "Г" },
                              { name: "Богд банк", color: "bg-red-600", letter: "Б" },
                              { name: "М банк", color: "bg-violet-600", letter: "М" },
                              { name: "Хас банк", color: "bg-teal-600", letter: "Х" },
                            ].map((bank) => (
                              <button
                                key={bank.name}
                                type="button"
                                className="flex w-full items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 active:bg-gray-100"
                              >
                                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bank.color} text-white text-sm font-bold`}>
                                  {bank.letter}
                                </div>
                                <span className="text-sm font-medium text-gray-800">{bank.name}</span>
                                <ChevronRight className="ml-auto h-4 w-4 text-gray-300" />
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="mt-2 flex w-full items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 text-sm font-bold">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-800">Social pay / Бүх төрлийн карт</span>
                            <ChevronRight className="ml-auto h-4 w-4 text-gray-300" />
                          </button>
                        </div>

                        {/* Desktop: QR code + copyable fields */}
                        <div className="hidden md:block p-6">
                          <div className="flex gap-8">
                            {/* QR Code placeholder */}
                            <div className="flex flex-col items-center gap-3">
                              <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                                <QrCode className="h-16 w-16 text-gray-300" />
                              </div>
                              <p className="text-xs text-gray-400">QR код уншуулах</p>
                            </div>

                            {/* Copyable payment fields */}
                            <div className="flex-1 space-y-4">
                              <p className="text-sm font-semibold text-navy">Дансаар төлөх</p>

                              {[
                                { label: "Дансны дугаар (IBAN)", value: "MN76 0004 000406201417", field: "iban" },
                                { label: "Хүлээн авагч", value: "Sunray Studio LLC", field: "recipient" },
                              ].map((item) => (
                                <div key={item.field}>
                                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                                  <div className="mt-1 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                                    <span className="text-sm font-medium text-gray-800">{item.value}</span>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(item.value, item.field)}
                                      className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                                    >
                                      {copiedField === item.field ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}

                              <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Захиалгын дүн</p>
                                <div className="mt-1 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                                  <span className="text-sm font-bold text-navy">{formatPrice(finalTotal)}</span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(String(finalTotal), "amount")}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                                  >
                                    {copiedField === "amount" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Гүйлгээний утга</p>
                                <div className="mt-1 flex items-center justify-between rounded-lg border-2 border-blue-200 bg-blue-50 px-4 py-2.5">
                                  <span className="text-sm font-bold text-blue-700">{orderNumber || "SR-XXXXX"}</span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(orderNumber || "SR-XXXXX", "ref")}
                                    className="flex h-8 w-8 items-center justify-center rounded-md text-blue-400 transition-colors hover:bg-blue-100 hover:text-blue-600"
                                  >
                                    {copiedField === "ref" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                  </button>
                                </div>
                              </div>

                              <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3">
                                <div className="flex items-start gap-2">
                                  <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  <div className="text-xs text-yellow-800 leading-relaxed space-y-1">
                                    <p>Гүйлгээний утга дээр захиалгын дугаараа заавал бичнэ үү.</p>
                                    <p>Төлбөр баталгаажсаны дараа захиалга автоматаар идэвхжинэ.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

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
                        Карт
                      </p>
                      <p className="text-xs text-gray-500">
                        Visa, Mastercard
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
                        Зээл / Хуваан төлөх
                      </p>
                      <p className="text-xs text-gray-500">
                        Storepay, LendMN
                      </p>
                    </div>
                    <div className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "loan" ? "border-navy" : "border-gray-300"}`}>
                      {paymentMethod === "loan" && <div className="h-2.5 w-2.5 rounded-full bg-navy" />}
                    </div>
                  </button>
                </div>

                <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Нийт дүн</span>
                    <span className="text-lg font-bold text-navy">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="mt-3 w-full min-h-[52px] rounded-xl bg-navy text-sm font-semibold text-white tracking-wide hover:bg-navy/90"
                >
                  Захиалга баталгаажуулах
                </Button>
                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    Аюулгүй
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    Хурдан хүргэлт
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <FadeIn delay={0.15}>
            <div className="sticky top-36 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
              <h2 className="font-display text-lg font-semibold text-navy">
                Захиалгын хураангуй
              </h2>

              {/* Locked notice when on payment step */}
              {expandedSection === 3 && section1Complete && section2Complete && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800">Захиалга түгжигдсэн</p>
                    <p className="text-xs leading-relaxed text-amber-700 mt-0.5">
                      Төлбөрийн хэсэгт байгаа тул захиалга өөрчлөх боломжгүй.
                    </p>
                    <button
                      onClick={() => setExpandedSection(1)}
                      className="mt-1.5 text-xs font-semibold text-amber-800 underline underline-offset-2 hover:text-amber-900"
                    >
                      Захиалга өөрчлөх →
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-warm-gray">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                            {item.product.brand}
                          </p>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.product.name}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-navy whitespace-nowrap">
                          {formatPrice(getEffectivePrice(item.product) * item.quantity)}
                        </p>
                      </div>
                      {/* Quantity controls — hidden when on payment step */}
                      {expandedSection === 3 && section1Complete && section2Complete ? (
                        <p className="mt-1 text-xs text-gray-400">x{item.quantity}</p>
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex h-8 items-center rounded-lg border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-full w-8 items-center justify-center text-gray-400 transition-colors hover:text-navy"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-navy">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-full w-8 items-center justify-center text-gray-400 transition-colors hover:text-navy"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Нийт</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    Хүргэлт
                    {deliveryType === "fast" && <Zap className="h-3 w-3 text-gold" />}
                  </span>
                  <span className="font-medium text-gray-900">
                    {deliveryCost === 0
                      ? "Үнэгүй"
                      : formatPrice(deliveryCost)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-base font-medium text-gray-900">Нийт дүн</span>
                  <span className="text-xl font-bold text-navy">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {totalPrice >= 100000 && (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-center">
                  <p className="text-xs font-medium text-green-700">
                    🎉 Хүргэлт үнэгүй!
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Mobile sticky bottom summary */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-md px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Нийт дүн
            </p>
            <p className="text-xl font-bold text-navy">
              {formatPrice(finalTotal)}
            </p>
            {deliveryCost > 0 && (
              <p className="text-xs text-gray-400">
                + хүргэлт {formatPrice(deliveryCost)}
              </p>
            )}
            {deliveryCost === 0 && totalPrice >= 100000 && (
              <p className="text-xs text-green-600 font-medium">
                Хүргэлт үнэгүй
              </p>
            )}
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="min-h-[48px] rounded-xl bg-navy px-6 text-sm font-semibold text-white tracking-wide hover:bg-navy/90"
          >
            Захиалах
          </Button>
        </div>
      </div>
    </div>
  );
}
