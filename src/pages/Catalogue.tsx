import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../lib/CartContext";
import watchGalleryImg from "../assets/images/watch_gallery_1_1783266764204.jpg";
import watchHeroImg from "../assets/images/watch_hero_1783266750828.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { 
    id: 1, 
    name: "CARTIER SANTOS - CADRAN BLEU", 
    price: 259, 
    originalPrice: 650, 
    image: "https://i.ibb.co/20pL8JRW/Screenshot-2026-07-06-020229-removebg-preview.png", 
    discount: "-60%",
    description: "Design carré élégant, bracelet acier, cadran minimaliste , ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  }
];

export default function Catalogue() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  useGSAP(() => {
    gsap.fromTo(".product-card", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: gridRef });

  const handleProductClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setModalQuantity(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: modalQuantity,
        image: selectedProduct.image
      });
      closeProductModal();
    }
  };

  return (
    <>
      <Helmet>
        <title>Catalogue - MAEVN WATCHES</title>
        <meta name="description" content="Découvrez notre collection complète de montres élégantes MAEVN WATCHES. Promotions jusqu'à -65%." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "image": `https://maevn-watches.com${product.image}`,
                "description": `Montre de luxe ${product.name} par MAEVN WATCHES`,
                "brand": {
                  "@type": "Brand",
                  "name": "MAEVN WATCHES"
                },
                "offers": {
                  "@type": "Offer",
                  "url": "https://maevn-watches.com/catalogue",
                  "priceCurrency": "MAD",
                  "price": product.price.toString(),
                  "availability": "https://schema.org/InStock"
                }
              }
            }))
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white">
        <section className="py-24 md:py-32 bg-white text-[#0a0a0a]" ref={gridRef}>
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-4">Collection Exclusive</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight uppercase">Jusqu'à -65%</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-20">
              {products.map(product => (
                <div key={product.id} className="product-card group cursor-pointer flex flex-col h-full" onClick={() => handleProductClick(product)}>
                  <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-[#f5f5f5] flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={`Montre MAEVN Watches ${product.name} design élégant`} 
                      className="w-full h-full object-contain p-4 md:p-8 transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply"
                    />
                    <div className="absolute top-2 left-2 z-10 bg-white text-[#0a0a0a] text-[8px] md:text-[9px] font-medium px-2.5 py-1 tracking-[0.2em] uppercase rounded-md shadow-sm">
                      Réduction {product.discount}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow text-center px-2">
                    <h3 className="text-sm font-medium mb-2 uppercase tracking-wider">{product.name}</h3>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="font-medium text-sm">{product.price} DH</span>
                      <span className="text-xs text-gray-400 line-through decoration-gray-300">{product.originalPrice} DH</span>
                    </div>
                    <div className="mt-auto">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.image
                          });
                        }}
                        className="w-full bg-[#0a0a0a] text-white text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em] py-3.5 px-4 rounded-xl transition-all duration-300 hover:bg-gray-800 active:scale-95"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeProductModal}>
            <div 
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 bg-[#f5f5f5] shrink-0 h-64 md:h-auto relative flex items-center justify-center p-8">
                <img src={selectedProduct.image} alt={`Montre MAEVN Watches ${selectedProduct.name} en détail`} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">MAEVN WATCHES</div>
                <h2 className="text-2xl md:text-3xl font-medium uppercase tracking-wider mb-4">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-medium">{selectedProduct.price} DH</span>
                  <span className="text-sm text-gray-400 line-through">{selectedProduct.originalPrice} DH</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-medium">{selectedProduct.discount}</span>
                </div>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  {selectedProduct.description || "Design exclusif aux lignes épurées. Une montre intemporelle conçue pour ceux qui apprécient l'élégance minimaliste."}
                </p>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-400">Quantité</span>
                  <div className="flex items-center gap-4 border border-gray-200 rounded-full px-4 py-2">
                    <button onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))} className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-50 rounded-full">-</button>
                    <span className="font-medium w-4 text-center">{modalQuantity}</span>
                    <button onClick={() => setModalQuantity(modalQuantity + 1)} className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-50 rounded-full">+</button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#0a0a0a] text-white py-4 rounded-full font-medium uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors active:scale-95 transform duration-200"
                >
                  Ajouter au Panier
                </button>
                <button 
                  onClick={closeProductModal}
                  className="mt-4 w-full text-gray-400 text-xs font-medium uppercase tracking-wider hover:text-[#0a0a0a] transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
