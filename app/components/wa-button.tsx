'use client';

import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface WhatsAppButtonProps {
  phoneNumber?: string; // default ke nomor tertentu jika tidak diisi
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "+62881023261660", // ← ganti default nomor WA kamu di sini
  message = "Halo saya tertarik dengan produk Anda!",
}) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 p-4 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </Link>
  );
};

export default WhatsAppButton;
