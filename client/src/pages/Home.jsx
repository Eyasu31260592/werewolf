import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Removed BrowserRouter import as it should be higher in the app tree
import {
  useUser,SignInButton
} from "@clerk/clerk-react";
  
export default function App() {
  const { isSignedIn } = useUser();
  return (
    // Removed Router wrapper as it's causing a nested router error.
    // It's assumed that a BrowserRouter (or similar router) is already
    // wrapping your entire application at a higher level.
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden font-inter">
      {/* Infinite Background Animation Layer */}
      <div className="absolute inset-0 z-0 animate-dark-mist opacity-50"></div>

      {/* Animated Emojis - Adjusted positions and added more for wider coverage */}
      {/* These elements are positioned absolutely and animated to float */}
      <div className="absolute top-[10%] left-[5%] text-6xl opacity-30 animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }}>🌕</div> {/* Full Moon */}
      <div className="absolute top-[25%] right-[8%] text-5xl opacity-25 animate-float" style={{ animationDelay: '1.5s', animationDuration: '9s' }}>🌲</div> {/* Tree */}
      <div className="absolute bottom-[15%] left-[12%] text-4xl opacity-20 animate-float" style={{ animationDelay: '3s', animationDuration: '7s' }}>🐾</div> {/* Paw Print */}
      <div className="absolute top-[40%] left-[20%] text-7xl opacity-35 animate-float" style={{ animationDelay: '0.5s', animationDuration: '8.5s' }}>🐺</div> {/* Wolf */}
      <div className="absolute bottom-[20%] right-[25%] text-5xl opacity-28 animate-float" style={{ animationDelay: '2s', animationDuration: '9.5s' }}>🦇</div> {/* Bat */}
      <div className="absolute top-[5%] right-[20%] text-4xl opacity-22 animate-float" style={{ animationDelay: '4s', animationDuration: '6.5s' }}>👻</div> {/* Ghost */}
      <div className="absolute bottom-[5%] left-[30%] text-6xl opacity-32 animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }}>🌙</div> {/* Crescent Moon */}
      <div className="absolute top-[60%] right-[10%] text-5xl opacity-27 animate-float" style={{ animationDelay: '2.5s', animationDuration: '7.5s' }}>🦉</div> {/* Owl */}
      <div className="absolute top-[70%] left-[5%] text-4xl opacity-20 animate-float" style={{ animationDelay: '3.5s', animationDuration: '9s' }}>🔪</div> {/* Knife */}
      <div className="absolute top-[15%] left-[40%] text-5xl opacity-25 animate-float" style={{ animationDelay: '0.8s', animationDuration: '7.8s' }}>🩸</div> {/* Blood Drop */}
      <div className="absolute bottom-[10%] right-[40%] text-6xl opacity-30 animate-float" style={{ animationDelay: '1.2s', animationDuration: '8.2s' }}>🕯️</div> {/* Candle */}
      <div className="absolute top-[30%] right-[30%] text-4xl opacity-22 animate-float" style={{ animationDelay: '4.5s', animationDuration: '6.8s' }}>☠️</div> {/* Skull */}


      {/* The 'jsx' attribute was removed from the <style> tag as it's specific to styled-jsx and not standard React */}
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

        /* Keyframes for the floating animation - now includes horizontal movement */
        @keyframes float {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(20px, -25px) scale(1.05);
          }
          50% {
            transform: translate(0px, -50px) scale(1.1); /* Moves up more significantly */
          }
          75% {
            transform: translate(-20px, -25px) scale(1.05);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
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
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg text-center leading-tight">
          <span className="text-8xl">🐺</span> Werewolf
        </h1>
        <p className="text-lg md:text-xl text-center max-w-xl mb-10 text-gray-200">
          A social deduction game where lies, strategy, and suspicion rule the night.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">


        {isSignedIn ? 
                     <Link
            to={'/lobby'}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Join Lobby
          </Link>:
                         <SignInButton mode="modal">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                          Join Lobby
                        </button>
                      </SignInButton>
                     }


         
          <Link
            to="/rules"
            className="border-2 border-yellow-400 px-8 py-4 rounded-xl hover:bg-yellow-400 hover:text-black text-yellow-400 font-bold text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            View Rules
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
