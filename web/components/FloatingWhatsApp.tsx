"use client";

import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function FloatingWhatsapp() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <a
      href="https://wa.me/2347026368679"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl animate-bounce transition-all duration-300">
        <FaWhatsapp size={30} />
      </div>
    </a>
  );
}