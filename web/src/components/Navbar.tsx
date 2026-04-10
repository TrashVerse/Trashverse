import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-lg border-b-4 border-green-500">
      <div className="container-x flex items-center justify-between py-6 md:py-8">
        <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-green-600">
          <img src="/images/logo.png" width={60} height={60} alt="TrashVerse Logo" className="w-16 h-16 md:w-20 md:h-20" />
          <span>TrashVerse</span>
        </div>

        <ul className="hidden md:flex gap-10 text-gray-700 text-lg font-semibold">
          <li>
            <Link to="/" className="hover:text-green-600 transition-colors py-2 px-2">
              Services
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-green-600 transition-colors py-2 px-2">
              Why Us
            </Link>
          </li>
          <li>
            <Link to="/careers" className="hover:text-green-600 transition-colors py-2 px-2">
              Join Us
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-green-600 transition-colors py-2 px-2">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-green-600 transition-colors py-2 px-2">
              Blog
            </Link>
          </li>
        </ul>

        <Link
          to="/login"
          className="hidden md:flex bg-green-600 text-white px-8 py-3 rounded-xl items-center justify-center font-bold hover:bg-green-700 transition-colors shadow-lg text-lg"
        >
          Get Started
        </Link>

        <button 
          className="md:hidden text-4xl text-gray-700 p-3 hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col gap-1 px-4 py-3 text-gray-700">
            <li>
              <Link 
                to="/" 
                onClick={() => setOpen(false)}
                className="block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                onClick={() => setOpen(false)}
                className="block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Why Us
              </Link>
            </li>
            <li>
              <Link 
                to="/careers" 
                onClick={() => setOpen(false)}
                className="block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                onClick={() => setOpen(false)}
                className="block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                onClick={() => setOpen(false)}
                className="block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Blog
              </Link>
            </li>
            <li className="pt-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block bg-green-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
