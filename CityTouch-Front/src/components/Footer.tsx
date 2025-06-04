import { Mail, Phone, MapPin } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer
      className="py-12 border-t"
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-fg)",
        borderColor: "var(--footer-border)",
      }}
    >
      {" "}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        {/* Brand */}
        <div className="flex flex-col items-start sm:items-center md:items-start">
          <a
            href="/"
            rel="noreferrer noopener"
            className="mb-4 flex items-center"
          >
            <img
              src="/cityTouch.png"
              alt="City Touch Man and Van"
              className="w-28"
            />
          </a>
          <p className="text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-full text-sm sm:text-center md:text-left">
            Reliable and affordable man and van services in North West London.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#how-it-works"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/#services"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/#faq"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone size={16} />
              <a
                href="tel:+4407739392232"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition
"
              >
                +44 7739 392232
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Mail size={16} />
              <a
                href="mailto:support@citytouch.co.uk"
                className="hover:text-purple-500 dark:hover:text-purple-400 transition
"
              >
                support@citytouch.co.uk
              </a>
            </li>
            <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <MapPin size={16} />
              <span>North West London</span>
            </li>
          </ul>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-center md:justify-end">
          <ModeToggle />
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6">
        <p className="text-center text-gray-700 dark:text-gray-400 text-sm select-none">
          &copy; {new Date().getFullYear()} CityTouch. All rights reserved.
        </p>
        <p className="text-center text-gray-400 dark:text-gray-400 text-sm select-none">
          Crafted with ❤️ from{" "}
          <Link to="/login" onClick={scrollToTop}>
            MgPhone
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
