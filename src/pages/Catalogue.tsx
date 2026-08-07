import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Truck, WalletCards, ShieldCheck } from "lucide-react";
import { useCart } from "../lib/CartContext";
import watchGalleryImg from "../assets/images/watch_gallery_1_1783266764204.jpg";
import watchHeroImg from "../assets/images/watch_hero_1783266750828.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { 
    id: 1, 
    name: "ROLEX DATEJUST – CADRAN BLEU", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/YFxFw5D7/Chat-GPT-Image-Aug-7-2026-04-23-03-PM-7-removebg-preview.png",
      "https://i.ibb.co/rGMn6WNH/Chat-GPT-Image-Aug-7-2026-05-31-05-PM-6.png"
    ],
    discount: "-60%",
    description: "Design carré élégant, bracelet acier, cadran minimaliste , ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 2, 
    name: "G-SHOCK TRANSPARENT", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/Ldxg4KCb/Chat-GPT-Image-Aug-7-2026-04-26-32-PM-6-removebg-preview.png",
      "https://i.ibb.co/ks410TB7/Chat-GPT-Image-Aug-7-2026-05-31-04-PM-1.png",
      "https://i.ibb.co/hR3PRvSd/Chat-GPT-Image-Aug-7-2026-07-22-56-PM-2.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 3, 
    name: "ROLEX LAND-DWELLER – TIFFANY BLUE", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/G4FKsdfs/Chat-GPT-Image-Aug-7-2026-04-26-30-PM-1-removebg-preview.png",
      "https://i.ibb.co/sdTKqsCq/Chat-GPT-Image-Aug-7-2026-05-31-05-PM-4.png",
      "https://i.ibb.co/mVRbPfdQ/Chat-GPT-Image-Aug-7-2026-07-22-56-PM-3.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 4, 
    name: "POEDAGAR – CADRAN NOIR", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/XcGZ616/Chat-GPT-Image-Aug-7-2026-04-26-30-PM-2-removebg-preview.png",
      "https://i.ibb.co/LXCNjpsz/Chat-GPT-Image-Aug-7-2026-05-31-04-PM-2.png",
      "https://i.ibb.co/6RbMyjwP/Chat-GPT-Image-Aug-7-2026-07-22-57-PM-4.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 5, 
    name: "POEDAGAR – BLACK & ROSE GOLD", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/YFCP2W5S/Chat-GPT-Image-Aug-7-2026-04-26-31-PM-3-removebg-preview.png",
      "https://i.ibb.co/Pvmm2KQP/Chat-GPT-Image-Aug-7-2026-05-31-04-PM-3.png",
      "https://i.ibb.co/5hP9H6RJ/Chat-GPT-Image-Aug-7-2026-07-22-57-PM-5.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 6, 
    name: "ROLEX – CADRAN BLANC", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/8ggWxRFp/Chat-GPT-Image-Aug-7-2026-04-23-04-PM-8-removebg-preview.png",
      "https://i.ibb.co/JRYSLc8Z/Chat-GPT-Image-Aug-7-2026-05-31-06-PM-7.png",
      "https://i.ibb.co/G34xnwPT/Chat-GPT-Image-Aug-7-2026-07-22-58-PM-6.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 7, 
    name: "HUBLOT BIG BANG UNICO – BLEU", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/ns1KLWd9/Chat-GPT-Image-Aug-7-2026-04-23-01-PM-3-removebg-preview.png",
      "https://i.ibb.co/zVRwh1w1/Chat-GPT-Image-Aug-7-2026-05-31-07-PM-10.png",
      "https://i.ibb.co/v6H9WnnP/Chat-GPT-Image-Aug-7-2026-07-22-58-PM-7.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 8, 
    name: "HUBLOT BIG BANG – GREY SKELETON", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/dwcSpjtK/Chat-GPT-Image-Aug-7-2026-04-23-02-PM-4-removebg-preview.png",
      "https://i.ibb.co/0ysTznQ2/Chat-GPT-Image-Aug-7-2026-05-31-06-PM-8.png",
      "https://i.ibb.co/YBfrr3kQ/Chat-GPT-Image-Aug-7-2026-07-22-59-PM-8.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 9, 
    name: "OMEGA SEAMASTER – CADRAN NOIR", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/rgZBXkT/Chat-GPT-Image-Aug-7-2026-04-23-02-PM-5-removebg-preview.png",
      "https://i.ibb.co/39w0nMbp/Chat-GPT-Image-Aug-7-2026-05-31-07-PM-9.png",
      "https://i.ibb.co/x8Mqw68V/Chat-GPT-Image-Aug-7-2026-07-22-59-PM-9.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 10, 
    name: "OMEGA AQUA TERRA – CADRAN BLEU", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/JFtvvrHf/Chat-GPT-Image-Aug-7-2026-04-23-03-PM-6-removebg-preview.png",
      "https://i.ibb.co/GQGzbhR9/Chat-GPT-Image-Aug-7-2026-05-31-05-PM-5.png",
      "https://i.ibb.co/HL6gP02j/Chat-GPT-Image-Aug-7-2026-07-23-00-PM-10.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 11, 
    name: "PATEK PHILIPPE NAUTILUS – CADRAN NOIR", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/qLy7Mp23/Chat-GPT-Image-Aug-7-2026-04-23-00-PM-1-removebg-preview.png",
      "https://i.ibb.co/FL3p2grh/Chat-GPT-Image-Aug-7-2026-05-36-07-PM-2.png",
      "https://i.ibb.co/WpGNrf2j/Chat-GPT-Image-Aug-7-2026-07-26-03-PM-1.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 12, 
    name: "HUBLOT BIG BANG SKELETON – BLEU", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/n80hN5Wx/Chat-GPT-Image-Aug-7-2026-04-23-01-PM-2-removebg-preview.png",
      "https://i.ibb.co/zT73qYjq/Chat-GPT-Image-Aug-7-2026-05-36-08-PM-3.png",
      "https://i.ibb.co/svkKPrBn/Chat-GPT-Image-Aug-7-2026-07-26-04-PM-2.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  },
  { 
    id: 13, 
    name: "CARTIER SANTOS – CADRAN BLANC", 
    price: 259, 
    originalPrice: 650, 
    images: [
      "https://i.ibb.co/wqYW1hd/Chat-GPT-Image-Aug-7-2026-04-22-52-PM-removebg-preview.png",
      "https://i.ibb.co/tMGYgDLt/Chat-GPT-Image-Aug-7-2026-05-36-07-PM-1.png",
      "https://i.ibb.co/h1hCxwBp/Chat-GPT-Image-Aug-7-2026-07-26-04-PM-3.png"
    ],
    discount: "-60%",
    description: "Design élégant, finitions soignées. La montre parfaite pour sublimer votre style au quotidien. ET LIVRAISON GRATUITE PARTOUT AU MAROC"
  }
];

export default function Catalogue() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<1 | 2>(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProduct]);


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
    setSelectedBundle(1);
    setActiveImageIndex(0);
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
        image: selectedProduct.images[0]
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
                "image": `https://maevn-watches.com${product.images[0]}`,
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
                      src={product.images[0]} 
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
                            image: product.images[0]
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
              className="bg-white rounded-2xl w-[calc(100vw-24px)] md:w-full max-w-4xl max-h-[calc(100dvh-24px)] md:max-h-[90vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 bg-[#f5f5f5] shrink-0 relative flex flex-col p-4 md:p-8">
                <div className="relative flex items-center justify-center mb-4 h-[240px] sm:h-[300px] md:h-full md:min-h-[400px]">
                  <img 
                    src={selectedProduct.images[activeImageIndex]} 
                    alt={`Montre MAEVN Watches ${selectedProduct.name} en détail`} 
                    className={`w-full h-full mix-blend-multiply object-contain rounded-lg`} 
                  />
                </div>
                <div className="flex justify-center gap-3">
                  {selectedProduct.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${activeImageIndex === idx ? 'border-[#0a0a0a]' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={img} alt="" className={`w-full h-full mix-blend-multiply object-contain bg-white rounded-sm`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-12 flex flex-col justify-center pb-24 md:pb-12 md:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">MAEVN WATCHES</div>
                <h2 className="text-[22px] leading-[1.2] sm:text-2xl md:text-3xl font-medium uppercase tracking-wider mb-3 md:mb-4">{selectedProduct.name}</h2>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 md:mb-6">
                  <span className="text-xl sm:text-2xl font-medium">{selectedProduct.price} DH</span>
                  <span className="text-sm text-gray-400 line-through">{selectedProduct.originalPrice} DH</span>
                  <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-medium">{selectedProduct.discount}</span>
                </div>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  {selectedProduct.description || "Design exclusif aux lignes épurées. Une montre intemporelle conçue pour ceux qui apprécient l'élégance minimaliste."}
                </p>
                
                <div className="flex flex-col gap-3 mb-6">
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-1">Choisissez votre offre</div>
                  
                  <label onClick={() => setSelectedBundle(1)} className={`cursor-pointer flex flex-col p-4 rounded-xl border-2 transition-all ${selectedBundle === 1 ? 'border-[#0a0a0a] bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBundle === 1 ? 'border-[#0a0a0a]' : 'border-gray-300'}`}>
                          {selectedBundle === 1 && <div className="w-2 h-2 bg-[#0a0a0a] rounded-full" />}
                        </div>
                        <span className="font-medium text-sm">1 MONTRE</span>
                      </div>
                      <span className="font-medium">{selectedProduct.price} DH</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 ml-7">Livraison offerte partout au Maroc</div>
                  </label>

                  <label onClick={() => setSelectedBundle(2)} className={`cursor-pointer flex flex-col p-4 rounded-xl border-2 transition-all relative ${selectedBundle === 2 ? 'border-[#0a0a0a] bg-green-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className="absolute -top-2.5 right-4 bg-[#0a0a0a] text-white text-[9px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Meilleure offre
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBundle === 2 ? 'border-[#0a0a0a]' : 'border-gray-300'}`}>
                          {selectedBundle === 2 && <div className="w-2 h-2 bg-[#0a0a0a] rounded-full" />}
                        </div>
                        <span className="font-medium text-sm">2 MONTRES</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="font-medium">{selectedProduct.price * 2 - 50} DH</span>
                         <span className="text-[10px] text-gray-400 line-through">{selectedProduct.price * 2} DH</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-green-600 font-medium mt-1 ml-7">Économisez 50 DH + Livraison offerte</div>
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-[#0a0a0a] text-white py-4 rounded-full font-medium uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-colors active:scale-95 transform duration-200 shadow-lg shadow-black/10"
                  >
                    Ajouter au Panier
                  </button>
                  
                  <div className="text-center">
                    <p className="text-[11px] text-gray-500">
                      {selectedBundle === 2 ? "Vous économisez 50 DH sur cette commande." : "Livraison offerte partout au Maroc."}
                    </p>
                  </div>

                  <div className="flex items-start justify-between gap-2 mt-2 pt-4 border-t border-gray-100">
                    <div className="flex flex-col items-center flex-1 text-center gap-1.5">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 leading-tight">Livraison<br/>Offerte</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 text-center gap-1.5">
                      <WalletCards className="w-4 h-4 text-gray-600" />
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 leading-tight">Paiement à<br/>la livraison</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 text-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-gray-600" />
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 leading-tight">Garantie<br/>Qualité</span>
                    </div>
                  </div>
                </div>
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
