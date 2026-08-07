import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Gift } from "lucide-react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only allow access if navigated here with orderSuccess state
    if (!location.state?.orderSuccess) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  useGSAP(() => {
    if (containerRef.current) {
      const icon = containerRef.current.querySelector('.success-icon');
      const elements = containerRef.current.querySelectorAll('.animate-item');
      
      const tl = gsap.timeline();
      
      if (icon) {
        tl.fromTo(icon,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
        );
      }
      
      if (elements.length > 0) {
        tl.fromTo(elements,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "power2.out" },
          "-=0.2"
        );
      }
    }
  }, { scope: containerRef });

  if (!location.state?.orderSuccess) return null;

  return (
    <>
      <Helmet>
        <title>Merci - MAEVN WATCHES</title>
      </Helmet>

      <main className="flex-1 w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 sm:p-6 py-12 md:py-16">
        <div ref={containerRef} className="max-w-xl w-full bg-[#111] border border-white/10 rounded-[24px] p-8 sm:p-12 md:p-14 text-center mx-auto my-auto shadow-2xl">
          <div className="success-icon flex justify-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="animate-item text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-[0.1em] mb-6 text-white">
            Merci pour votre commande !
          </h1>
          
          <p className="animate-item text-gray-300 font-light text-sm md:text-base leading-relaxed mb-10">
            Nous vous contacterons très rapidement par WhatsApp pour confirmer votre commande et valider la livraison.
          </p>
          
          <div className="animate-item bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-10 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-inner">
            <Gift className="w-8 h-8 text-yellow-500 flex-shrink-0" />
            <span className="text-sm md:text-base font-light text-gray-200 text-center sm:text-left">
              Une surprise bonus vous attend à l'ouverture du colis !
            </span>
          </div>
          
          <button 
            onClick={() => navigate('/catalogue')}
            className="animate-item w-full sm:w-auto bg-white text-[#0a0a0a] font-medium py-4 px-10 rounded-full uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors active:scale-95"
          >
            Continuer mes achats
          </button>
        </div>
      </main>
    </>
  );
}
