import {
  TestimonialsColumn,
  type TestimonialItem,
} from "./ui/testimonials-columns-1";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Truck, WalletCards } from "lucide-react";

const testimonials: TestimonialItem[] = [
  {
    text: "Sra7a kent khayef men qualité, walakin fach wslatni l9itha na9iya bzaf. Katban classy f yed w ma hiyach khfifa bzaaf.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    name: "Yassine B.",
    role: "Client vérifié · Casablanca",
    rating: 5,
  },
  {
    text: "La montre est encore plus belle en vrai. Le cadran est propre, la finition est élégante et la livraison était rapide.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
    name: "Mehdi A.",
    role: "Client vérifié · Rabat",
    rating: 5,
  },
  {
    text: "وصلاتني فالوقت والتغليف كان نقي. الساعة كتبان أنيقة وماشي ديال داك الشكل الرخيص لي كيبان غير فالصور.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    name: "Othmane R.",
    role: "عميل مؤكد · طنجة",
    rating: 5,
  },
  {
    text: "Je cherchais une montre simple que je peux porter avec une chemise ou un look plus casual. Elle fait vraiment le travail.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    name: "Amine L.",
    role: "Client vérifié · Marrakech",
    rating: 5,
  },
  {
    text: "Mabghitch nkteb avis 7ta njerrebha chi simana. Ba9a mzyana, bracelet confortable w katkml l-look bla ma tkoun flashy.",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=160&q=80",
    name: "Hamza M.",
    role: "Client vérifié · Agadir",
    rating: 5,
  },
  {
    text: "خديتها كهدية لخوي وعجباتو بزاف. حتى البواطة والتقديم جاو مزيانين، ما احتجتش نبدل حتى حاجة.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&q=80",
    name: "Salma E.",
    role: "عميلة مؤكدة · الدار البيضاء",
    rating: 5,
  },
  {
    text: "Très bon rapport qualité-prix. Elle attire l’attention mais reste discrète, exactement ce que je voulais.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=160&q=80",
    name: "Adam K.",
    role: "Client vérifié · Fès",
    rating: 5,
  },
  {
    text: "F lwel glt momkin tswira kat7ssenha, walakin la. Hta f réalité katban premium, surtout m3a tenue noire.",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=160&q=80",
    name: "Zakaria H.",
    role: "Client vérifié · Kénitra",
    rating: 5,
  },
  {
    text: "الطلب كان ساهل، تاصلوا بيا باش يأكدو، ووصلاتني بلا صداع. هادي هي الحاجة لي عجباتني أكثر.",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=160&q=80",
    name: "Anas T.",
    role: "عميل مؤكد · تطوان",
    rating: 5,
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="avis-clients"
      className="relative overflow-hidden bg-[#080808] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Déjà choisie par plus de 800 clients au Maroc
          </h2>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <TestimonialsColumn
              testimonials={firstColumn}
              duration={15}
            />

            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />

            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
