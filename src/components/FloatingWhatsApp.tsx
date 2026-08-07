import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Hide when checkout is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsHidden(true);
            setIsOpen(false);
          } else {
            setIsHidden(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const checkoutEl = document.getElementById('commande');
    if (checkoutEl) observer.observe(checkoutEl);
    
    // Also use mutation observer in case the element is added later (like in React Router)
    const mutationObserver = new MutationObserver(() => {
      const el = document.getElementById('commande');
      if (el) {
        observer.observe(el);
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">MAEVN WATCHES Support</h4>
                  <p className="text-[10px] text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 bg-[#e5ddd5] h-48 overflow-y-auto">
              <div className="bg-white p-3 rounded-lg rounded-tl-none text-sm text-black shadow-sm inline-block max-w-[85%]">
                Hi there 👋<br/>How can I help you?
                <div className="text-[9px] text-gray-400 text-right mt-1">Just now</div>
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <a 
                href="https://wa.me/212710900502" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white flex justify-center items-center gap-2 py-3 rounded-full font-medium text-sm hover:bg-[#20bd5a] transition-colors"
              >
                <Send className="w-4 h-4" /> Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
}
