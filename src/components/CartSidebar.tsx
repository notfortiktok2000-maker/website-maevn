import { useCart } from "../lib/CartContext";
import { X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartSidebar({ isOpen, onClose, onCheckout }: { isOpen: boolean, onClose: () => void, onCheckout: () => void }) {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="font-medium uppercase tracking-[0.2em] text-sm">Mon Panier ({cartCount})</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors w-11 h-11 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
              <p className="text-sm uppercase tracking-wider font-medium">Votre panier est vide</p>
              <Link to="/catalogue" onClick={onClose} className="border border-[#0a0a0a] text-[#0a0a0a] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-[#0a0a0a] hover:text-white transition-colors rounded-full">
                Découvrir nos montres
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border border-gray-100 p-4 rounded-xl relative group">
                <div className="w-20 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                  <img src={item.image} alt={`Miniature montre ${item.name}`} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-medium text-xs uppercase tracking-wider mb-1">{item.name}</h3>
                  <div className="font-medium text-sm mb-3">{item.price} DH</div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-11 h-11 rounded bg-gray-100 flex items-center justify-center font-medium text-sm hover:bg-gray-200 transition-colors">-</button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-11 h-11 rounded bg-gray-100 flex items-center justify-center font-medium text-sm hover:bg-gray-200 transition-colors">+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors rounded-full hover:bg-gray-50"
                  aria-label="Supprimer l'article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-xs uppercase tracking-wider text-gray-500">Total</span>
              <span className="font-medium text-xl">{cartTotal} DH</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full flex items-center justify-center bg-[#0a0a0a] text-white py-4 rounded-full font-medium uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors active:scale-95 transform duration-200"
            >
              Commander
            </button>
          </div>
        )}
      </div>
    </>
  );
}
