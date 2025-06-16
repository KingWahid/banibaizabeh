"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, LucideIcon, Flame, Drumstick, Leaf, Sandwich, Soup } from "lucide-react";
import { FaTiktok, FaInstagram, FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import Image from "next/image";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface untuk item portofolio
interface ProductItem {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  icon: LucideIcon;
  tiktok: string;
  shoope: string;
  sales: string;
  variants: string[]; // contoh: ["Original", "Pedes Sedang", "Pedes Bingit"]
  size: string;       // contoh: "250g"
}

// Interface untuk props ProjectCard
interface ProjectCardProps {
  project: ProductItem;
  index: number;
  isReversed: boolean;
}

const Product = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          y: 50,
          opacity: 0,
        });
      }

      if (gridRef.current?.children) {
        gsap.set(gridRef.current.children, {
          y: 60,
          opacity: 0,
        });
      }

      // Animate background boxes
      if (boxesRef.current) {
        const boxes = boxesRef.current.querySelectorAll(".animated-box") as NodeListOf<HTMLElement>;
        boxes.forEach((box) => {
          gsap.to(box, {
            x: gsap.utils.random(-20, 20),
            y: gsap.utils.random(-20, 20),
            rotation: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: gsap.utils.random(0, 2),
          });
        });
      }

      // Create timeline with ScrollTrigger
      if (sectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        if (titleRef.current) {
          tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (gridRef.current?.children) {
          tl.to(
            gridRef.current.children,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.15,
            },
            "-=0.4"
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ProductItems: ProductItem[] = [
  {
    id: 1,
    title: "Basreng",
    price: "Rp. 7000",
    description:
      "Camilan khas Jawa Barat berbahan dasar bakso ikan atau ayam yang diiris tipis, digoreng kering hingga renyah, lalu dibumbui dengan rempah pedas yang khas.",
    image: "/basreng.jpeg",
    icon: Flame,
    tiktok: "https://www.tiktok.com/@produk8483_h?_t=ZS-8wNLoMYY6JG&_r=1",
    shoope: "https://id.shp.ee/YnfaZXp", // Tambahkan link jika tersedia
    sales: "Best Seller",
    variants: ["Original", "Pedes Sedang", "Pedes Bingit"],
    size: "250g",
  },
  {
    id: 2,
    title: "Gurilem",
    price: "Rp. 7000",
    description:
      "Kerupuk gurih renyah berbahan tepung tapioka yang dibumbui khas. Nama 'Gurilem' adalah singkatan dari 'gurih dan pelem (lembut)', sesuai dengan rasa yang ditawarkan.",
    image: "/gurilem.jpeg",
    icon: Drumstick,
    tiktok: "https://www.tiktok.com/@produk8483_h?_t=ZS-8wNLoMYY6JG&_r=1",
    shoope: "https://id.shp.ee/YnfaZXp", // Tambahkan link jika tersedia
    sales: "Best Seller",
    variants: ["Original", "Pedes Sedang", "Pedes Bingit"],
    size: "250g",
  },
  {
    id: 3,
    title: "Blaktek",
    price: "Rp. 7000",
    description:
      "Kombinasi unik dari seblak pedas dan lotek khas Jawa Barat. Cita rasa pedas dan gurih berpadu dalam hidangan yang kaya bumbu dan sayuran.",
    image: "/blaktek.jpeg",
    icon: Leaf,
    tiktok: "https://www.tiktok.com/@produk8483_h?_t=ZS-8wNLoMYY6JG&_r=1",
    shoope: "https://id.shp.ee/YnfaZXp", // Tambahkan link jika tersedia
    sales: "",
    variants: ["Original", "Pedes Sedang", "Pedes Bingit"],
    size: "250g",
  },
  {
    id: 4,
    title: "Lumpia",
    price: "Rp. 7000",
    description:
      "Camilan goreng dengan kulit lumpia renyah dan isian berbumbu rempah pedas yang menggoda. Cocok dinikmati kapan saja.",
    image: "/lumpiah.jpeg",
    icon: Sandwich,
    tiktok: "https://www.tiktok.com/@produk8483_h?_t=ZS-8wNLoMYY6JG&_r=1",
    shoope: "https://id.shp.ee/YnfaZXp", // Tambahkan link jika tersedia
    sales: "",
    variants: ["Original", "Pedes Sedang", "Pedes Bingit"],
    size: "250g",
  },
  {
    id: 5,
    title: "Seblak level",
    price: "Rp. 7000",
    description:
      "Hidangan favorit Bandung dengan kerupuk bertekstur renyah, disajikan dalam berbagai level bumbu pedas gurih dengan aroma kencur yang kuat.",
    image: "/seblak.jpeg",
    icon: Soup,
    tiktok: "https://www.tiktok.com/@produk8483_h?_t=ZS-8wNLoMYY6JG&_r=1",
    shoope: "https://id.shp.ee/YnfaZXp", // Tambahkan link jika tersedia
    sales: "",
    variants: ["3", "7", "10"],
    size: "250g",
  },
]

  const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isReversed }) => {
    const Icon = project.icon; // Komponen ikon dinamis

    return (
      <div className="group">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? "lg:grid-flow-col-dense" : ""}`}>
          {/* Image Section */}
          <div className={`${isReversed ? "lg:col-start-2" : ""}`}>
            <div className="relative">
              <div className="relative h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-white/10 dark:bg-white/5 border border-white/20 shadow-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={95}
                  priority={index < 2} // Prioritas untuk 2 gambar pertama
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRGABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Project Number */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* sales */}
                <div className="absolute top-4 right-4 bg-black/30 rounded-lg px-3 py-1 text-white text-xs font-medium">
                  {project.sales}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`space-y-3 ${isReversed ? "lg:col-start-1" : ""}`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">{project.title}</h3>
              
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">{project.price}</h4>
              <ul className="flex flex-wrap gap-2 mt-1">
            {project.variants.map((variant: string, index: number) => (
              <li
                key={index}
                className="px-3 py-1 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-md text-sm cursor-pointer 
                          hover:bg-amber-500 hover:text-white hover:border-amber-500 
                          transition-colors transition-border duration-200 ease-in-out"
              >
                {variant}
              </li>
            ))}
          </ul>

            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">  
            Ukuran: <span className="font-semibold">{project.size}</span>
          </p>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.description}</p>

           <div className="flex flex-wrap gap-4">
  {/* Label Checkout */}
  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full shadow-md">
    <FaShoppingCart className="w-4 h-4" />
    <span className="font-semibold text-sm tracking-wide">Order here</span>
  </div>
  {/* TikTok */}
  <a
    href={project.tiktok}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-full shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:scale-110"
  >
    <FaTiktok className="w-5 h-5" />
  </a>

  {/* Shopee */}
  <a
    href={project.shoope}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-110"
  >
    <SiShopee className="w-5 h-5" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/produk8483_h?igsh=MTduNTdtMTFuaWFueg=="
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 hover:scale-110"
  >
    <FaInstagram className="w-5 h-5" />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/+62881023261660"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110"
  >
    <FaWhatsapp className="w-5 h-5" />
  </a>
</div>


          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="product" ref={sectionRef} className="scroll-mt-20 py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced Background with Box Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.15) 1px, transparent 1px)
                `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Secondary Grid Pattern - Offset */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.1) 2px, transparent 2px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.1) 2px, transparent 2px)
                `,
            backgroundSize: "120px 120px",
            backgroundPosition: "20px 20px",
          }}
        ></div>

        {/* Animated Box Background */}
        <div ref={boxesRef} className="absolute inset-0">
          {/* Animated Boxes */}
          <div className="animated-box absolute top-[10%] left-[5%] w-16 h-16 border-2 border-amber-500/20 rounded-lg opacity-30"></div>
          <div className="animated-box absolute top-[20%] left-[80%] w-24 h-24 border-2 border-orange-500/20 rounded-lg opacity-20"></div>
          <div className="animated-box absolute top-[40%] left-[15%] w-20 h-20 border-2 border-amber-500/20 rounded-lg opacity-25"></div>
          <div className="animated-box absolute top-[60%] left-[75%] w-32 h-32 border-2 border-orange-500/20 rounded-lg opacity-20"></div>
          <div className="animated-box absolute top-[80%] left-[10%] w-28 h-28 border-2 border-amber-500/20 rounded-lg opacity-30"></div>

          {/* Solid Boxes */}
          <div className="absolute top-[15%] left-[20%] w-8 h-8 bg-amber-500/5 rounded-md"></div>
          <div className="absolute top-[25%] left-[70%] w-12 h-12 bg-orange-500/5 rounded-md"></div>
          <div className="absolute top-[45%] left-[25%] w-10 h-10 bg-amber-500/5 rounded-md"></div>
          <div className="absolute top-[65%] left-[65%] w-16 h-16 bg-orange-500/5 rounded-md"></div>
          <div className="absolute top-[85%] left-[30%] w-14 h-14 bg-amber-500/5 rounded-md"></div>

          {/* Dotted Boxes */}
          <div
            className="absolute top-[5%] left-[40%] w-20 h-20 rounded-lg opacity-20"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.2) 2px, transparent 2px, transparent 10px)",
              backgroundSize: "10px 10px",
            }}
          ></div>
          <div
            className="absolute top-[30%] left-[60%] w-16 h-16 rounded-lg opacity-15"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.15) 2px, transparent 2px, transparent 10px)",
              backgroundSize: "10px 10px",
            }}
          ></div>
          <div
            className="absolute top-[70%] left-[45%] w-24 h-24 rounded-lg opacity-20"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.1) 2px, transparent 2px, transparent 10px)",
              backgroundSize: "10px 10px",
            }}
          ></div>
        </div>

        {/* Box Clusters */}
        <div className="absolute top-10 right-10 opacity-30">
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 h-8 border border-amber-500/30 rounded-md"></div>
            <div className="absolute top-4 left-4 w-8 h-8 border border-amber-500/30 rounded-md"></div>
            <div className="absolute top-8 left-8 w-8 h-8 border border-amber-500/30 rounded-md"></div>
          </div>
        </div>

        <div className="absolute bottom-20 left-10 opacity-30">
          <div className="relative">
            <div className="absolute top-0 left-0 w-6 h-6 border border-orange-500/30 rounded-md"></div>
            <div className="absolute top-3 left-3 w-6 h-6 border border-orange-500/30 rounded-md"></div>
            <div className="absolute top-6 left-6 w-6 h-6 border border-orange-500/30 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-400/10 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-orange-400/10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-6">
            <Palette className="w-4 h-4 mr-2" />
            Produk Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Produk{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">Terbaik Kami</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
           Jelajahi koleksi camilan favorit yang siap menggoyang lidah di setiap gigitan.
          </p>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="max-w-6xl mx-auto space-y-16 lg:space-y-20">
          {ProductItems.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isReversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;