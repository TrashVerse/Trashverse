import { Facebook } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20">
      <div className="mx-auto max-w-7xl rounded-xl border border-gray-200 bg-gray-50 p-8 md:p-10 lg:p-12">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
              <Image src="/images/logo.png" width={40} height={40} alt="Trashverse Logo" className="rounded-full" />
              <span>Trashverse</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              Transforming waste management into a profitable and sustainable experience for everyone.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer hover:text-green-700">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="cursor-pointer hover:text-green-700">Partnerships</li>
              <li className="cursor-pointer hover:text-green-700">Media Kit</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-900 md:mt-0">
              Contact Us
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Abia State, Nigeria</p>
              <p>hello@trashverse.com</p>
            </div>

            <div className="mt-4 flex gap-4 text-gray-500">
              <Link href="https://x.com/trash_verse" aria-label="X">
                <FaXTwitter className="h-5 w-5 cursor-pointer hover:text-green-700" />
              </Link>
              <Link href="https://www.facebook.com/share/1Bjg2pjWDa/?mibextid=wwXlfr" aria-label="Facebook">
                <Facebook className="h-5 w-5 cursor-pointer hover:text-green-700" />
              </Link>
              <Link href="https://www.tiktok.com/@trash_verse" aria-label="TikTok">
                <FaTiktok className="h-5 w-5 cursor-pointer hover:text-green-700" />
              </Link>
              <Link href="https://whatsapp.com/channel/0029vb7CXGG5PO141uiKmm0yap" aria-label="WhatsApp">
                <FaWhatsapp className="h-5 w-5 cursor-pointer hover:text-green-700" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300/70 pt-6 text-center text-sm text-gray-500">
          © 2026 Trashverse Inc. All rights reserved.
        </div>
      </div>
    </section>
  );
}
