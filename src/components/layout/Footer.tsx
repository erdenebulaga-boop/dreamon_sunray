"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail, MapPin, Facebook } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-navy overflow-hidden">
      {/* Decorative */}
      <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-gold/3 blur-3xl" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-12 md:pt-20">
        {/* Top: Logo + Newsletter hint */}
        <div className="mb-12 flex flex-col items-start gap-6 border-b border-white/8 pb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/logo-white.png"
              alt="Sunray Studio"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
              {t("footer.description")}
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/sunraybeautysalon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-gold/40 hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/sn_eyebrowtattoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-gold/40 hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="tel:+97698509999"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-gold/40 hover:text-gold"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-200">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: t("nav.allProducts") },
                { href: "/shop?category=skincare", label: t("nav.skincare") },
                { href: "/shop?category=devices", label: t("nav.devices") },
                { href: "/about", label: t("nav.about") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-200">
              {t("footer.customerService")}
            </h3>
            <ul className="space-y-3">
              {[
                t("footer.shippingPolicy"),
                t("footer.returnPolicy"),
                t("footer.faq"),
              ].map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-sm text-gray-300 transition-colors duration-200 hover:text-gold"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-200">
              {t("footer.contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold/70" />
                <span className="text-sm text-gray-300">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold/70" />
                <span className="text-sm text-gray-300">+976 9850 9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold/70" />
                <span className="text-sm text-gray-300">
                  info@sunraystudio.mn
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/6 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Sunray Studio.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
