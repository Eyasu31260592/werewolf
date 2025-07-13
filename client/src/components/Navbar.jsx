import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
  SignInButton,
  SignIn
} from "@clerk/clerk-react";
import { SignIn as SignInModal } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { isSignedIn } = useUser();



  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-4 shadow-md relative z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wider">🐺 Werewolf</div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center">
            <a href="/" className="hover:text-yellow-400 transition">Home</a>
            {isSignedIn ? 
            <Link to={'/lobby'} className="hover:text-yellow-400 transition">Join Lobby</Link>:
                 <SignInButton mode="modal">
                <button className="hover:text-yellow-400 transition">
                  Join Lobby
                </button>
              </SignInButton>
             }
            <a href="/rules" className="hover:text-yellow-400 transition">Rules</a>
            <a href="/about" className="hover:text-yellow-400 transition">About</a>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-yellow-500 text-black px-4 py-1.5 rounded hover:bg-yellow-400 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 px-4 space-y-3">
            <a href="/" className="block w-full hover:text-yellow-400">Home</a>
            {isSignedIn ? 
            <Link to={'/lobby'} className="block w-full text-left hover:text-yellow-400">Join Lobby</Link>:
                 <SignInButton mode="modal">
                <button className="block w-full text-left hover:text-yellow-400">
                  Join Lobby
                </button>
              </SignInButton>
             }
            <a href="/rules" className="block w-full hover:text-yellow-400">Rules</a>
            <a href="/about" className="block w-full hover:text-yellow-400">About</a>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full text-left bg-yellow-500 text-black px-4 py-1.5 rounded hover:bg-yellow-400">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        )}
      </nav>

      {/* Clerk Sign-In Modal */}
      {showSignIn && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 relative">
      
      {/* Close (X) button top-right */}
      <button
  onClick={() => setShowSignIn(false)}
  aria-label="Close sign-in modal"
  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none text-2xl font-bold"
>
  &times;
</button>

      <SignIn
        afterSignInUrl="/lobby"
        appearance={{
          elements: {
            card: "shadow-none"
          }
        }}
      />
  </div>
)}


    </>
  );
};

export default Navbar;
