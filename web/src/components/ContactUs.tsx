import { Facebook } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ContactUs() {
  return (
    <section className="container-x w-full h-150 bg-white py-16 px-6 md:px-20 max-w-7xl mx-auto justify-center">
      <div className="max-120 h-50 max-auto bg-gray-200 border border-gray-200 rounded-lg p-8 mb-8 md:p-10 lg:p-12 justify-center">
        <div className="grid md:grid-cols-3 gap-10 ">
          <div className="space-y-4">
            <div className="flex items-center text-2xl font-bold text-green-600">
              <img src="/images/logo.png" width={40} height={40} alt="Trashverse Logo" />
              Trashverse
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforming waste management into a profitable and sustainable experience for
              everyone.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-green-700 cursor-pointer">
                <Link to="/privacy-policy"> Privacy Policy</Link>
              </li>
              <li className="hover:text-green-700 cursor-pointer">Partnerships</li>
              <li className="hover:text-green-700 cursor-pointer">Media Kit</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide">CONTACT US</h4>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>Abia State, Nigeria</p>
              <p>hello@trashverse.com</p>
            </div>

            <div className="flex gap-4 mt-4 text-gray-500">
              <Link to="https://x.com/trash_verse">
                <FaXTwitter className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              </Link>
              <Link to="https://www.facebook.com/share/1Bjg2pjWDa/?mibextid=wwXlfr">
                <Facebook className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              </Link>
              <Link to="https://www.tiktok.com/@trash_verse">
                <FaTiktok className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              </Link>
              <Link to="https://whatsapp.com/channel/0029vb7CXGG5PO141uiKmm0yap">
                <FaWhatsapp className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300/70 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide">OUR PARTNERS</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-700">
              <img src="/images/science.jpeg" alt="Abia State Ministry of Science and Technology" className="h-8 w-8 rounded-full object-cover" />
              <span>Abia State Ministry of Science and Technology</span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-700">
              <img src="/images/starich.png" alt="Starich Recycling Technology Co. LTD" className="h-8 w-8 rounded-full object-cover" />
              <span>Starich Recycling Technology Co. LTD</span>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-700">
              <img src="/images/ighub.png" alt="Innovation Growth Hub (iGHUB)" className="h-8 w-8 rounded-full object-cover" />
              <span>Innovation Growth Hub (iGHUB)</span>
            </div>
          </div>
        </div>

        <div className=" mt-12 pt-6 text-center text-gray-500 text-sm">
          © 2026 Trashverse Inc. All rights reserved.
        </div>
      </div>
    </section>
  );
}
