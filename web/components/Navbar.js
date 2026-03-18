// components/Navbar.js
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="container-x flex items-center justify-between gap-35 py-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="TrashVerse Logo"
          />
          TrashVerse
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li><Link href="/" className="hover:text-green-600">Services</Link></li>
          <li><Link href="/" className="hover:text-green-600">Why Us</Link></li>
          <li><Link href="/careers" className="hover:text-green-600">Join Us</Link></li>
          <li><Link href="/" className="hover:text-green-600">Contact</Link></li>
          <li><Link href="/blog" className="hover:text-green-600">Blog</Link></li>
        </ul>

        {/* Desktop Button */}
        <Link
          href="/login"
          className="hidden md:flex bg-green-600 text-white w-32 h-10 rounded-lg items-center justify-center font-medium hover:bg-green-700"
        >
          Get Started
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-4 text-gray-700">
            <li><Link href="/" onClick={() => setOpen(false)}>Services</Link></li>
            <li><Link href="/" onClick={() => setOpen(false)}>Why Us</Link></li>
            <li><Link href="/careers" onClick={() => setOpen(false)}>Careers</Link></li>
            <li><Link href="/" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link href="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
            <Link
              href="/login"
              className="bg-green-600 text-white text-center  font-medium"
            >
              Get Started
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
