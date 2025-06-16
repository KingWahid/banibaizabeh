"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Zap,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  UtensilsCrossedIcon,
  Users2,
  HeartIcon,
  ThumbsUp,
  Rocket,
  Lightbulb,
  Flame,
  Smile,
  Factory,
  LucideIcon,
} from "lucide-react"

type CounterProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

type Stat = {
  number: number
  suffix?: string
  label: string
  description?: string
  icon: LucideIcon
}

type StatCardProps = {
  stat: Stat
  index: number
}

type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

type FeatureCardProps = {
  item: Feature
  index: number
}

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return (
    <div
      ref={ref}
      className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

const StatCard = ({ stat, index}: StatCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = stat.icon

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Background glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

      {/* Main card */}
      <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-amber-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/25 p-5 md:p-6 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-500 rounded-full blur-xl transform -translate-x-8 translate-y-8"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-2 right-2">
          <div
            className="w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-ping"
            style={{ animationDelay: `${index * 0.5}s`, animationDuration: "3s" }}
          ></div>
        </div>

        <div className="flex items-center space-x-4 relative z-10">
          {/* Enhanced Icon */}
          <div className="flex-shrink-0 relative">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
            <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Icon glow */}
            <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>

          {/* Enhanced Content */}
          <div className="flex-1">
            <div className="flex items-baseline space-x-2 mb-1">
              <Counter end={stat.number} suffix={stat.suffix} />
              {isHovered && (
                <div className="text-amber-500 animate-bounce">
                  <TrendingUp className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="text-sm md:text-base font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
              {stat.label}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              {stat.description}
            </div>
          </div>
        </div>

        {/* Progress bar animation */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
      </div>
    </div>
  )
}

const FeatureCard = ({ item, index }: FeatureCardProps) => {
  const Icon = item.icon; // Ambil icon dari props

  return (
    <div className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex gap-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/20 transition-all duration-300 hover:transform hover:translate-x-2">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Arrow indicator */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="w-5 h-5 text-amber-500" />
        </div>
      </div>
    </div>
  )
}

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Main grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    ></div>

    {/* Animated grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] animate-pulse"
      style={{
        backgroundImage: `
          linear-gradient(rgba(249, 115, 22, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249, 115, 22, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        animationDuration: "4s",
      }}
    ></div>

    {/* Floating grid squares */}
    <div className="absolute top-20 left-20 w-4 h-4 border border-amber-400/20 rotate-45 animate-pulse"></div>
    <div
      className="absolute top-40 right-32 w-3 h-3 border border-orange-400/30 rotate-12 animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>
    <div
      className="absolute bottom-32 left-1/3 w-5 h-5 border border-red-400/15 -rotate-12 animate-pulse"
      style={{ animationDelay: "2s" }}
    ></div>
    <div
      className="absolute top-1/2 right-20 w-6 h-6 border border-amber-500/25 rotate-45 animate-pulse"
      style={{ animationDelay: "3s" }}
    ></div>
    <div
      className="absolute bottom-20 right-1/4 w-4 h-4 border border-orange-500/20 -rotate-45 animate-pulse"
      style={{ animationDelay: "1.5s" }}
    ></div>

    {/* Larger decorative squares */}
    <div
      className="absolute top-10 left-1/2 w-8 h-8 border-2 border-amber-400/10 rotate-12 animate-spin"
      style={{ animationDuration: "20s" }}
    ></div>
    <div
      className="absolute bottom-10 left-10 w-10 h-10 border-2 border-orange-400/10 -rotate-12 animate-spin"
      style={{ animationDuration: "25s", animationDelay: "2s" }}
    ></div>
    <div
      className="absolute top-1/3 right-10 w-6 h-6 border-2 border-red-400/15 rotate-45 animate-spin"
      style={{ animationDuration: "15s", animationDelay: "1s" }}
    ></div>

    {/* Grid intersection highlights */}
    <div
      className="absolute top-32 left-40 w-2 h-2 bg-amber-400/20 rounded-full animate-ping"
      style={{ animationDuration: "3s" }}
    ></div>
    <div
      className="absolute top-60 right-60 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-ping"
      style={{ animationDuration: "4s", animationDelay: "1s" }}
    ></div>
    <div
      className="absolute bottom-40 left-60 w-2.5 h-2.5 bg-red-400/15 rounded-full animate-ping"
      style={{ animationDuration: "5s", animationDelay: "2s" }}
    ></div>
  </div>
)

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const whyToopayRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsContentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current], {
        y: 50,
        opacity: 0,
      })

      gsap.set(Array.from(servicesRef.current?.children ?? []), {
        y: 80,
        opacity: 0,
        scale: 0.8,
      })

      gsap.set(Array.from(whyToopayRef.current?.children ?? []), {
        x: -50,
        opacity: 0,
        rotationY: -15,
      })

      gsap.set(Array.from(statsRef.current?.children ?? []), {
        x: 50,
        opacity: 0,
        scale: 0.8,
        rotationY: 15,
      })

      gsap.set(ctaRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.9,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
        .to(
          subtitleRef.current,
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          descriptionRef.current,
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          Array.from(servicesRef.current?.children ?? []),
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.2",
        )

      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: statsContentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      statsTl
        .to(Array.from(whyToopayRef.current?.children ?? []), {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
        })
        .to(
          Array.from(statsRef.current?.children ?? []),
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.1,
          },
          "-=0.7",
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )

      gsap.to(Array.from(statsRef.current?.children ?? []), {
        y: "random(-8, 8)",
        rotation: "random(-1, 1)",
        duration: "random(4, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: "random",
        },
      })

      gsap.to(".sparkle", {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
  {
    icon: UtensilsCrossedIcon, // ganti dengan icon yang sesuai dari lucide-react
    title: "Produk Kerupuk",
    description: "Kerupuk berkualitas tinggi dengan berbagai rasa dan jenis untuk semua kalangan.",
    features: ["Basreng", "Kerupuk Gurilem", "Pangsit Goreng", "Varian Original & Pedas"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users2, // ganti dengan icon yang sesuai
    title: "Filosofi & Kebersamaan",
    description: "Menghidupkan momen kebersamaan melalui cemilan sederhana yang penuh makna.",
    features: ["Kesederhanaan yang Autentik", "Cemilan untuk Semua Momen", "Membangkitkan Kenangan", "Rasa yang Mengikat"],
    color: "from-amber-600 to-red-500",
  },
  {
    icon: Award, // ganti sesuai kebutuhan
    title: "Keunggulan Kompetitif",
    description: "Menghadirkan cita rasa unik, harga bersahabat, dan komitmen terhadap kualitas produk.",
    features: ["Rasa Unik & Konsisten", "Bahan Berkualitas", "Harga Terjangkau", "Kemasan Menarik"],
    color: "from-rose-500 to-pink-500",
  },
]


const stats = [
  {
    icon: Factory,
    number: 1,
    label: "Produksi Rumahan",
    suffix: "",
    description: "Dibuat dari dapur sendiri dengan bahan dan rempah pilihan",
  },
  {
    icon: Smile,
    number: 100,
    label: "Cemilan Terjual",
    suffix: "+",
    description: "Telah dinikmati oleh keluarga, teman, dan pelanggan lokal",
  },
  {
    icon: Flame,
    number: 5,
    label: "Varian Produk",
    suffix: "",
    description: "Gurilem, Seblak Level, Pangsit, Lumpia , dan varian lainnya",
  },
  {
    icon: Lightbulb,
    number: 100,
    label: "Inovasi Rasa",
    suffix: "%",
    description: "Selalu mengembangkan rasa pedas, gurih, dan kemasan menarik",
  },
];


  const whyChooseBaniBaizaBeh = [
  {
    icon: HeartIcon,
    title: "Rasa yang Bermakna",
    description:
      "Kerupuk kami tidak sekadar cemilan, tapi pengalaman rasa yang membawa kenangan dan kebersamaan di setiap gigitan.",
  },
  {
    icon: ThumbsUp,
    title: "Kualitas Terjaga",
    description:
      "Diproduksi dengan bahan pilihan dan proses higienis, kami menjaga kualitas dan rasa agar konsisten di setiap produk.",
  },
  {
    icon: Users2,
    title: "Teman Semua Kalangan",
    description:
      "Dari anak-anak hingga dewasa, kerupuk kami cocok untuk berbagai selera dan menjadi teman di berbagai momen.",
  },
  {
    icon: Rocket,
    title: "Inovatif & Variatif",
    description:
      "Kami hadir dengan beragam jenis dan rasa kerupuk seperti basreng, gurilem, dan pangsit yang disesuaikan dengan tren dan selera pasar.",
  },
]


  return (
    <section id="about" ref={sectionRef} className="scroll-mt-20 py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced Grid Background */}
      <GridPattern />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-orange-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-purple-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating sparkles */}
        <div className="absolute top-20 left-20 sparkle">
          <Sparkles className="w-4 h-4 text-amber-400/30" />
        </div>
        <div className="absolute top-40 right-32 sparkle" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-3 h-3 text-orange-400/40" />
        </div>
        <div className="absolute bottom-32 left-1/3 sparkle" style={{ animationDelay: "4s" }}>
          <Sparkles className="w-5 h-5 text-red-400/20" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div ref={titleRef} className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Apa yang Kami Lakukan
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
              Solusi Ngemil{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                Nikmat
              </span>
            </h2>
          </div>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-6"
          >
            Kami hadir dari filosofi bahwa kebahagiaan tidak selalu datang dari hal besar—kadang cukup dari sepotong kerupuk. Kami percaya bahwa dalam kesederhanaan, tersimpan rasa, kenangan, dan kebersamaan yang tak ternilai.
          </p>

          <div ref={descriptionRef} className="max-w-4xl mx-auto">
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Produk kami bukan sekadar cemilan. Ia adalah teman nonton, pelengkap ngobrol, dan penyatu momen kebersamaan. Dari tekstur renyah hingga rasa yang beragam—original, pedas, asin, hingga varian khas seperti basreng, gurilem, dan kerupuk—semua dibuat dengan sepenuh hati dan bahan berkualitas tinggi.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                    <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Two-column Stats Section */}
        <div ref={statsContentRef} className="relative mb-20">
          {/* Enhanced background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-l from-purple-500/5 via-pink-500/5 to-red-500/5 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Enhanced Left Column: Why Choose TooPay */}
            <div ref={whyToopayRef} className="space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  Keunggulan Kami
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  Mengapa Harus{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                    Banibaizabeh?
                  </span>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Kami berkomitmen untuk memberikan layanan terbaik dengan standar kualitas tertinggi. Berikut adalah
                  beberapa alasan mengapa pelanggan membeli produk Banibaizabeh:
                </p>
              </div>

              {/* Enhanced Why Choose TooPay Points */}
              <div className="space-y-6">
                {whyChooseBaniBaizaBeh.map((item, index) => (
                  <FeatureCard key={index} item={item} index={index} />
                ))}
              </div>

            </div>

            {/* Enhanced Right Column: Stats */}
            <div ref={statsRef} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Kualitas Layanan Kami</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                </p>
              </div>

              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About