'use client'
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


// Interface untuk item menu
interface MenuItem {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("#home");



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems: MenuItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "about" },
    { name: "Produk", href: "produk" },
    { name: "Testimoni", href: "testimonial" },
    { name: "FAQ", href: "faq" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-2xl"
          : "bg-gradient-to-b from-black/10 to-transparent"
      }`}
    >

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              {/* Main logo container */}
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:shadow-2xl group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Image
                  src="/logo.jpeg"
                  alt="Keto Bar 1"
                  width={60}
                  height={60}
                  className="rounded-2xl"
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-lg shadow-purple-500/40">
                <div className="w-full h-full rounded-full animate-ping bg-purple-400/60"></div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-md shadow-emerald-500/40 animate-bounce"></div>
  
            </div>

            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 group-hover:scale-105 transform transition-transform duration-300">
                BaniBaizabeh
              </h1>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium tracking-wide">
                Cemilan
              </p>
            </div>
            </div>

          {/* Desktop Menu */}
          <div className="ml-auto hidden lg:flex space-x-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
              >
                <Link
                  href={item.href}
                  onClick={() => setActiveMenu(item.href)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    item.href === activeMenu
                      ? "text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-amber-500 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center space-x-4 lg:hidden">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 text-neutral-700 dark:text-white hover:bg-white/20 rounded-2xl transition-all duration-300 hover:scale-110"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="bg-white/30 backdrop-blur-2xl border-b border-white/30 shadow-2xl">
          <div className="flex flex-col p-6 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => {
                  setActiveMenu(item.href); // Set active
                  setIsOpen(false);         // Tutup menu
                }}
                className={`flex items-center justify-between p-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] ${
                  item.href === activeMenu
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                    : "text-neutral-700 dark:text-neutral-200 hover:bg-white/20 hover:text-amber-500"
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;