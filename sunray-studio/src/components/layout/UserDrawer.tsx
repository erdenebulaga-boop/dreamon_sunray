"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { User, LogOut, Package, Settings, Trash2, UserCog, X, ArrowLeft, Check, AlertTriangle, MapPin, Truck, CreditCard, ChevronRight } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, type Order } from "@/lib/user";
import { formatPrice } from "@/lib/format";

type AuthView = "login" | "register";
type ProfileSection = "menu" | "orders" | "info" | "orderDetail" | "settings" | "confirm";

// ─── Sub-view header with back button ───
function SubViewHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
      <button
        onClick={onBack}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <span className="text-base font-semibold text-navy">{title}</span>
    </div>
  );
}

// ─── Order status badge ───
function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const config = {
    pending: { label: "Хүлээгдэж буй", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    processing: { label: "Бэлтгэж буй", className: "bg-blue-50 text-blue-700 border-blue-200" },
    delivered: { label: "Хүргэгдсэн", className: "bg-green-50 text-green-700 border-green-200" },
    cancelled: { label: "Цуцлагдсан", className: "bg-red-50 text-red-700 border-red-200" },
  };
  const c = config[status];
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${c.className}`}>
      {c.label}
    </span>
  );
}

// ─── My Orders view (combined active + history) ───
function OrdersView({ onBack, onSelectOrder }: { onBack: () => void; onSelectOrder: (order: Order) => void }) {
  const { orders } = useUser();
  const [tab, setTab] = useState<"active" | "history">("active");

  const activeOrders = orders.filter((o) => o.status === "pending" || o.status === "processing");
  const historyOrders = orders.filter((o) => o.status === "delivered" || o.status === "cancelled");
  const displayOrders = tab === "active" ? activeOrders : historyOrders;
  const emptyLabel = tab === "active" ? "Идэвхитэй захиалга байхгүй" : "Захиалгын түүх хоосон";

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title="Миний захиалгууд" onBack={onBack} />

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-6">
        <button
          onClick={() => setTab("active")}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${tab === "active" ? "text-navy" : "text-gray-400 hover:text-gray-600"}`}
        >
          Идэвхитэй
          {activeOrders.length > 0 && (
            <span className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${tab === "active" ? "bg-navy text-white" : "bg-gray-100 text-gray-500"}`}>
              {activeOrders.length}
            </span>
          )}
          {tab === "active" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy rounded-full" />}
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${tab === "history" ? "text-navy" : "text-gray-400 hover:text-gray-600"}`}
        >
          Түүх
          {historyOrders.length > 0 && (
            <span className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${tab === "history" ? "bg-navy text-white" : "bg-gray-100 text-gray-500"}`}>
              {historyOrders.length}
            </span>
          )}
          {tab === "history" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy rounded-full" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {displayOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package className="mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">{emptyLabel}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="w-full rounded-xl border border-gray-100 p-4 text-left transition-colors hover:border-gray-200 hover:bg-gray-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">{order.id}</span>
                  <div className="flex items-center gap-2">
                    <OrderStatusBadge status={order.status} />
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span className="font-medium text-navy">{formatPrice(order.total)}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {order.items} бүтээгдэхүүн
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── My Info view ───
function InfoView({ onBack }: { onBack: () => void }) {
  const { user, updateUser } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [facebook, setFacebook] = useState(user?.facebook || "");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ firstName, lastName, email, phone, facebook });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title="Миний мэдээлэл" onBack={onBack} />
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-gray-700">Нэр</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Овог</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">И-мэйл</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Утас</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Facebook</Label>
            <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="facebook.com/username" className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide"
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Хадгалагдлаа
            </span>
          ) : (
            "Хадгалах"
          )}
        </Button>
      </form>
    </div>
  );
}

// ─── Info row helper ───
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm text-gray-700">{value}</p>
    </div>
  );
}

// ─── Order Detail view ───
function OrderDetailView({ order, onBack }: { order: Order; onBack: () => void }) {
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<"pending" | "confirmed" | null>(null);
  const subtotal = order.lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckPayment = () => {
    setCheckingPayment(true);
    setPaymentResult(null);
    // Demo: simulate API call
    setTimeout(() => {
      setCheckingPayment(false);
      // Demo: pending orders stay pending, processing orders show confirmed
      setPaymentResult(order.status === "processing" ? "confirmed" : "pending");
    }, 1500);
  };

  const deliveryLabel = order.deliveryMethod === "fast" ? "Шуурхай" : "Энгийн";

  const paymentLabel: Record<string, string> = {
    QPay: "QPay",
    Card: "Карт",
    Loan: "Зээл / Хуваалт",
  };

  const ebarimtLabel: Record<string, string> = {
    personal: "Хувь хүн",
    company: "Байгууллага",
    taxpayer: "Татвар төлөгч",
  };

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title={order.id} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        {/* Status header */}
        <div className="flex items-center justify-between bg-gray-50 px-6 py-3">
          <span className="text-xs text-gray-500">{order.date}</span>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Order info grid */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Захиалгын мэдээлэл
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoRow label="Нэр" value={order.buyerName} />
            <InfoRow label="Утас" value={order.buyerPhone} />
            <InfoRow label="Имэйл" value={order.buyerEmail} />
            <InfoRow label="Е-Баримт" value={ebarimtLabel[order.ebarimt]} />
            {order.ebarimt === "company" && order.companyReg && (
              <InfoRow label="Байгууллагын РД" value={order.companyReg} />
            )}
            <InfoRow label="Төлбөр" value={paymentLabel[order.paymentMethod] || order.paymentMethod} />
          </div>
        </div>

        {/* Delivery grid */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Хүргэлт
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoRow label="Дүүрэг" value={order.district} />
            <InfoRow label="Хороо" value={order.khoroo} />
            <InfoRow label="Хүргэлтийн төрөл" value={deliveryLabel} />
            <InfoRow
              label="Хүргэлтийн төлбөр"
              value={order.deliveryCost === 0 ? "Үнэгүй" : formatPrice(order.deliveryCost)}
            />
            <div className="col-span-2">
              <InfoRow label="Хаяг" value={order.address} />
            </div>
            {order.notes && (
              <div className="col-span-2">
                <InfoRow label="Тэмдэглэл" value={order.notes} />
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Бүтээгдэхүүн ({order.items})
          </h4>
          <div className="space-y-3">
            {order.lineItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    {item.quantity > 1 ? `${item.quantity} × ` : ""}{formatPrice(item.price)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-navy">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="px-6 py-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Дүн</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Хүргэлт</span>
                <span>{order.deliveryCost === 0 ? "Үнэгүй" : formatPrice(order.deliveryCost)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-2.5 mt-1">
                <span className="text-sm font-semibold text-navy">Нийт</span>
                <span className="text-base font-bold text-navy">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Check payment — only for pending/processing orders */}
        {(order.status === "pending" || order.status === "processing") && (
          <div className="px-6 pb-8">
            <Button
              onClick={handleCheckPayment}
              disabled={checkingPayment}
              className="w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide disabled:opacity-60"
            >
              {checkingPayment ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Шалгаж байна...
                </span>
              ) : (
                "Төлбөр шалгах"
              )}
            </Button>

            {paymentResult === "confirmed" && (
              <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Төлбөр баталгаажсан</p>
                  <p className="text-xs text-green-600 mt-0.5">Захиалга бэлтгэгдэж байна</p>
                </div>
              </div>
            )}

            {paymentResult === "pending" && (
              <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Төлбөр хүлээгдэж байна</p>
                  <p className="text-xs text-yellow-600 mt-0.5">Төлбөр төлсөн бол түр хүлээнэ үү</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Settings view (change password + delete account) ───
function SettingsView({ onBack }: { onBack: () => void }) {
  const { changePassword, deleteAccount, setIsOpen } = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    const success = changePassword(oldPassword, newPassword);
    if (success) {
      setSaved(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title="Тохиргоо" onBack={onBack} />
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
        <h4 className="mb-4 text-sm font-semibold text-navy">Нууц үг солих</h4>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-gray-700">Одоогийн нууц үг</Label>
            <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Шинэ нууц үг</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Нууц үг давтах</Label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide"
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Хадгалагдлаа
            </span>
          ) : (
            "Нууц үг солих"
          )}
        </Button>

        {/* Delete Account */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          {!showDelete ? (
            <button
              onClick={() => setShowDelete(true)}
              className="flex w-full items-center gap-2.5 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Хаяг устгах
            </button>
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-semibold text-red-700">
                  Та итгэлтэй байна уу?
                </span>
              </div>
              <p className="text-xs leading-relaxed text-red-600/80 mb-3">
                Таны бүх мэдээлэл, захиалгын түүх бүрмөсөн устах болно.
              </p>
              <label className="flex items-start gap-2.5 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={deleteConfirmed}
                  onChange={(e) => setDeleteConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-red-500"
                />
                <span className="text-xs text-red-700">
                  Хаяг устгахыг зөвшөөрч байна
                </span>
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => { setShowDelete(false); setDeleteConfirmed(false); }}
                  variant="outline"
                  className="flex-1 min-h-[40px] rounded-lg border-red-200 text-xs font-medium text-red-600"
                >
                  Буцах
                </Button>
                <Button
                  type="button"
                  onClick={() => { deleteAccount(); setIsOpen(false); }}
                  disabled={!deleteConfirmed}
                  className="flex-1 min-h-[40px] rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Хаяг устгах
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Auth Form (login / register) ───
function AuthForm() {
  const { login, register } = useUser();
  const [view, setView] = useState<AuthView>("login");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailOrPhone, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const isPhone = /^\d+$/.test(emailOrPhone.replace(/[\s\-\+]/g, ""));
    register({ firstName, lastName, email: isPhone ? "" : emailOrPhone, phone: isPhone ? emailOrPhone : "", facebook: "", status: "confirmed" }, password);
  };

  if (view === "register") {
    return (
      <div className="flex flex-1 flex-col px-6 py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
            <User className="h-7 w-7 text-navy" />
          </div>
          <h3 className="text-lg font-semibold text-navy">Бүртгүүлэх</h3>
          <p className="mt-1 text-sm text-gray-500">Шинэ хаяг үүсгэх</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-gray-700">Нэр</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Овог</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Утасны дугаар эсвэл И-мэйл</Label>
            <Input value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} required placeholder="Жишээ: 99001122 эсвэл info@mail.com" className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            <p className="mt-1.5 text-xs text-gray-400">Утасны дугаар эсвэл и-мэйл хаягаа оруулна уу</p>
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">Нууц үг</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <Button type="submit" className="w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide">
            Бүртгүүлэх
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Хаяг байгаа юу?{" "}
          <button onClick={() => setView("login")} className="font-semibold text-navy hover:underline">Нэвтрэх</button>
        </p>

      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-6 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
          <User className="h-7 w-7 text-navy" />
        </div>
        <h3 className="text-lg font-semibold text-navy">Нэвтрэх</h3>
        <p className="mt-1 text-sm text-gray-500">Хаягтаа нэвтэрнэ үү</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label className="text-xs font-medium text-gray-700">Утас эсвэл И-мэйл</Label>
          <Input value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} required placeholder="Жишээ: 99001122 эсвэл info@mail.com" className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
        </div>
        <div>
          <Label className="text-xs font-medium text-gray-700">Нууц үг</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
        </div>
        <Button type="submit" className="w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide">
          Нэвтрэх
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Хаяг байхгүй юу?{" "}
        <button onClick={() => setView("register")} className="font-semibold text-navy hover:underline">Бүртгүүлэх</button>
      </p>
    </div>
  );
}

// ─── Confirm Account view (for unconfirmed guest users) ───
function ConfirmAccountView({ onBack }: { onBack: () => void }) {
  const { user, confirmAccount } = useUser();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой");
      return;
    }
    if (password !== confirmPassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    confirmAccount(password);
    setConfirmed(true);
    toast.success("Хаяг баталгаажлаа!", {
      description: "Та одоо бүрэн хэрэглэгч боллоо",
    });
  };

  if (confirmed) {
    return (
      <div className="flex flex-1 flex-col">
        <SubViewHeader title="Хаяг баталгаажуулах" onBack={onBack} />
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-navy">Амжилттай!</h3>
          <p className="mt-2 text-center text-sm text-gray-500">
            Таны хаяг баталгаажлаа. Одоо нэвтрэх, захиалга хянах бүх боломжтой.
          </p>
          <Button
            onClick={onBack}
            className="mt-6 min-h-[48px] rounded-xl bg-navy px-8 text-white hover:bg-navy/90 text-sm font-semibold"
          >
            Профайл руу буцах
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title="Хаяг баталгаажуулах" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Info banner */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-6">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-4.5 w-4.5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Баталгаажаагүй хаяг</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-700">
                Та захиалга өгөхдөө автоматаар бүртгэгдсэн. Нууц үг үүсгэж хаягаа баталгаажуулна уу.
              </p>
            </div>
          </div>
        </div>

        {/* Current info */}
        <div className="rounded-xl bg-gray-50 p-4 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Таны мэдээлэл</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Нэр</span>
              <span className="font-medium text-gray-800">{user?.firstName} {user?.lastName}</span>
            </div>
            {user?.email && (
              <div className="flex justify-between">
                <span className="text-gray-500">И-мэйл</span>
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Утас</span>
              <span className="font-medium text-gray-800">{user?.phone}</span>
            </div>
          </div>
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit}>
          <h4 className="text-sm font-semibold text-navy mb-4">Нууц үг үүсгэх</h4>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-gray-700">Нууц үг</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Хамгийн багадаа 6 тэмдэгт"
                className="mt-1.5 min-h-[44px] rounded-xl border-gray-200"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">Нууц үг давтах</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1.5 min-h-[44px] rounded-xl border-gray-200"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="mt-6 w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide"
          >
            Хаяг баталгаажуулах
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Profile Menu (main view) ───
function ProfileMenu({ onNavigate }: { onNavigate: (section: ProfileSection) => void }) {
  const { user, logout, setIsOpen } = useUser();

  if (!user) return null;

  const menuItems: { icon: typeof Package; label: string; section: ProfileSection }[] = [
    { icon: Package, label: "Миний захиалгууд", section: "orders" },
    { icon: UserCog, label: "Миний мэдээлэл", section: "info" },
    { icon: Settings, label: "Тохиргоо", section: "settings" },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-gray-100 px-6 py-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-navy">
            {user.firstName} {user.lastName}
          </h3>
          {user.status === "unconfirmed" && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              Баталгаажаагүй
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>

      {/* Unconfirmed banner */}
      {user.status === "unconfirmed" && (
        <div className="mx-4 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold text-amber-800">Хаягаа баталгаажуулна уу</p>
          <p className="mt-1 text-xs text-amber-700 leading-relaxed">
            Нууц үг үүсгэж хаягаа бүрэн идэвхжүүлнэ үү.
          </p>
          <button
            onClick={() => onNavigate("confirm")}
            className="mt-2.5 text-xs font-semibold text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            Баталгаажуулах →
          </button>
        </div>
      )}

      <div className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream hover:text-navy"
            >
              <item.icon className="h-[18px] w-[18px] text-gray-400" />
              {item.label}
            </button>
          ))}
        </div>

      </div>

      <div className="border-t border-gray-100 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button
          onClick={() => { logout(); setIsOpen(false); }}
          variant="outline"
          className="w-full min-h-[48px] rounded-xl border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 hover:border-red-200"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Гарах
        </Button>
      </div>
    </div>
  );
}

// ─── Main Drawer ───
export function UserDrawer() {
  const { isLoggedIn, isOpen, setIsOpen, pendingIntent, setPendingIntent } = useUser();
  const [section, setSection] = useState<ProfileSection>("menu");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderReturnTo, setOrderReturnTo] = useState<ProfileSection>("orders");
  const wasLoggedIn = useRef(isLoggedIn);

  // When user logs in while there's a pending intent, auto-close drawer + toast
  useEffect(() => {
    if (!wasLoggedIn.current && isLoggedIn && pendingIntent) {
      toast.success("Амжилттай нэвтэрлээ", {
        description: "Захиалгаа үргэлжлүүлнэ үү",
      });
      setIsOpen(false);
      setPendingIntent(null);
    }
    wasLoggedIn.current = isLoggedIn;
  }, [isLoggedIn, pendingIntent, setIsOpen, setPendingIntent]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSection("menu");
      setSelectedOrder(null);
      if (!isLoggedIn) setPendingIntent(null);
    }
  };

  const goBack = () => {
    if (section === "orderDetail") {
      setSection(orderReturnTo);
      setSelectedOrder(null);
    } else {
      setSection("menu");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-[400px]" showCloseButton={false}>
        {/* Header - only show on menu/auth views */}
        {(section === "menu" || !isLoggedIn) && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <SheetTitle className="flex items-center gap-2.5 text-base font-semibold text-navy">
              <User className="h-5 w-5" />
              {isLoggedIn ? "Миний профайл" : "Хаяг"}
            </SheetTitle>
            <SheetPrimitive.Close className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          </div>
        )}

        {!isLoggedIn ? (
          <AuthForm />
        ) : section === "menu" ? (
          <ProfileMenu onNavigate={setSection} />
        ) : section === "orders" ? (
          <OrdersView onBack={goBack} onSelectOrder={(order) => { setSelectedOrder(order); setOrderReturnTo("orders"); setSection("orderDetail"); }} />
        ) : section === "info" ? (
          <InfoView onBack={goBack} />
        ) : section === "orderDetail" && selectedOrder ? (
          <OrderDetailView order={selectedOrder} onBack={goBack} />
        ) : section === "settings" ? (
          <SettingsView onBack={goBack} />
        ) : section === "confirm" ? (
          <ConfirmAccountView onBack={goBack} />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
