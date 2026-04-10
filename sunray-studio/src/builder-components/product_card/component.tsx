"use client";

interface productCardProps {
  name?: string;
  brand?: string;
  image?: string;
  price?: string;
  originalPrice?: string;
  badge?: "none" | "bestseller" | "new" | "sale";
  badgeText?: string;
  link?: string;
  showCartButton?: "show" | "hide";
}

export default function productCard({
  name,
  brand,
  image,
  price,
  originalPrice,
  badge = "none",
  badgeText,
  link,
  showCartButton = "show",
}: productCardProps) {
  const badgeConfig: Record<string, { label: string; bg: string }> = {
    bestseller: { label: "Bestseller", bg: "bg-[#C4973B] text-white" },
    new: { label: "New", bg: "bg-[#0B1D3A] text-white" },
    sale: { label: badgeText || "Sale", bg: "bg-red-600 text-white" },
  };

  const hasBadge = badge && badge !== "none";
  const hasDiscount = !!originalPrice;

  const Wrapper = link ? "a" : "div";
  const wrapperProps = link ? { href: link } : {};

  return (
    <div className="group relative flex flex-col">
      {/* Image */}
      <Wrapper
        {...wrapperProps}
        className="relative aspect-square overflow-hidden rounded-xl bg-[#F5F3F0] block"
      >
        {image ? (
          <img
            src={image}
            alt={name || ""}
            className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0B1D3A]/0 transition-all duration-300 group-hover:bg-[#0B1D3A]/5" />

        {/* Badge */}
        {hasBadge && (
          <div className="absolute left-3 top-3">
            <span
              className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${badgeConfig[badge].bg}`}
            >
              {badgeText || badgeConfig[badge].label}
            </span>
          </div>
        )}

        {/* Cart button */}
        {showCartButton === "show" && (
          <button
            type="button"
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 hover:bg-[#0B1D3A] hover:text-white active:bg-[#0B1D3A] active:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
        )}
      </Wrapper>

      {/* Product info */}
      <div className="mt-4 flex flex-col gap-1.5">
        {brand && (
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            {brand}
          </p>
        )}
        {name && (
          link ? (
            <a href={link}>
              <h3 className="text-base font-medium leading-snug text-[#e9eeff] line-clamp-2 transition-colors duration-200 group-hover:text-[#0B1D3A]">
                {name}
              </h3>
            </a>
          ) : (
            <h3 className="text-base font-medium leading-snug text-[#e9eeff] line-clamp-2">
              {name}
            </h3>
          )
        )}
        {price && (
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className={`text-base font-bold ${hasDiscount ? "text-red-600" : "text-[#0B1D3A]"}`}>
              {price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {originalPrice}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
