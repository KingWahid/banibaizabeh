"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  ExternalLink,
} from "lucide-react"
import { FaTiktok, FaShoppingCart} from "react-icons/fa"

interface QuickLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
   icon: React.ElementType;
  href: string;
  color: string;
}

const Footer: React.FC = () => {
  const boxesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate background boxes
    if (boxesRef.current) {
      const boxes = boxesRef.current.querySelectorAll(".animated-box")
      boxes.forEach((box) => {
        gsap.to(box, {
          x: gsap.utils.random(-12, 12),
          y: gsap.utils.random(-12, 12),
          rotation: gsap.utils.random(-6, 6),
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 4),
        })
      })

      // Add floating animations for static boxes
      const staticBoxes = boxesRef.current.querySelectorAll(".static-box")
      staticBoxes.forEach((box) => {
        gsap.to(box, {
          y: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        })
      })

      // Add pulse animations for accent boxes
      const accentBoxes = boxesRef.current.querySelectorAll(".accent-box")
      accentBoxes.forEach((box) => {
        gsap.to(box, {
          scale: gsap.utils.random(0.9, 1.1),
          opacity: gsap.utils.random(0.3, 0.6),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 3),
        })
      })

      // Add rotation animations for geometric elements
      const geometricBoxes = boxesRef.current.querySelectorAll(".geometric-box")
      geometricBoxes.forEach((box) => {
        gsap.to(box, {
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(8, 12),
          repeat: -1,
          ease: "none",
          delay: gsap.utils.random(0, 4),
        })
      })
    }
  }, [])

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear: number = new Date().getFullYear()

  const quickLinks: QuickLink[] = [
    { name: "Beranda", href: "#home" },
    { name: "Tentang", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "FAQ", href: "#faq" },
  ]

  const socialLinks: SocialLink[] = [
    { name: "Shoope", icon: FaShoppingCart, href: "https://id.shp.ee/YnfaZXp", color: "hover:text-blue-400" },
    { name: "Tiktok", icon: FaTiktok, href: "#", color: "https://www.tiktok.com/@produk8483_h?_t=ZS-8wNLoMYY6JG&_r=1" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/produk8483_h?igsh=MTduNTdtMTFuaWFueg==", color: "hover:text-pink-400" },
  ]

  return (
    <footer className="relative bg-white/10 dark:bg-black/20 backdrop-blur-xl border-t border-white/20 overflow-hidden">
      {/* Enhanced Background with Box Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Secondary Grid Pattern - Larger */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.15) 2px, transparent 2px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.15) 2px, transparent 2px)
            `,
            backgroundSize: "90px 90px",
            backgroundPosition: "10px 10px",
          }}
        ></div>

        {/* Diagonal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "45px 45px",
          }}
        ></div>

        {/* Animated Box Background */}
        <div ref={boxesRef} className="absolute inset-0">
          {/* Large Animated Border Boxes */}
          <div className="animated-box absolute top-[10%] left-[5%] w-18 h-18 border-2 border-amber-500/30 rounded-lg opacity-40"></div>
          <div className="animated-box absolute top-[20%] left-[80%] w-24 h-24 border-2 border-orange-500/25 rounded-lg opacity-35"></div>
          <div className="animated-box absolute top-[40%] left-[15%] w-20 h-20 border-2 border-amber-500/30 rounded-lg opacity-40"></div>
          <div className="animated-box absolute top-[60%] left-[75%] w-26 h-26 border-2 border-orange-500/25 rounded-lg opacity-30"></div>
          <div className="animated-box absolute top-[80%] left-[20%] w-22 h-22 border-2 border-amber-500/30 rounded-lg opacity-35"></div>

          {/* Medium Solid Boxes */}
          <div className="static-box absolute top-[15%] left-[30%] w-10 h-10 bg-amber-500/10 rounded-md"></div>
          <div className="static-box absolute top-[35%] left-[60%] w-14 h-14 bg-orange-500/8 rounded-md"></div>
          <div className="static-box absolute top-[55%] left-[35%] w-12 h-12 bg-amber-500/10 rounded-md"></div>
          <div className="static-box absolute top-[75%] left-[65%] w-16 h-16 bg-orange-500/8 rounded-md"></div>

          {/* Small Accent Boxes */}
          <div className="accent-box absolute top-[25%] left-[45%] w-6 h-6 bg-amber-500/12 rounded-sm"></div>
          <div className="accent-box absolute top-[45%] left-[70%] w-8 h-8 bg-orange-500/10 rounded-sm"></div>
          <div className="accent-box absolute top-[65%] left-[50%] w-7 h-7 bg-amber-500/12 rounded-sm"></div>
          <div className="accent-box absolute top-[85%] left-[55%] w-9 h-9 bg-orange-500/10 rounded-sm"></div>

          {/* Patterned Boxes */}
          <div
            className="absolute top-[12%] left-[55%] w-20 h-20 rounded-lg opacity-25"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.12) 2px, transparent 2px, transparent 6px)",
            }}
          ></div>
          <div
            className="absolute top-[50%] left-[25%] w-18 h-18 rounded-lg opacity-20"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.1) 2px, transparent 2px, transparent 6px)",
            }}
          ></div>
          <div
            className="absolute top-[70%] left-[80%] w-24 h-24 rounded-lg opacity-25"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.08) 2px, transparent 2px, transparent 6px)",
            }}
          ></div>

          {/* Dotted Pattern Boxes */}
          <div
            className="absolute top-[30%] left-[10%] w-14 h-14 rounded-lg opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          ></div>
          <div
            className="absolute top-[60%] left-[85%] w-16 h-16 rounded-lg opacity-25"
            style={{
              backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          ></div>

          {/* Cross Pattern Boxes */}
          <div
            className="absolute top-[18%] left-[70%] w-12 h-12 rounded-md opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "4px 4px",
            }}
          ></div>
          <div
            className="absolute top-[78%] left-[40%] w-14 h-14 rounded-md opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "5px 5px",
            }}
          ></div>
        </div>

        {/* Box Clusters for Corners */}
        <div className="absolute top-8 right-8 opacity-30">
          <div className="relative">
            <div className="absolute top-0 left-0 w-5 h-5 border border-amber-500/40 rounded-sm"></div>
            <div className="absolute top-2 left-2 w-5 h-5 border border-amber-500/40 rounded-sm"></div>
            <div className="absolute top-4 left-4 w-5 h-5 border border-amber-500/40 rounded-sm"></div>
            <div className="absolute top-6 left-6 w-5 h-5 border border-amber-500/40 rounded-sm"></div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 opacity-30">
          <div className="relative">
            <div className="absolute top-0 left-0 w-6 h-6 border border-orange-500/40 rounded-sm"></div>
            <div className="absolute top-3 left-3 w-6 h-6 border border-orange-500/40 rounded-sm"></div>
            <div className="absolute top-6 left-6 w-6 h-6 border border-orange-500/40 rounded-sm"></div>
          </div>
        </div>

        {/* Floating Box Groups */}
        <div className="absolute top-1/4 left-1/3 opacity-20">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-amber-500/25 rounded-xs"></div>
            <div className="w-3 h-3 bg-amber-500/20 rounded-xs"></div>
            <div className="w-3 h-3 bg-amber-500/30 rounded-xs"></div>
            <div className="w-3 h-3 bg-amber-500/15 rounded-xs"></div>
          </div>
        </div>

        <div className="absolute top-3/4 right-1/3 opacity-20">
          <div className="grid grid-cols-3 gap-1">
            <div className="w-4 h-4 bg-orange-500/25 rounded-xs"></div>
            <div className="w-4 h-4 bg-orange-500/20 rounded-xs"></div>
            <div className="w-4 h-4 bg-orange-500/30 rounded-xs"></div>
            <div className="w-4 h-4 bg-orange-500/15 rounded-xs"></div>
            <div className="w-4 h-4 bg-orange-500/25 rounded-xs"></div>
            <div className="w-4 h-4 bg-orange-500/20 rounded-xs"></div>
          </div>
        </div>

        {/* Geometric Accent Elements */}
        <div className="absolute top-[40%] left-[90%] opacity-25">
          <div className="geometric-box w-8 h-8 border-2 border-amber-500/30 rotate-45 rounded-sm"></div>
        </div>
        <div className="absolute top-[70%] left-[5%] opacity-25">
          <div className="geometric-box w-10 h-10 border-2 border-orange-500/30 rotate-12 rounded-sm"></div>
        </div>

        {/* Additional Floating Elements */}
        <div className="absolute top-[8%] left-[40%] opacity-20">
          <div
            className="w-4 h-4 bg-amber-500/15 rounded-full animate-bounce"
            style={{ animationDuration: "3s", animationDelay: "0.5s" }}
          ></div>
        </div>
        <div className="absolute top-[28%] left-[85%] opacity-20">
          <div
            className="w-5 h-5 bg-orange-500/15 rounded-full animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>
        </div>
        <div className="absolute top-[48%] left-[8%] opacity-20">
          <div
            className="w-3 h-3 bg-amber-500/20 rounded-full animate-bounce"
            style={{ animationDuration: "2.5s", animationDelay: "1.5s" }}
          ></div>
        </div>
        <div className="absolute top-[68%] left-[90%] opacity-20">
          <div
            className="w-6 h-6 bg-orange-500/15 rounded-full animate-bounce"
            style={{ animationDuration: "3.5s", animationDelay: "0.8s" }}
          ></div>
        </div>

        {/* Pulsing Border Elements */}
        <div className="absolute top-[22%] left-[25%] opacity-30">
          <div
            className="w-12 h-12 border border-amber-500/25 rounded-lg animate-pulse"
            style={{ animationDuration: "2s" }}
          ></div>
        </div>
        <div className="absolute top-[58%] left-[78%] opacity-30">
          <div
            className="w-14 h-14 border border-orange-500/25 rounded-lg animate-pulse"
            style={{ animationDuration: "2.5s", animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-amber-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-orange-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                 Banibaizabeh
                </span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Menciptakan cemilan yang inovatif dengan kualitas tinggi untuk menemani setiap momen dan selera Anda.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="text-sm">cemilantssama@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="text-sm">+62 881 0232 61660</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-sm">Ciapus Banjaran, Indonesia</span>
              </div>
            </div>
          </div>

          

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">Menu</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300"
                  >
                    <span className="text-sm">{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`group p-3 bg-white/10 dark:bg-white/5 border border-white/20 rounded-xl text-neutral-600 dark:text-neutral-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <span>© {currentYear} Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by YourName. All rights reserved.</span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  )
}

export default Footer