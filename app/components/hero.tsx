'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Star, Utensils } from "lucide-react";

const Hero = () => {
  const withoutLimitsRef = useRef<HTMLDivElement | null>(null);
  const designRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const ctaButtonsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fungsi untuk membuat partikel
    const createParticles = (): HTMLDivElement[] => {
      const particleContainer = particlesRef.current;
      if (!particleContainer) return [];

      const particles: HTMLDivElement[] = [];

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.cssText = `
          position: absolute;
          width: ${gsap.utils.random(2, 6)}px;
          height: ${gsap.utils.random(2, 6)}px;
          background: linear-gradient(45deg, #f59e0b, #fbbf24, #d97706);
          border-radius: 50%;
          opacity: ${gsap.utils.random(0.3, 0.8)};
          filter: blur(${gsap.utils.random(0, 1)}px);
        `;

        particleContainer.appendChild(particle);
        particles.push(particle);

        gsap.set(particle, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-100, 100),
        });

        gsap.to(particle, {
          x: `+=${gsap.utils.random(-300, 300)}`,
          y: `+=${gsap.utils.random(-200, 200)}`,
          rotation: gsap.utils.random(0, 360),
          duration: gsap.utils.random(10, 20),
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

      return particles;
    };

    // Fungsi untuk membagi teks menjadi karakter
    const splitTextIntoChars = (
      element: HTMLElement,
      preserveClasses = false
    ): HTMLCollectionOf<HTMLSpanElement> => {
      const text = element.textContent || "";
      const originalClasses = element.className;
      element.textContent = "";

      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.cssText = `
          display: inline-block;
          transform-origin: 50% 100%;
          position: relative;
          transform-style: preserve-3d;
        `;
        span.setAttribute("data-char", index.toString());
        if (preserveClasses) {
          span.className = originalClasses;
        }
        element.appendChild(span);
      });

      return element.children as HTMLCollectionOf<HTMLSpanElement>;
    };

    // Fungsi untuk membagi teks menjadi kata
    const splitTextIntoWords = (element: HTMLElement): NodeListOf<HTMLSpanElement> => {
      const text = element.textContent || "";
      element.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span style="display: inline-block; overflow: hidden; transform-style: preserve-3d;"><span style="display: inline-block; transform-style: preserve-3d;">${word}</span></span>`
        )
        .join(" ");
      return element.querySelectorAll("span span");
    };

    // Inisialisasi partikel
    const particles = createParticles();

    // Inisialisasi animasi teks
    let withoutLimitsChars: HTMLCollectionOf<HTMLSpanElement> | undefined;
    let designChars: HTMLCollectionOf<HTMLSpanElement> | undefined;
    let paragraphWords: NodeListOf<HTMLSpanElement> | undefined;

    if (withoutLimitsRef.current && designRef.current && paragraphRef.current) {
      withoutLimitsChars = splitTextIntoChars(withoutLimitsRef.current, true);
      designChars = splitTextIntoChars(designRef.current);
      paragraphWords = splitTextIntoWords(paragraphRef.current);
    }

    // Pengaturan 3D untuk container
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        perspective: 1000,
        transformStyle: "preserve-3d",
      });
    }

    // Pengaturan awal untuk karakter dan kata
    if (withoutLimitsChars && designChars) {
      gsap.set([withoutLimitsChars, designChars], {
        y: 150,
        z: -100,
        opacity: 0,
        rotationX: -90,
        rotationY: gsap.utils.random(-15, 15),
        transformOrigin: "50% 100%",
        filter: "blur(10px)",
      });
    }

    if (paragraphWords) {
      gsap.set(paragraphWords, {
        y: 50,
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.8,
      });
    }

    // Pengaturan awal untuk tombol CTA
    if (ctaButtonsRef.current?.children) {
      gsap.set(ctaButtonsRef.current.children, {
        y: 30,
        opacity: 0,
        scale: 0.9,
      });
    }

    // Master timeline untuk animasi masuk
    const masterTl = gsap.timeline();

    if (designChars) {
      masterTl.to(designChars, {
        y: 0,
        z: 0,
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "back.out(2)",
        stagger: {
          amount: 0.6,
          from: "start",
          onComplete: function () {
            gsap.to(designChars, {
              textShadow: "0 0 20px #ffffff, 0 0 40px #f59e0b",
              duration: 0.3,
              yoyo: true,
              repeat: 1,
            });
          },
        },
      });
    }

    if (withoutLimitsChars) {
      masterTl.to(
        withoutLimitsChars,
        {
          y: 0,
          z: 0,
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            amount: 0.8,
            from: "center",
            onComplete: function () {
              gsap.to(withoutLimitsChars, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              });
            },
          },
        },
        "-=0.8"
      );
    }

    if (paragraphWords) {
      masterTl.to(
        paragraphWords,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "-=0.6"
      );
    }

    if (ctaButtonsRef.current?.children) {
      masterTl.to(
        ctaButtonsRef.current.children,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        "-=0.4"
      );
    }

    // Animasi lanjutan
    const createAdvancedShimmer = () => {
      const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
      if (withoutLimitsChars) {
        shimmerTl
          .to(withoutLimitsChars, {
            backgroundPosition: "200% center",
            textShadow: "0 0 30px #fbbf24, 0 0 60px #f59e0b, 0 0 90px #d97706",
            scale: 1.05,
            z: 20,
            duration: 0.15,
            stagger: { amount: 1.2, from: "start" },
            ease: "power2.inOut",
          })
          .to(withoutLimitsChars, {
            backgroundPosition: "0% center",
            textShadow: "none",
            scale: 1,
            z: 0,
            duration: 0.15,
            stagger: { amount: 1.2, from: "start" },
            ease: "power2.inOut",
          });
      }
      return shimmerTl;
    };

    const createAdvancedDance = () => {
      const danceTl = gsap.timeline({ repeat: -1, repeatDelay: 8 });
      if (withoutLimitsChars) {
        danceTl
          .to(withoutLimitsChars, {
            y: () => gsap.utils.random(-15, 15),
            x: () => gsap.utils.random(-5, 5),
            rotation: () => gsap.utils.random(-15, 15),
            rotationY: () => gsap.utils.random(-20, 20),
            scale: () => gsap.utils.random(0.95, 1.1),
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
            stagger: { amount: 0.8, from: "center" },
          })
          .to(withoutLimitsChars, {
            y: 0,
            x: 0,
            rotation: 0,
            rotationY: 0,
            scale: 1,
            duration: 2,
            ease: "elastic.out(1, 0.3)",
            stagger: { amount: 0.8, from: "center" },
          });
      }
      return danceTl;
    };

    const createAdvancedGlitch = () => {
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 12 });
      if (withoutLimitsRef.current) {
        glitchTl
          .to(withoutLimitsRef.current, {
            x: 4,
            skewX: 2,
            filter: "hue-rotate(90deg) saturate(2)",
            duration: 0.1,
          })
          .to(withoutLimitsRef.current, {
            x: -4,
            skewX: -2,
            filter: "hue-rotate(-90deg) saturate(2)",
            duration: 0.1,
          })
          .to(withoutLimitsRef.current, {
            x: 2,
            skewX: 1,
            filter: "hue-rotate(45deg) saturate(1.5)",
            duration: 0.1,
          })
          .to(withoutLimitsRef.current, {
            x: 0,
            skewX: 0,
            filter: "none",
            duration: 0.1,
          });
      }
      return glitchTl;
    };

    const createAdvancedGradient = () => {
      if (withoutLimitsRef.current) {
        return gsap.to(withoutLimitsRef.current, {
          backgroundPosition: "400% center",
          duration: 6,
          ease: "none",
          repeat: -1,
          delay: 4,
        });
      }
      return null;
    };

    const createAdvancedMagnetic = () => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!withoutLimitsRef.current || !withoutLimitsChars) return;

        const rect = withoutLimitsRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;

          gsap.to(withoutLimitsRef.current, {
            x: deltaX * intensity,
            y: deltaY * intensity,
            rotationY: deltaX * intensity * 0.1,
            rotationX: -deltaY * intensity * 0.1,
            scale: 1 + intensity * 0.05,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(withoutLimitsChars, {
            y: () => gsap.utils.random(-5, 5) * intensity,
            rotation: () => gsap.utils.random(-3, 3) * intensity,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.02,
          });
        }
      };

      const handleMouseLeave = () => {
        if (!withoutLimitsRef.current || !withoutLimitsChars) return;

        gsap.to(withoutLimitsRef.current, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        });

        gsap.to(withoutLimitsChars, {
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.02,
        });
      };

      if (containerRef.current) {
        containerRef.current.addEventListener("mousemove", handleMouseMove);
        containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("mousemove", handleMouseMove);
          containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    };

    const createAdvancedPulse = () => {
      if (withoutLimitsRef.current) {
        return gsap.to(withoutLimitsRef.current, {
          scale: 1.03,
          filter: "brightness(1.2) saturate(1.3)",
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3,
        });
      }
      return null;
    };

    const createMorphingEffect = () => {
      const morphTl = gsap.timeline({ repeat: -1, repeatDelay: 15 });
      if (withoutLimitsChars) {
        morphTl
          .to(withoutLimitsChars, {
            scaleY: 0.7,
            scaleX: 1.3,
            duration: 0.3,
            ease: "power2.inOut",
            stagger: { amount: 0.5, from: "center" },
          })
          .to(withoutLimitsChars, {
            scaleY: 1.2,
            scaleX: 0.8,
            duration: 0.3,
            ease: "power2.inOut",
            stagger: { amount: 0.5, from: "center" },
          })
          .to(withoutLimitsChars, {
            scaleY: 1,
            scaleX: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.3)",
            stagger: { amount: 0.5, from: "center" },
          });
      }
      return morphTl;
    };

    // Mulai animasi lanjutan setelah animasi masuk
    const animationCleanup = setTimeout(() => {
      const shimmerAnimation = createAdvancedShimmer();
      const danceAnimation = createAdvancedDance();
      const glitchAnimation = createAdvancedGlitch();
      const gradientAnimation = createAdvancedGradient();
      const magneticCleanup = createAdvancedMagnetic();
      const pulseAnimation = createAdvancedPulse();
      const morphAnimation = createMorphingEffect();

      return () => {
        masterTl.kill();
        shimmerAnimation.kill();
        danceAnimation.kill();
        glitchAnimation.kill();
        gradientAnimation?.kill();
        pulseAnimation?.kill();
        morphAnimation.kill();
        magneticCleanup();
      };
    }, 3000);

    // Cleanup saat komponen unmount
    return () => {
      masterTl.kill();
      clearTimeout(animationCleanup);
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div id="home" className="scroll-mt-20 isolate min-h-screen overflow-hidden" ref={containerRef}>
      {/* Background dengan lapisan */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-amber-400 dark:bg-amber-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/3 h-1/3 bg-orange-400 dark:bg-orange-500 rounded-full blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-amber-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Sistem partikel */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(0)" }}></div>

      <div className="container mx-auto px-6 py-20 md:py-24 lg:py-28 xl:py-32 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Header Badges */}
          <div className="flex items-center justify-center flex-wrap gap-3">
  <div className="inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-gradient-to-r from-neutral-900 to-neutral-800 text-amber-400 font-medium text-xs sm:text-sm backdrop-blur-sm border border-neutral-700/50 shadow-xl">
    <Utensils className="w-4 h-4 mr-2" />
    Nikmatnya Sederhana, Indahnya Bersama
  </div>
</div>


          {/* Main Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span ref={designRef} className="block mb-2" style={{ transformStyle: "preserve-3d" }}>
              Banibazibeh
            </span>
            <span
              ref={withoutLimitsRef}
              className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 cursor-pointer transition-all duration-300 relative"
              style={{
                backgroundSize: "400% 100%",
                backgroundPosition: "0% center",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 4px 8px rgba(245, 158, 11, 0.3))",
              }}
            >
              Cemilan
            </span>
          </h1>

          {/* Deskripsi */}
          <p
            ref={paragraphRef}
            className="text-base lg:text-lg xl:text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl font-light leading-relaxed"
            style={{ transformStyle: "preserve-3d" }}
          >
            Cemilan hangat penuh kenangan.
            Banibaizabeh menyajikan kerupuk autentik yang menemani obrolan, kebersamaan, dan setiap momen sederhana jadi lebih bermakna.
          </p>

          {/* Indikator Kepercayaan */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">100+ Pembeli senang</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">4.9 rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
