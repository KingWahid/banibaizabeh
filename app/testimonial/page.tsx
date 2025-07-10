// components/Testimonials.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  rating: number;
  product: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  index: number;
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:testimonials")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "testimonials" },
        (payload) => {
          const newTestimonial = payload.new as TestimonialItem;
          setTestimonials((prev) => [newTestimonial, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote || !rating || !product) return;

    const { data, error } = await supabase.from("testimonials")
      .insert([{ name, quote, rating, product }])
      .select()
      .single();

    if (error) {
      console.error("Insert gagal:", error);
      return;
    }

    setTestimonials((prev) => [data, ...prev]);
    setName("");
    setQuote("");
    setRating(0);
    setProduct("");
  };

  const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => (
    <div className="group">
      <div className="relative bg-white border border-neutral-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
        <Quote className="absolute top-4 left-4 w-6 h-6 text-amber-500/60" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-800">{testimonial.name}</h3>
                <p className="text-sm text-neutral-500">{testimonial.product}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={`filled-${i}`} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
              {[...Array(5 - testimonial.rating)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-neutral-300" />
              ))}
            </div>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">{testimonial.quote}</p>
        </div>
        <div className="absolute top-4 right-4 w-6 h-6 bg-amber-500 text-white text-xs rounded flex items-center justify-center">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-26 bg-[#F9E4BC]">
      <div className="container mx-auto px-10">
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-6">
            <Quote className="w-4 h-4 mr-2" />
            Testimoni
          </span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Apa kata{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">Pelanggan</span>
          </h2>
          <p className="text-lg text-neutral-600 mt-2">
            Kami sangat menghargai setiap ulasan dari Anda
          </p>
        </div>

        <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-neutral-800">Tulis Testimoni Anda</h3>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Nama Produk"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="p-3 border rounded-lg w-full"
            />
            <textarea
              placeholder="Tulis ulasan Anda"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="p-3 border rounded-lg w-full"
              placeholder="Rating (1-5)"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Kirim Testimoni
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
