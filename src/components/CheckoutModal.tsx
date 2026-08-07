import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../lib/CartContext";

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
      );
    }
  }, { dependencies: [isOpen] });

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, { opacity: 0, scale: 0.95, duration: 0.3, onComplete: onClose });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target.nextElementSibling, { width: "100%", backgroundColor: "#3b82f6", duration: 0.3 });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target.nextElementSibling, { width: "100%", backgroundColor: "#333", duration: 0.3 });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const envoyerCommande = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.fullName || !formData.phone || !formData.city || !formData.address) {
      alert("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    try {
      const orderProducts = items.map(item => `${item.name} (x${item.quantity})`).join(', ');

      const { error } = await supabase
        .from('orders')
        .insert([
          {
            nom_complet: formData.fullName,
            telephone: formData.phone,
            ville: formData.city,
            adresse: formData.address,
            produit: orderProducts,
            quantite: items.reduce((acc, item) => acc + item.quantity, 0),
            prix_total: cartTotal,
            statut: "en attente"
          }
        ]);

      if (error) throw error;
      
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: cartTotal,
          currency: 'MAD'
        });
      }
      
      clearCart();
      onClose();
      navigate('/thank-you', { state: { orderSuccess: true } });
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur s'est produite lors de l'envoi de votre commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] rounded-[24px] overflow-hidden flex flex-col shadow-2xl border border-white/10"
      >
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={handleClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col lg:flex-row p-6 md:p-10 gap-10 lg:gap-16">
            
            {/* FORM COLUMN */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-10 text-white/50 font-medium">Détails de livraison</h2>
              
              <form ref={formRef} onSubmit={envoyerCommande} className="space-y-8">
                <div className="relative">
                  <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest font-medium">Nom complet *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-transparent border-none outline-none py-2 text-white text-sm placeholder-white/20 transition-all font-medium"
                    placeholder="Ex: Ahmed Alaoui"
                  />
                  <div className="h-[1px] w-full bg-[#333] absolute bottom-0 left-0 origin-left"></div>
                </div>
                
                <div className="relative">
                  <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest font-medium">Téléphone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-transparent border-none outline-none py-2 text-white text-sm placeholder-white/20 transition-all font-medium"
                    placeholder="06 00 00 00 00"
                    dir="ltr"
                  />
                  <div className="h-[1px] w-full bg-[#333] absolute bottom-0 left-0 origin-left"></div>
                </div>
                
                <div className="relative">
                  <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest font-medium">Ville *</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-transparent border-none outline-none py-2 text-white text-sm placeholder-white/20 transition-all font-medium"
                    placeholder="Casablanca"
                  />
                  <div className="h-[1px] w-full bg-[#333] absolute bottom-0 left-0 origin-left"></div>
                </div>
                
                <div className="relative">
                  <label className="block text-[10px] text-white/40 mb-2 uppercase tracking-widest font-medium">Adresse complète *</label>
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="w-full bg-transparent border-none outline-none py-2 text-white text-sm placeholder-white/20 transition-all font-medium"
                    placeholder="Quartier, Rue, N°"
                  />
                  <div className="h-[1px] w-full bg-[#333] absolute bottom-0 left-0 origin-left"></div>
                </div>
              </form>
            </div>

            {/* SUMMARY COLUMN */}
            <div className="w-full lg:w-1/2 bg-[#111] p-6 md:p-8 rounded-[20px] border border-white/5 flex flex-col">
              <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-8 text-white/50 font-medium">Résumé de la commande</h2>
              
              <div className="space-y-5 flex-1 max-h-[30vh] lg:max-h-auto overflow-y-auto pr-2 custom-scrollbar mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-lighten opacity-90" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-xs mb-1 uppercase tracking-wider text-white">{item.name}</h3>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">Qté: {item.quantity}</p>
                    </div>
                    <div className="text-right text-sm">
                      <span className="font-medium text-white">{item.price * item.quantity} DH</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <div className="h-[1px] w-full bg-white/10 mb-6"></div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">Total à payer</span>
                  <span className="text-2xl md:text-3xl font-medium tracking-tighter text-white">{cartTotal} <span className="text-lg">DH</span></span>
                </div>
                
                <button 
                  onClick={envoyerCommande}
                  disabled={isSubmitting}
                  className="w-full bg-[#3b82f6] text-white font-medium py-4 rounded-[16px] uppercase tracking-[0.15em] text-xs hover:bg-[#2563eb] transition-all disabled:opacity-50 active:scale-95 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)]"
                >
                  {isSubmitting ? "Traitement..." : "Confirmer Ma Commande"}
                </button>
                <p className="text-[9px] text-center mt-4 text-white/30 uppercase tracking-widest">
                  Paiement sécurisé à la livraison
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
