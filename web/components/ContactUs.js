// components/Contact.js
import {  Facebook, } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
  return (
    <section className="container-x w-full h-150 bg-white py-16 px-6 md:px-20 max-w-7xl mx-auto justify-center">
      <div className="max-120 h-50 max-auto bg-gray-200 border border-gray-200 rounded-lg p-8 mb-8 md:p-10 lg:p-12 justify-center">
        
        <div className="grid md:grid-cols-3 gap-10 ">
          
          {/* Brand Section */}
          <divcon className="space-y-4">
      <div className="flex items-center text-2xl font-bold text-green-600">
        <Image src="/images/logo.png" width={40} height={40} alt="TrashVerse Logo"/>
        TrashVerse
      </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforming waste management into a profitable and sustainable experience for everyone.
            </p>
          </divcon>

          {/* Quick Links */}
          <divcon>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-green-700 cursor-pointer">
                <Link href="/privacy-policy"> Privacy Policy</Link></li>
              <li className="hover:text-green-700 cursor-pointer">Partnerships</li>
              <li className="hover:text-green-700 cursor-pointer">Media Kit</li>
            </ul>
          </divcon>

          {/* Contact Info */}
          <divcon>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide">
              CONTACT US
            </h4>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>Abia State, Nigeria</p>
              <p>hello@trashverse.com</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-gray-500">
              <Link href="https://x.com/trash_verse"><FaXTwitter className="w-5 h-5 hover:text-green-700 cursor-pointer" /></Link>
              <Link href="https://www.facebook.com/share/1Bjg2pjWDa/?mibextid=wwXlfr"><Facebook className="w-5 h-5 hover:text-green-700 cursor-pointer" /></Link>
              <Link href="https://www.tiktok.com/@trash_verse"><FaTiktok className="w-5 h-5 hover:text-green-700 cursor-pointer" /></Link>
              <Link href="https://whatsapp.com/channel/0029vb7CXGG5PO141uiKmm0yap"><FaWhatsapp className="w-5 h-5 hover:text-green-700 cursor-pointer" /></Link>
            </div>
          </divcon>

        </div>

        {/* Bottom copyright */}
        <divcopy className=" mt-12 pt-6 text-center text-gray-500 text-sm">
          © 2026 TrashVerse Inc. All rights reserved.
        </divcopy>

      </div>
    </section>
  );
}
