"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface untuk item testimoni
interface TestimonialItem {
  id: number;
  name: string;
  quote: string;
  rating: number;
  product: string;
}

// Interface untuk props TestimonialCard
interface TestimonialCardProps {
  testimonial: TestimonialItem;
  index: number;
}

const Testimonials = () => {
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

  const TestimonialItems: TestimonialItem[] = [
    {
      id: 1,
      name: "Idan W.",
      quote: "Gurilem pedas sedang bener-bener pas di lidah! Renyah banget dan bumbunya nendang, cocok buat ngemil sambil nonton.",
      rating: 5,
      product: "Gurilem",
    },
    {
      id: 2,
      name: "Budi S.",
      quote: "Seblak level 7 ini juara! Pedasnya mantap, tapi masih bisa dinikmati. Teksturnya renyah dan bikin ketagihan!",
      rating: 4,
      product: "Seblak",
    },
    {
      id: 3,
      name: "Rina W.",
      quote: "Pangsit original rasanya gurih dan renyah cikruh, pas banget buat temen ngopi. Kemasan 250g awet buat stok di rumah!",
      rating: 5,
      product: "Pangsit",
    },
    {
      id: 4,
      name: "Andi P.",
      quote: "Lumpianya endul banget! Bumbu rempahnya medok, worth it sih dengan kualitas yang kayak gini.",
      rating: 5,
      product: "Lumpia",
    },
    {
      id: 5,
      name: "Dewi L.",
      quote: "Seblak level 10 uji nyali banget! Pedasnya lekoh, tapi enak dan bikin pengen coba lagi. Keren!",
      rating: 4,
      product: "Seblak",
    },
    {
      id: 6,
      name: "Wahidan N.",
      quote: "Gila sih, Pedesnya nampol! gurihnya bikin nagih. Baru buka satu, eh tau-tau abis sendiri 😭🔥 Wajib banget dicoba",
      rating: 5,
      product: "Blaktek",
    },
  ];

  const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
    return (
      <div className="group">
        <div className="relative bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20">
          {/* Quote Icon */}
          <Quote className="absolute top-4 left-4 w-8 h-8 text-amber-500/50" />

          {/* Testimonial Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{testimonial.product}</p>
                </div>
              </div>
              {/* Rating Stars */}
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={`filled-${i}`} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-neutral-400" />
              ))}

              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{testimonial.quote}</p>
          </div>

          {/* Decorative Number */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-24 lg:py-32 relative overflow-hidden">
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
          className="absolute inset-0 opacity-[0.朱2] dark:opacity-[0.03]"
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
            <Quote className="w-4 h-4 mr-2" />
            Apa Kata Pelanggan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Testimoni{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">Pelanggan</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Dengar langsung dari pelanggan kami tentang pengalaman mereka menikmati camilan favorit kami.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div ref={gridRef} className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TestimonialItems.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;