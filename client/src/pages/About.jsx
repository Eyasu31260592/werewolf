import { motion } from "framer-motion";

export default function About() {
  return (
    // Main container with relative positioning for absolute background
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden font-inter">
      {/* Infinite Background Animation Layer */}
      <div className="absolute inset-0 z-0 animate-dark-mist opacity-50"></div>

      {/* Animated Emojis - Adjusted positions, added more, and varied animations for wider coverage */}
      {/* These elements are positioned absolutely and animated to float and subtly rotate */}
      <div className="absolute top-[10%] left-[5%] text-6xl opacity-30 animate-float-rotate" style={{ animationDelay: '0s', animationDuration: '8s' }}>🌕</div> {/* Full Moon */}
      <div className="absolute top-[25%] right-[8%] text-5xl opacity-25 animate-float-rotate" style={{ animationDelay: '1.5s', animationDuration: '9s' }}>🌲</div> {/* Tree */}
      <div className="absolute bottom-[15%] left-[12%] text-4xl opacity-20 animate-float-rotate" style={{ animationDelay: '3s', animationDuration: '7s' }}>🐾</div> {/* Paw Print */}
      <div className="absolute top-[40%] left-[20%] text-7xl opacity-35 animate-float-rotate" style={{ animationDelay: '0.5s', animationDuration: '8.5s' }}>🐺</div> {/* Wolf */}
      <div className="absolute bottom-[20%] right-[25%] text-5xl opacity-28 animate-float-rotate" style={{ animationDelay: '2s', animationDuration: '9.5s' }}>🦇</div> {/* Bat */}
      <div className="absolute top-[5%] right-[20%] text-4xl opacity-22 animate-float-rotate" style={{ animationDelay: '4s', animationDuration: '6.5s' }}>👻</div> {/* Ghost */}
      <div className="absolute bottom-[5%] left-[30%] text-6xl opacity-32 animate-float-rotate" style={{ animationDelay: '1s', animationDuration: '8s' }}>🌙</div> {/* Crescent Moon */}
      <div className="absolute top-[60%] right-[10%] text-5xl opacity-27 animate-float-rotate" style={{ animationDelay: '2.5s', animationDuration: '7.5s' }}>🦉</div> {/* Owl */}
      <div className="absolute top-[70%] left-[5%] text-4xl opacity-20 animate-float-rotate" style={{ animationDelay: '3.5s', animationDuration: '9s' }}>🔪</div> {/* Knife */}
      <div className="absolute top-[15%] left-[40%] text-5xl opacity-25 animate-float-rotate" style={{ animationDelay: '0.8s', animationDuration: '7.8s' }}>🩸</div> {/* Blood Drop */}
      <div className="absolute bottom-[10%] right-[40%] text-6xl opacity-30 animate-float-rotate" style={{ animationDelay: '1.2s', animationDuration: '8.2s' }}>🕯️</div> {/* Candle */}
      <div className="absolute top-[30%] right-[30%] text-4xl opacity-22 animate-float-rotate" style={{ animationDelay: '4.5s', animationDuration: '6.8s' }}>☠️</div> {/* Skull */}
      {/* Emojis specific to the "About" page, focusing on development/game aspects and the story */}
      <div className="absolute top-[50%] left-[5%] text-5xl opacity-25 animate-float-rotate" style={{ animationDelay: '1.8s', animationDuration: '10s' }}>💻</div> {/* Computer/Development */}
      <div className="absolute bottom-[25%] left-[40%] text-4xl opacity-20 animate-float-rotate" style={{ animationDelay: '3.2s', animationDuration: '7.2s' }}>⚙️</div> {/* Gear/Settings/Tech */}
      <div className="absolute top-[20%] right-[5%] text-6xl opacity-30 animate-float-rotate" style={{ animationDelay: '0.3s', animationDuration: '8.5s' }}>🎮</div> {/* Game Controller */}
      <div className="absolute bottom-[5%] right-[5%] text-5xl opacity-28 animate-float-rotate" style={{ animationDelay: '2.7s', animationDuration: '9.8s' }}>✨</div> {/* Sparkle/Quality */}
      <div className="absolute top-[80%] left-[20%] text-4xl opacity-20 animate-float-rotate" style={{ animationDelay: '4.2s', animationDuration: '7.5s' }}>🃏</div> {/* Playing Card (for physical game) */}
      <div className="absolute top-[20%] left-[60%] text-5xl opacity-25 animate-float-rotate" style={{ animationDelay: '1s', animationDuration: '8.8s' }}>🤯</div> {/* Mind Blown/Chaos */}
      <div className="absolute bottom-[30%] right-[15%] text-4xl opacity-22 animate-float-rotate" style={{ animationDelay: '2.3s', animationDuration: '6.9s' }}>😩</div> {/* Frustration/Pain */}
      <div className="absolute top-[45%] right-[5%] text-6xl opacity-30 animate-float-rotate" style={{ animationDelay: '0.7s', animationDuration: '9.3s' }}>🥳</div> {/* Celebration/Ease */}


      <style>{`
        /* Custom CSS for the infinite background animation */
        @keyframes dark-mist {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .animate-dark-mist {
          background: linear-gradient(
            -45deg,
            #1a1a1a,
            #2c2c2c,
            #1a1a1a,
            #3a3a3a
          );
          background-size: 400% 400%;
          animation: dark-mist 40s ease infinite; /* Faster animation */
        }

        /* Keyframes for the floating and rotating animation */
        @keyframes float-rotate {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(20px, -25px) scale(1.05) rotate(5deg);
          }
          50% {
            transform: translate(0px, -50px) scale(1.1) rotate(-5deg); /* Moves up more significantly and rotates */
          }
          75% {
            transform: translate(-20px, -25px) scale(1.05) rotate(5deg);
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
        }

        .animate-float-rotate {
          animation: float-rotate ease-in-out infinite;
          filter: blur(1px); /* Slightly blur the emojis to make them background elements */
        }

        /* Ensure Inter font is used - You should also add this link in your main HTML file's <head> section:
           <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet">
        */
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Content Layer - positioned above the background animation */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-8 text-center drop-shadow-lg">
          <span className="text-7xl">📖</span> Our Story
        </h2>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-12 text-gray-200 leading-relaxed">
          From the chaotic charm of physical cards to a seamless digital experience: discover why we built the Werewolf Game.
        </p>

        <div className="max-w-5xl w-full flex flex-col items-center gap-16 px-4">

          {/* Section 1: The Genesis of Chaos */}
          <motion.section
            className="relative bg-gray-800 bg-opacity-70 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.02] hover:border-yellow-500"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -top-6 -left-6 bg-yellow-500 p-4 rounded-full shadow-lg text-black text-4xl">💡</div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 pl-12">The Genesis of Chaos</h3>
            <p className="text-gray-100 leading-relaxed text-lg">
              Before this digital realm, our Werewolf games were a delightful, yet utterly chaotic, affair. Imagine: a physical deck of cards, a chosen host (often our dear friend Jojo), painstakingly assigning roles, counting players, and navigating a room to hand out cards. It was a true "pain on the nick" for the host, a test of patience amidst the raw excitement! The constant shuffling, the lost cards, the endless "who has what role?" questions – it was a beautiful mess, but a mess nonetheless.
            </p>
          </motion.section>

          {/* Section 2: The Digital Transformation */}
          <motion.section
            className="relative bg-gray-800 bg-opacity-70 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl md:self-end transform transition-all duration-300 hover:scale-[1.02] hover:border-yellow-500"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -top-6 -right-6 bg-yellow-500 p-4 rounded-full shadow-lg text-black text-4xl">🚀</div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 pr-12 text-right">The Digital Transformation</h3>
            <p className="text-gray-100 leading-relaxed text-lg text-right">
              That's precisely where the idea for this app was born. We envisioned a world where the thrilling deception and deduction of Werewolf could be enjoyed without the logistical headaches. No more card counting, no more shouting over each other, and most importantly, no more "pain on the nick" hosting duties for Jojo! This project is a testament to transforming that manual mayhem into a smooth, intuitive, and engaging online experience for everyone, everywhere.
            </p>
          </motion.section>

          {/* Section 3: Our Vision Realized */}
          <motion.section
            className="relative bg-gray-800 bg-opacity-70 p-8 md:p-12 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.02] hover:border-yellow-500"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -top-6 -left-6 bg-yellow-500 p-4 rounded-full shadow-lg text-black text-4xl">✨</div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 pl-12">Our Vision Realized</h3>
            <p className="text-gray-100 leading-relaxed text-lg">
              This multiplayer social deduction game, built with the robust MERN stack and secured with Clerk authentication, simulates a town haunted by werewolves, where players must use logic and bluffing to win. It features distinct Day and Night phases, real-time interactions, and a variety of exciting roles like the cunning Werewolf, the insightful Seer, and the steadfast Villager. We've meticulously optimized it for speed, performance, and, most importantly, pure, unadulterated fun, ensuring the only chaos is in the game itself!
            </p>
          </motion.section>
        </div>

        {/* Developer Info */}
        <motion.div
          className="pt-16 text-center max-w-3xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-yellow-300 font-semibold text-xl mb-2">Crafted with Passion by Eyassu Betru</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Werewolf Game — All rights reserved. | Powered by the spirit of friendly competition and a desire for less chaos!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
