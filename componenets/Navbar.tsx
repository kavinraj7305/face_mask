"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/componenets/CartProvider";

const navItems = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#aboutUs", id: "aboutUs" },
  { label: "Products", href: "/#products", id: "products" },
  { label: "Ritual Finder", href: "/ritual-finder", id: "ritual-finder" },
  { label: "Reviews", href: "/#reviews", id: "reviews" },
  { label: "FAQ", href: "/#faq", id: "faq" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { count } = useCart();

  const handleNav = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number]
  ) => {
    if (pathname === "/" && item.href.startsWith("/#")) {
      event.preventDefault();
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", item.href);
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm text-[#3A4F41] sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-2.5 max-w-7xl mx-auto gap-4">
        <Link href="/#home" className="flex items-center shrink-0">
          <Image
            src="/logo.jpeg"
            alt="Bavapriya Facials"
            width={220}
            height={88}
            priority
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </Link>
        <div
          className={`md:flex gap-6 items-center transition-transform duration-300 ease-in-out ${
            isOpen
              ? "fixed top-[4.75rem] right-0 w-56 h-screen bg-[#F4F1EA] flex flex-col pt-10 z-40 px-6 gap-5"
              : "hidden"
          } md:static md:h-auto md:w-auto md:bg-transparent md:pt-0 md:px-0`}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNav(e, item)}
              className={`relative font-medium transition-colors text-sm ${
                pathname === item.href
                  ? "text-[#8BA888]"
                  : "text-[#3A4F41] hover:text-[#8BA888]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {session?.user && (
            <Link href="/orders" className="text-sm font-medium hover:text-[#8BA888]">
              My orders
            </Link>
          )}
          {session?.user?.isAdmin && (
            <Link href="/admin" className="text-sm font-medium hover:text-[#8BA888]">
              Admin
            </Link>
          )}
          {status === "authenticated" ? (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="md:hidden text-sm font-medium text-left"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login?callbackUrl=/checkout"
              onClick={() => setIsOpen(false)}
              className="md:hidden text-sm font-medium"
            >
              Sign in
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/cart" className="relative p-2" aria-label="Cart">
            <ShoppingCartIcon className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-[#3A4F41] text-white text-xs flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          {status === "authenticated" ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="hidden sm:inline text-sm font-medium hover:text-[#8BA888]"
            >
              Sign out
            </button>
          ) : (
            <Link href="/login?callbackUrl=/checkout" className="hidden sm:inline text-sm font-medium">
              Sign in
            </Link>
          )}
          <button
            type="button"
            className="md:hidden flex flex-col justify-between w-7 h-6 cursor-pointer"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 bg-[#3A4F41] rounded transition-transform duration-300 ${
                isOpen ? "translate-y-2.5 rotate-[-45deg]" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-[#3A4F41] rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-[#3A4F41] rounded transition-transform duration-300 ${
                isOpen ? "-translate-y-2.5 rotate-[45deg]" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
