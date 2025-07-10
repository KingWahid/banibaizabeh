'use client'
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HelpCircle, ArrowRight, Sparkles, Star } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface FAQItem {
  question: string
  answer: string
}

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          y: 50,
          opacity: 0,
        })
      }

      if (gridRef.current?.children) {
        gsap.set(Array.from(gridRef.current.children), {
          y: 60,
          opacity: 0,
        })
      }

      // Animate background boxes
      if (boxesRef.current) {
        const boxes = boxesRef.current.querySelectorAll(".animated-box")
        boxes.forEach((box) => {
          gsap.to(box as HTMLElement, {
            x: gsap.utils.random(-15, 15),
            y: gsap.utils.random(-15, 15),
            rotation: gsap.utils.random(-8, 8),
            duration: gsap.utils.random(4, 7),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: gsap.utils.random(0, 3),
          })
        })
      }

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      if (titleRef.current) {
        tl.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        })
      }

      if (gridRef.current?.children) {
        tl.to(
          Array.from(gridRef.current.children),
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.4",
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const faqData: FAQItem[] = [
    {
      question: "Apa saja produk kerupuk yang tersedia di Bani Baiza Beh?",
      answer:
        "Kami menyediakan berbagai macam kerupuk berkualitas tinggi seperti Gurilem yang renyah dengan rasa original, pedas sedang, dan pedas banget. Ada juga Seblak Level dengan berbagai tingkat kepedasan (level 3, 5, 7, dan 10), Blaktek yang renyah cikruh dengan pilihan rasa original, pedas sedang, dan pedas banget, serta ada juga basreng cemilan khas Jawa barat. Semua produk dibuat dengan bahan-bahan segar dan rempah-rempah pilihan.",
    },
    {
      question: "Berapa ukuran kemasan yang tersedia dan bagaimana cara pemesanan?",
      answer:
        "Semua produk kerupuk kami tersedia dalam dua ukuran kemasan plastik: 65g untuk cemilan pribadi dan 250g untuk berbagi dengan keluarga atau teman. Anda bisa memesan melalui toko online kami, mengunjungi toko fisik, atau menghubungi kami langsung. Kami juga melayani pembelian grosir untuk reseller dan toko.",
    },
    {
      question: "Apa yang membuat kerupuk Bani Baiza Beh berbeda dari yang lain?",
      answer:
        "Keunggulan kami terletak pada kualitas produk yang tinggi, rasa yang unik dan lezat, serta harga yang kompetitif. Kami menggunakan bahan-bahan segar seperti ikan segar untuk Seblak Level dan rempah-rempah pilihan untuk semua produk. Filosofi kami adalah menghadirkan kesederhanaan yang bermakna - cemilan kecil yang dapat membawa kebahagiaan dan memperkuat kebersamaan.",
    },
    {
      question: "Siapa target konsumen kerupuk Bani Baiza Beh?",
      answer:
        "Produk kami cocok untuk semua kalangan, dari anak-anak hingga dewasa. Terutama bagi mereka yang suka mencoba makanan ringan dan pedas, serta mereka yang menghargai kualitas dan cita rasa autentik. Kerupuk kami sempurna untuk menemani berbagai aktivitas seperti menonton film, bermain game, atau bersantai bersama keluarga dan teman.",
    },
    {
      question: "Bagaimana cara menjaga kualitas dan keamanan produk?",
      answer:
        "Kami berkomitmen menjaga kualitas dan keamanan produk dengan menggunakan bahan-bahan segar dan berkualitas tinggi, serta mengikuti standar produksi yang ketat. Semua produk dikemas dengan baik untuk menjaga kerenyahan dan kesegaran. Kami juga terus berinovasi untuk menghadapi perubahan selera konsumen sambil mempertahankan cita rasa khas yang sudah dipercaya pelanggan.",
    },
  ]

  const handleQuestionClick = (index: number): void => {
    setSelectedQuestion(index)
  }

  return (
    <section  ref={sectionRef} id="faq" className="scroll-mt-20 py-20 md:py-24 lg:py-32 relative overflow-hidden bg-[#F9E4BC]">
      {/* Enhanced Background with Box Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.2) 1px, transparent 1px)
                `,
            backgroundSize: "35px 35px",
          }}
        ></div>

        {/* Secondary Grid Pattern - Larger */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.15) 2px, transparent 2px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.15) 2px, transparent 2px)
                `,
            backgroundSize: "100px 100px",
            backgroundPosition: "15px 15px",
          }}
        ></div>

        {/* Diagonal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
                linear-gradient(45deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
                `,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Animated Box Background */}
        <div ref={boxesRef} className="absolute inset-0">
          {/* Large Animated Border Boxes */}
          <div className="animated-box absolute top-[8%] left-[8%] w-20 h-20 border-2 border-amber-500/25 rounded-xl opacity-40"></div>
          <div className="animated-box absolute top-[15%] left-[85%] w-28 h-28 border-2 border-orange-500/20 rounded-xl opacity-30"></div>
          <div className="animated-box absolute top-[35%] left-[12%] w-24 h-24 border-2 border-amber-500/25 rounded-xl opacity-35"></div>
          <div className="animated-box absolute top-[55%] left-[80%] w-32 h-32 border-2 border-orange-500/20 rounded-xl opacity-25"></div>
          <div className="animated-box absolute top-[75%] left-[15%] w-26 h-26 border-2 border-amber-500/25 rounded-xl opacity-40"></div>
          <div className="animated-box absolute top-[85%] left-[75%] w-22 h-22 border-2 border-orange-500/20 rounded-xl opacity-30"></div>

          {/* Medium Solid Boxes */}
          <div className="absolute top-[12%] left-[25%] w-12 h-12 bg-amber-500/8 rounded-lg"></div>
          <div className="absolute top-[28%] left-[65%] w-16 h-16 bg-orange-500/6 rounded-lg"></div>
          <div className="absolute top-[48%] left-[30%] w-14 h-14 bg-amber-500/8 rounded-lg"></div>
          <div className="absolute top-[68%] left-[60%] w-18 h-18 bg-orange-500/6 rounded-lg"></div>
          <div className="absolute top-[88%] left-[35%] w-16 h-16 bg-amber-500/8 rounded-lg"></div>

          {/* Small Accent Boxes */}
          <div className="absolute top-[20%] left-[40%] w-8 h-8 bg-amber-500/10 rounded-md"></div>
          <div className="absolute top-[40%] left-[70%] w-10 h-10 bg-orange-500/8 rounded-md"></div>
          <div className="absolute top-[60%] left-[45%] w-6 h-6 bg-amber-500/12 rounded-md"></div>
          <div className="absolute top-[80%] left-[55%] w-8 h-8 bg-orange-500/8 rounded-md"></div>

          {/* Patterned Boxes */}
          <div
            className="absolute top-[10%] left-[50%] w-24 h-24 rounded-lg opacity-25"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.15) 2px, transparent 2px, transparent 8px)",
            }}
          ></div>
          <div
            className="absolute top-[45%] left-[20%] w-20 h-20 rounded-lg opacity-20"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.12) 2px, transparent 2px, transparent 8px)",
            }}
          ></div>
          <div
            className="absolute top-[70%] left-[70%] w-28 h-28 rounded-lg opacity-25"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.1) 2px, transparent 2px, transparent 8px)",
            }}
          ></div>

          {/* Dotted Pattern Boxes */}
          <div
            className="absolute top-[25%] left-[15%] w-16 h-16 rounded-lg opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          ></div>
          <div
            className="absolute top-[65%] left-[85%] w-20 h-20 rounded-lg opacity-25"
            style={{
              backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          ></div>
        </div>

        {/* Box Clusters for Corners */}
        <div className="absolute top-12 right-12 opacity-35">
          <div className="relative">
            <div className="absolute top-0 left-0 w-6 h-6 border border-amber-500/40 rounded-md"></div>
            <div className="absolute top-3 left-3 w-6 h-6 border border-amber-500/40 rounded-md"></div>
            <div className="absolute top-6 left-6 w-6 h-6 border border-amber-500/40 rounded-md"></div>
            <div className="absolute top-9 left-9 w-6 h-6 border border-amber-500/40 rounded-md"></div>
          </div>
        </div>

        <div className="absolute bottom-16 left-12 opacity-35">
          <div className="relative">
            <div className="absolute top-0 left-0 w-8 h-8 border border-orange-500/40 rounded-md"></div>
            <div className="absolute top-4 left-4 w-8 h-8 border border-orange-500/40 rounded-md"></div>
            <div className="absolute top-8 left-8 w-8 h-8 border border-orange-500/40 rounded-md"></div>
          </div>
        </div>

        {/* Floating Box Groups */}
        <div className="absolute top-1/3 left-1/4 opacity-20">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-amber-500/20 rounded-sm"></div>
            <div className="w-4 h-4 bg-amber-500/15 rounded-sm"></div>
            <div className="w-4 h-4 bg-amber-500/25 rounded-sm"></div>
          </div>
        </div>

        <div className="absolute top-2/3 right-1/4 opacity-20">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-5 h-5 bg-orange-500/20 rounded-sm"></div>
            <div className="w-5 h-5 bg-orange-500/15 rounded-sm"></div>
            <div className="w-5 h-5 bg-orange-500/25 rounded-sm"></div>
            <div className="w-5 h-5 bg-orange-500/18 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-orange-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 border border-amber-500/30 mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pertanyaan{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
              Seputar Kerupuk Bani Baiza Beh
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban dari pertanyaan yang paling sering ditanyakan seputar produk kerupuk berkualitas kami
          </p>
        </div>

        {/* FAQ Grid */}
        <div ref={gridRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[600px]">
            {/* Questions List - Left Side */}
            <div className="lg:col-span-2 space-y-3">
              {faqData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                    selectedQuestion === index
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 shadow-lg"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        selectedQuestion === index
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg"
                          : "bg-gray-200 group-hover:bg-gray-300"
                      }`}
                    >
                      <HelpCircle
                        className={`w-4 h-4 ${
                          selectedQuestion === index ? "text-white" : "text-gray-600 group-hover:text-gray-700"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium leading-tight ${
                        selectedQuestion === index ? "text-amber-600" : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Answer Display - Right Side */}
            <div className="lg:col-span-3">
              <div className="sticky top-8 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-xl min-h-[400px]">
                {selectedQuestion !== null && faqData[selectedQuestion] && (
                  <div className="space-y-6">
                    {/* Question Header */}
                    <div className="flex items-start space-x-4 pb-6 border-b border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                          {faqData[selectedQuestion].question}
                        </h3>
                      </div>
                    </div>

                    {/* Answer Content */}
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg">{faqData[selectedQuestion].answer}</p>
                    </div>
                  </div>
                )}

                {selectedQuestion === null && (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                        <HelpCircle className="w-8 h-8 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pilih Pertanyaan</h3>
                        <p className="text-gray-600">
                          Klik salah satu pertanyaan di sebelah kiri untuk melihat jawabannya
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="relative bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-amber-500/10 overflow-hidden">
            {/* Safe animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-orange-100/20 to-red-100/20 animate-pulse -z-10"></div>

            {/* Safe floating elements */}
            <div className="absolute top-6 right-6 animate-pulse pointer-events-none">
              <Sparkles className="w-4 h-4 text-amber-500/60" />
            </div>
            <div
              className="absolute bottom-6 left-6 animate-pulse pointer-events-none"
              style={{ animationDelay: "1s" }}
            >
              <Star className="w-4 h-4 text-orange-500/60" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Punya{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                  Pertanyaan Lain?
                </span>
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                Jangan ragu untuk menghubungi kami. Kami siap membantu menjawab pertanyaan Anda seputar produk kerupuk berkualitas Bani Baiza Beh
              </p>
              <a
                href="https://wa.me/+62881023261660"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-lg overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <span className="relative z-10">Hubungi Kami</span>
                <ArrowRight className="w-6 h-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ