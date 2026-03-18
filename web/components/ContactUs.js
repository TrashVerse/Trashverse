// components/Contact.js
import {  Facebook, } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
  return (
    <section className="container-x w-full h-100 bg-white py-16 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="max-100 h-50 bg-gray-200 border border-gray-200 rounded-lg p-8 mb-8 md:p-10 lg:p-12">
        
        <div className="grid md:grid-cols-4 max-md:grid-cols-1 gap-10 items-start">
          
          {/* Brand Section */}
          <divcon className="space-y-4">
            <divcop className="flex items-center text-2xl font-bold text-green-600 ml-5%">
            <Image src="/images/logo.png" width={40} height={40} rounded-full alt="TrashVerse Logo"/>
            TrashVerse
            </divcop>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforming waste management into a profitable and sustainable experience for everyone.
            </p>
          </divcon>

          {/* Quick Links */}
          <divcon>
            <divcop1>
            <h4 className="font-semibold text-gray-900 text-sm">
              QUICK LINKS
            </h4>
            </divcop1>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-green-700 cursor-pointer">
                <Link href="/privacy-policy"> Privacy Policy</Link></li>
              <li className="hover:text-green-700 cursor-pointer">Partnerships</li>
              <li className="hover:text-green-700 cursor-pointer">Media Kit</li>
            </ul>
          </divcon>

          {/* SPONSPORS */}
            <divcons>
              <divcop2>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide mb-5 mt-4">
              SPONSORS
            </h4>
            </divcop2>
            <ul className="space-y-4 text-black text-sm">
              <li className="hover:text-green-700 cursor-pointer flex items-center rounded-full gap-2 ">
                <Image src="/images/science.jpeg" width={30} height={5} alt="Abia State Ministry of Science and Technology" />
                Abia State Ministry of Science and Technology
              </li>
              <li className="hover:text-green-700 cursor-pointer flex items-center rounded-full gap-2 mb-5 mt-4">
                <Image src="/images/starich.png" width={30} height={5} alt="Starich Recycling Technology Co.LTD" />
                Starich Recycling Technology Co.LTD
              </li>
              <li className="hover:text-green-700  cursor-pointer flex items-center rounded-full gap-2 ">
                <Image src="/images/ighub.png" width={35} height={5} alt="Innovation Growth Hub (iGHUB)" />
                Innovation Growth Hub (iGHUB)
              </li>
            </ul>
          </divcons>

          {/* Contact Info */}
          <divcon>
            <divcop1>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide mb-5 mt-4">
              CONTACT US
            </h4>
            </divcop1>
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
