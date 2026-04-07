"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail, MapPin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gray-50 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-12 md:pt-20">
        {/* Top: Logo + Social */}
        <div className="mb-12 flex flex-col items-start gap-6 border-b border-gray-200 pb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/logo-gold.png"
              alt="Sunray Studio"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              Салоны зэргийн гоо сайхны бүтээгдэхүүн. Sunray Studio мэргэжилтнүүдийн сонголт.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/sunraybeautysalon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/sn_eyebrowtattoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="tel:+97698509999"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">
              Түргэн холбоос
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "Бүх бүтээгдэхүүн" },
                { href: "/shop?category=skincare", label: "Арьс арчилгаа" },
                { href: "/shop?category=devices", label: "Төхөөрөмж" },
                { href: "/about", label: "Бидний тухай" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">
              Хэрэглэгчийн үйлчилгээ
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Үйлчилгээний нөхцөл", href: "/legal" },
                { label: "Нууцлалын бодлого", href: "/legal" },
                { label: "Буцаалтын бодлого", href: "/legal" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 transition-colors duration-200 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-900">
              Холбоо барих
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                <a
                  href="https://maps.app.goo.gl/aFizyzm3whCvCRgh8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors duration-200 hover:text-gold"
                >
                  Улаанбаатар хот, Чингэлтэй дүүрэг, 4 хороо, Тэди төвийн хажууд Хишиг төв 4-р давхарт
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold" />
                <span className="text-sm text-gray-500">+976 9850 9999, 9840 9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold" />
                <span className="text-sm text-gray-500">
                  info@sunraystudio.mn
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Sunray Studio.{" "}
            Бүх эрх хуульд хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
}
