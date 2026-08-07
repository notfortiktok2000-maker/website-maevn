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
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[60] font-sans">
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
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
}
