import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import watchHeroImg from "../assets/images/watch_hero_1783266750828.jpg";
import watchLifestyleImg from "../assets/images/watch_lifestyle_1783266777068.jpg";

const slides = [
  { id: 1, image: watchHeroImg },
  { id: 2, image: watchLifestyleImg }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    slides.forEach((_, index) => {
      if (index === current) {
        gsap.to(slideRefs.current[index], { opacity: 1, duration: 1.5, zIndex: 10, ease: "power2.inOut" });
      } else {
        gsap.to(slideRefs.current[index], { opacity: 0, duration: 1.5, zIndex: 0, ease: "power2.inOut" });
      }
    });
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#f5f5f5]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={el => slideRefs.current[index] = el}
          className="absolute inset-0 opacity-0"
        >
          <img 
            src={slide.image} 
            alt="Hero Slide" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
      ))}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-500 rounded-full ${index === current ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/70"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
