import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 text-white py-10 px-4 shadow-[0_-2px_20px_rgba(0,0,255,0.3)]">



      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-3xl font-bold text-white-600 mb-3 tracking-wide">Esthithia</h2>
          <p className="text-sm leading-relaxed">
            Where timeless style, bold beauty, and modern trends meet to inspire your everyday magic.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white-700">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="./components/Home.tsx" className="hover:text-gray-500 transition duration-300">Home</a></li>
            <li><a href="shop.tsx" className="hover:text-gray-500 transition duration-300">Shop</a></li>
            <li><a href="about us.tsx" className="hover:text-gray-500 transition duration-300">About Us</a></li>
            <li><a href="contact.tsx" className="hover:text-gray-500 transition duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white-700 relative right-29">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 pt-6 border-t border-blue-200 text-center text-sm text-black-500">
        © {new Date().getFullYear()} <span className="font-semibold text-black-600">Esthithia</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
