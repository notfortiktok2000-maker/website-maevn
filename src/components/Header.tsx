import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../lib/CartContext";
import CartSidebar from "./CartSidebar";
import CheckoutModal from "./CheckoutModal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleCheckoutOpen = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <header className="w-full bg-white z-40 relative">
        <div className="bg-[#0a0a0a] text-white text-center py-2 text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase">
          Livraison Gratuite Aujourd'hui
        </div>
        <div className="container mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-col items-center relative">
          <div className="w-full flex justify-between items-center md:absolute md:top-8 md:w-auto md:right-6">
            <button className="md:hidden hover:opacity-60 transition-opacity w-11 h-11 flex items-center justify-center -ml-2" onClick={toggleMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <Link to="/" className="md:hidden block bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-3">
              <img src="https://i.ibb.co/t15fM7q/Maevn-watches-minimalistic-logo-2-K-202607060217.jpg" alt="MAEVN WATCHES" className="h-6 sm:h-8 object-contain" />
            </Link>

            <div className="flex gap-2 md:gap-5 text-[#0a0a0a]">
              <button className="hover:opacity-60 transition-opacity hidden md:flex items-center justify-center w-11 h-11"><Search className="w-5 h-5" /></button>
              <button onClick={() => setIsCartOpen(true)} className="relative hover:opacity-60 transition-opacity w-11 h-11 flex items-center justify-center -mr-2 md:mr-0">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#0a0a0a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <Link to="/" className="hidden md:block bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 mb-6 md:mb-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow">
            <img src="https://i.ibb.co/t15fM7q/Maevn-watches-minimalistic-logo-2-K-202607060217.jpg" alt="MAEVN WATCHES" className="h-[40px] object-contain" />
          </Link>
          
          <nav className={`md:flex flex-col md:flex-row gap-4 md:gap-12 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-gray-400 absolute md:static top-full left-0 w-full md:w-auto bg-white p-6 md:p-0 shadow-xl md:shadow-none transition-all duration-300 z-50 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
            <Link to="/" onClick={closeMenu} className={`${location.pathname === '/' ? 'text-[#0a0a0a]' : 'hover:text-[#0a0a0a]'} transition-colors py-3 md:py-0`}>Home</Link>
            <Link to="/catalogue" onClick={closeMenu} className={`${location.pathname === '/catalogue' ? 'text-[#0a0a0a]' : 'hover:text-[#0a0a0a]'} transition-colors py-3 md:py-0`}>Catalogue</Link>
            <a href="#contact" onClick={closeMenu} className="hover:text-[#0a0a0a] transition-colors py-3 md:py-0">Contact</a>
          </nav>
        </div>
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckoutOpen} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
