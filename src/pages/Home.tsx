import { Helmet } from "react-helmet-async";
import HeroCarousel from "../components/HeroCarousel";
import Testimonials from "../components/Testimonials";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { Link } from "react-router-dom";
import watchHeroImg from "../assets/images/watch_hero_1783266750828.jpg";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MAEVN WATCHES - Montres élégantes au Maroc | Livraison rapide</title>
        <meta name="description" content="Découvrez MAEVN WATCHES. Des montres élégantes avec livraison rapide partout au Maroc." />
      </Helmet>
      
      <main>
        <HeroCarousel />
        
        <Testimonials />

        <FaqSection />

        <section className="py-24 md:py-32 bg-[#fafafa] text-[#0a0a0a]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
              <div className="w-full md:w-1/2">
                <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400 mb-4">L'Art de l'Horlogerie</h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight uppercase mb-8">Notre Histoire</h3>
                <div className="w-12 h-1 bg-[#0a0a0a] mb-8"></div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Chez MAEVN WATCHES, nous croyons que l'élégance réside dans la simplicité. Née de la passion pour l'horlogerie minimaliste, notre marque s'engage à proposer des pièces intemporelles qui subliment le poignet avec discrétion et raffinement.
                </p>
                <p className="text-gray-600 leading-relaxed mb-10">
                  Chaque détail de nos montres est pensé avec précision : du cadran épuré au choix des matériaux, pour créer un design distinctif qui vous accompagne aussi bien au quotidien que lors de vos moments d'exception.
                </p>
                <Link to="/catalogue" className="inline-block bg-[#0a0a0a] text-white px-10 py-4 text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors duration-300 rounded-full">
                  Découvrir la collection
                </Link>
              </div>
              <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden relative group">
                <img src={watchHeroImg} alt="L'histoire MAEVN Watches" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 mix-blend-multiply grayscale" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
