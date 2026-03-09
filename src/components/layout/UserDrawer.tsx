"use client";

import { useState } from "react";
import Image from "next/image";
import { User, LogOut, Package, ClipboardList, Settings, Trash2, UserCog, X, ArrowLeft, Check, AlertTriangle, MapPin, Truck, CreditCard, ChevronRight } from "lucide-react";
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
import { useI18n } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

type AuthView = "login" | "register";
type ProfileSection = "menu" | "orders" | "info" | "history" | "orderDetail" | "settings";

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
function OrderStatusBadge({ status, locale }: { status: Order["status"]; locale: string }) {
  const config = {
    pending: { mn: "Хүлээгдэж буй", en: "Pending", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    processing: { mn: "Бэлтгэж буй", en: "Processing", className: "bg-blue-50 text-blue-700 border-blue-200" },
    delivered: { mn: "Хүргэгдсэн", en: "Delivered", className: "bg-green-50 text-green-700 border-green-200" },
    cancelled: { mn: "Цуцлагдсан", en: "Cancelled", className: "bg-red-50 text-red-700 border-red-200" },
  };
  const c = config[status];
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${c.className}`}>
      {locale === "mn" ? c.mn : c.en}
    </span>
  );
}

// ─── My Orders view ───
function OrdersView({ onBack }: { onBack: () => void }) {
  const { orders } = useUser();
  const { t, locale } = useI18n();

  const activeOrders = orders.filter((o) => o.status === "pending" || o.status === "processing");

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title={t("user.orders")} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {activeOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package className="mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">
              {locale === "mn" ? "Идэвхитэй захиалга байхгүй" : "No active orders"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div key={order.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">{order.id}</span>
                  <OrderStatusBadge status={order.status} locale={locale} />
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span className="font-medium text-navy">{formatPrice(order.total)}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {order.items} {locale === "mn" ? "бүтээгдэхүүн" : "item(s)"}
                </p>
              </div>
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
  const { t } = useI18n();
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
      <SubViewHeader title={t("user.myInfo")} onBack={onBack} />
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-gray-700">{t("user.firstName")}</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">{t("user.lastName")}</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.email")}</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.phone")}</Label>
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
              {t("user.saved")}
            </span>
          ) : (
            t("user.save")
          )}
        </Button>
      </form>
    </div>
  );
}

// ─── Order History view ───
function HistoryView({ onBack, onSelectOrder }: { onBack: () => void; onSelectOrder: (order: Order) => void }) {
  const { orders } = useUser();
  const { t, locale } = useI18n();

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title={t("user.orderHistory")} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <ClipboardList className="mb-3 h-10 w-10 text-gray-200" />
            <p className="text-sm font-medium text-gray-500">
              {locale === "mn" ? "Захиалгын түүх хоосон" : "No order history"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="w-full rounded-xl border border-gray-100 p-4 text-left transition-colors hover:border-gray-200 hover:bg-gray-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">{order.id}</span>
                  <div className="flex items-center gap-2">
                    <OrderStatusBadge status={order.status} locale={locale} />
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span className="font-medium text-navy">{formatPrice(order.total)}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {order.items} {locale === "mn" ? "бүтээгдэхүүн" : "item(s)"}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Order Detail view ───
function OrderDetailView({ order, onBack }: { order: Order; onBack: () => void }) {
  const { locale } = useI18n();

  const subtotal = order.lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryLabel = order.deliveryMethod === "fast"
    ? (locale === "mn" ? "Шуурхай хүргэлт" : "Fast Delivery")
    : (locale === "mn" ? "Энгийн хүргэлт" : "Normal Delivery");

  const paymentLabel: Record<string, string> = {
    QPay: "QPay",
    Card: locale === "mn" ? "Карт" : "Card",
    Loan: locale === "mn" ? "Зээл / Хуваалт" : "Loan / Installment",
  };

  return (
    <div className="flex flex-1 flex-col">
      <SubViewHeader title={order.id} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">
        {/* Status & date */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <p className="text-xs text-gray-400">{order.date}</p>
          </div>
          <OrderStatusBadge status={order.status} locale={locale} />
        </div>

        {/* Items */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {locale === "mn" ? "Бүтээгдэхүүн" : "Items"}
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

        {/* Delivery info */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {locale === "mn" ? "Хүргэлт" : "Delivery"}
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{order.district}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
              <Truck className="h-4 w-4 text-gray-400" />
              <span>{deliveryLabel}</span>
            </div>
          </div>
        </div>

        {/* Payment info */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {locale === "mn" ? "Төлбөр" : "Payment"}
          </h4>
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <CreditCard className="h-4 w-4 text-gray-400" />
            <span>{paymentLabel[order.paymentMethod] || order.paymentMethod}</span>
          </div>
        </div>

        {/* Totals */}
        <div className="px-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{locale === "mn" ? "Дүн" : "Subtotal"}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{locale === "mn" ? "Хүргэлт" : "Delivery"}</span>
              <span>{order.deliveryCost === 0 ? (locale === "mn" ? "Үнэгүй" : "Free") : formatPrice(order.deliveryCost)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-sm font-semibold text-navy">{locale === "mn" ? "Нийт" : "Total"}</span>
              <span className="text-base font-bold text-navy">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings view (change password + delete account) ───
function SettingsView({ onBack }: { onBack: () => void }) {
  const { changePassword, deleteAccount, setIsOpen } = useUser();
  const { t, locale } = useI18n();
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
      setError(t("user.passwordTooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("user.passwordMismatch"));
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
      <SubViewHeader title={t("user.settings")} onBack={onBack} />
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
        <h4 className="mb-4 text-sm font-semibold text-navy">{t("user.changePassword")}</h4>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.currentPassword")}</Label>
            <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.newPassword")}</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.confirmPassword")}</Label>
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
              {t("user.saved")}
            </span>
          ) : (
            t("user.changePassword")
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
              {t("user.deleteAccount")}
            </button>
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-semibold text-red-700">
                  {locale === "mn" ? "Та итгэлтэй байна уу?" : "Are you sure?"}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-red-600/80 mb-3">
                {locale === "mn"
                  ? "Таны бүх мэдээлэл, захиалгын түүх бүрмөсөн устах болно."
                  : "All your data and order history will be permanently deleted."}
              </p>
              <label className="flex items-start gap-2.5 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={deleteConfirmed}
                  onChange={(e) => setDeleteConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-red-500"
                />
                <span className="text-xs text-red-700">
                  {locale === "mn"
                    ? "Хаяг устгахыг зөвшөөрч байна"
                    : "I confirm account deletion"}
                </span>
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => { setShowDelete(false); setDeleteConfirmed(false); }}
                  variant="outline"
                  className="flex-1 min-h-[40px] rounded-lg border-red-200 text-xs font-medium text-red-600"
                >
                  {locale === "mn" ? "Буцах" : "Cancel"}
                </Button>
                <Button
                  type="button"
                  onClick={() => { deleteAccount(); setIsOpen(false); }}
                  disabled={!deleteConfirmed}
                  className="flex-1 min-h-[40px] rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t("user.deleteAccount")}
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
  const { t } = useI18n();
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({ firstName, lastName, email, phone, facebook: "" }, password);
  };

  if (view === "register") {
    return (
      <div className="flex flex-1 flex-col px-6 py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
            <User className="h-7 w-7 text-navy" />
          </div>
          <h3 className="text-lg font-semibold text-navy">{t("user.register")}</h3>
          <p className="mt-1 text-sm text-gray-500">{t("user.registerDesc")}</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium text-gray-700">{t("user.firstName")}</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-700">{t("user.lastName")}</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.email")}</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.phone")}</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-700">{t("user.password")}</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
          </div>
          <Button type="submit" className="w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide">
            {t("user.register")}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          {t("user.hasAccount")}{" "}
          <button onClick={() => setView("login")} className="font-semibold text-navy hover:underline">{t("user.login")}</button>
        </p>

        {/* Social login */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">{t("user.orContinueWith")}</span>
            <div className="h-[1px] flex-1 bg-gray-200" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => login("facebook@user.com", "")}
              className="flex flex-1 min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2"/></svg>
              Facebook
            </button>
            <button
              onClick={() => login("google@user.com", "")}
              className="flex flex-1 min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Gmail
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-6 py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
          <User className="h-7 w-7 text-navy" />
        </div>
        <h3 className="text-lg font-semibold text-navy">{t("user.login")}</h3>
        <p className="mt-1 text-sm text-gray-500">{t("user.loginDesc")}</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label className="text-xs font-medium text-gray-700">{t("user.email")}</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
        </div>
        <div>
          <Label className="text-xs font-medium text-gray-700">{t("user.password")}</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5 min-h-[44px] rounded-xl border-gray-200" />
        </div>
        <Button type="submit" className="w-full min-h-[48px] rounded-xl bg-navy text-white hover:bg-navy/90 text-sm font-semibold tracking-wide">
          {t("user.login")}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        {t("user.noAccount")}{" "}
        <button onClick={() => setView("register")} className="font-semibold text-navy hover:underline">{t("user.register")}</button>
      </p>

      {/* Social login */}
      <div className="mt-auto pt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">{t("user.orContinueWith")}</span>
          <div className="h-[1px] flex-1 bg-gray-200" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => login("facebook@user.com", "")}
            className="flex flex-1 min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2"/></svg>
            Facebook
          </button>
          <button
            onClick={() => login("google@user.com", "")}
            className="flex flex-1 min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Gmail
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Menu (main view) ───
function ProfileMenu({ onNavigate }: { onNavigate: (section: ProfileSection) => void }) {
  const { user, logout, setIsOpen } = useUser();
  const { t } = useI18n();

  if (!user) return null;

  const menuItems: { icon: typeof Package; label: string; section: ProfileSection }[] = [
    { icon: Package, label: t("user.orders"), section: "orders" },
    { icon: UserCog, label: t("user.myInfo"), section: "info" },
    { icon: ClipboardList, label: t("user.orderHistory"), section: "history" },
    { icon: Settings, label: t("user.settings"), section: "settings" },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-gray-100 px-6 py-6">
        <h3 className="text-lg font-semibold text-navy">
          {user.firstName} {user.lastName}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>

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
          {t("user.logout")}
        </Button>
      </div>
    </div>
  );
}

// ─── Main Drawer ───
export function UserDrawer() {
  const { isLoggedIn, isOpen, setIsOpen } = useUser();
  const { t } = useI18n();
  const [section, setSection] = useState<ProfileSection>("menu");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSection("menu");
      setSelectedOrder(null);
    }
  };

  const goBack = () => {
    if (section === "orderDetail") {
      setSection("history");
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
              {isLoggedIn ? t("user.profile") : t("user.account")}
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
          <OrdersView onBack={goBack} />
        ) : section === "info" ? (
          <InfoView onBack={goBack} />
        ) : section === "history" ? (
          <HistoryView onBack={goBack} onSelectOrder={(order) => { setSelectedOrder(order); setSection("orderDetail"); }} />
        ) : section === "orderDetail" && selectedOrder ? (
          <OrderDetailView order={selectedOrder} onBack={goBack} />
        ) : section === "settings" ? (
          <SettingsView onBack={goBack} />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
