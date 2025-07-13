import { motion } from "framer-motion";

// Footer component for the Werewolf Game with a refined UI
export default function Footer() {
  return (
    <motion.div
      className="relative w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 overflow-hidden border-t border-gray-700 shadow-inner" // Removed mt-20
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {/* Subtle background pattern/texture (optional, can be done with CSS pseudo-elements or SVG) */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 5v1H5zM0 0h1L6 6V5z\'/%3E%3C/g%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* Main Call to Action */}
        <motion.p
          className="text-yellow-400 font-extrabold text-3xl md:text-4xl mb-12 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Join the Pack, Stay Connected!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          {/* Contact Info Section */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <h4 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center">
              <span className="mr-3 text-3xl">📞</span> Contact Us
            </h4>
            <ul className="space-y-2 text-lg">
              <li>Email: <a href="mailto:[your.email@example.com]" className="hover:text-yellow-400 transition-colors duration-200">[your.email@example.com]</a></li>
              <li>Support: <a href="mailto:[support.email@example.com]" className="hover:text-yellow-400 transition-colors duration-200">[support.email@example.com]</a></li>
              <li>Location: [Your City, Country]</li>
            </ul>
          </motion.div>

          {/* Social Media Links Section */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <h4 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center">
              <span className="mr-3 text-3xl">🌐</span> Follow Us
            </h4>
            <ul className="space-y-2 text-lg">
              <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center"><span className="mr-2">📘</span> Facebook</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center"><span className="mr-2">🐦</span> Twitter</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center"><span className="mr-2">📸</span> Instagram</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center"><span className="mr-2">💬</span> Discord</a></li>
            </ul>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
          >
            <h4 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center">
              <span className="mr-3 text-3xl">🔗</span> Quick Links
            </h4>
            <ul className="space-y-2 text-lg">
              <li><a href="/rules" className="hover:text-yellow-400 transition-colors duration-200">Game Rules</a></li>
              <li><a href="/about" className="hover:text-yellow-400 transition-colors duration-200">About Werewolf Game</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright Info */}
        <motion.p
          className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          © {new Date().getFullYear()} Werewolf Game. All rights reserved. | Developed by [Your Name/Company Name] | Unleash your inner wolf or find the truth!
        </motion.p>
      </div>
    </motion.div>
  );
}
