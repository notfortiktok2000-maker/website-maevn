const fs = require('fs');
const path = './src/components/Testimonials.tsx';

let content = fs.readFileSync(path, 'utf8');

const newTestimonials = `const testimonials: TestimonialItem[] = [
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
  {
    text: "J'ai commandé le modèle cadran bleu et je suis bluffé par les détails. Recommande vivement à ceux qui aiment les belles montres.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80",
    name: "Kamal D.",
    role: "Client vérifié · Meknès",
    rating: 5,
  },
  {
    text: "Livraison 24h kifma galo. W lbacging dyalha zwin bzaf. Merci l'équipe MAEVN.",
    image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=160&q=80",
    name: "Rida M.",
    role: "Client vérifié · Oujda",
    rating: 5,
  },
  {
    text: "Franchement, top ! Rien à dire sur la qualité du métal et le fermoir est très solide.",
    image: "https://images.unsplash.com/photo-1544168190-79c154273140?auto=format&fit=crop&w=160&q=80",
    name: "Younes S.",
    role: "Client vérifié · Safi",
    rating: 5,
  },
  {
    text: "عجبتني بزاف، خصوصا أني قدرت نتأكد منها قبل ما نخلص. خدمة ممتازة.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=160&q=80",
    name: "Imad B.",
    role: "عميل مؤكد · سلا",
    rating: 5,
  },
  {
    text: "Chic et minimaliste. Se porte aussi bien en costume qu'en t-shirt. Très satisfait de mon achat.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    name: "Badr O.",
    role: "Client vérifié · Casablanca",
    rating: 5,
  },
  {
    text: "Mzyana l taman dyalha, jatni b7al les montres li kayswaw kter bzaf.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    name: "Omar K.",
    role: "Client vérifié · Mohammedia",
    rating: 5,
  },
  {
    text: "اللون ديالها ما كيتغيرش واخا كنستعملها بزاف. جودة واعرة صراحة.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=160&q=80",
    name: "Jawad N.",
    role: "عميل مؤكد · أكادير",
    rating: 5,
  },
  {
    text: "Service client à l'écoute et très réactif sur WhatsApp. J'ai eu toutes les réponses à mes questions.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    name: "Taha L.",
    role: "Client vérifié · Marrakech",
    rating: 5,
  },
  {
    text: "Zuwina bzaf f l'bsa w poids dyalha howa hadak, kat7ess biha montre de qualité.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80",
    name: "Ilyass A.",
    role: "Client vérifié · Tanger",
    rating: 5,
  },
  {
    text: "C'est ma deuxième commande chez MAEVN et toujours aussi satisfait. Le modèle skeleton est magnifique.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    name: "Sami F.",
    role: "Client vérifié · Rabat",
    rating: 5,
  },
  {
    text: "الساعة كتحمق فلبستها وزادتني ثقة. التوصيل كان فالموعد. شكرا.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    name: "Tarik H.",
    role: "عميل مؤكد · فاس",
    rating: 5,
  }
];

const mobileTestimonials = testimonials; // All 20 for mobile
const firstColumn = testimonials.slice(0, 7);
const secondColumn = testimonials.slice(7, 14);
const thirdColumn = testimonials.slice(14, 21);`;

const regex = /const testimonials: TestimonialItem\[\] = \[(?:[^\]]|\](?!\s*;))*\s*\];\s*const firstColumn = testimonials\.slice\([\s\S]*?testimonials\.slice\(.*?\);/;
content = content.replace(regex, newTestimonials);

const columnsRegex = /<div className="flex justify-center gap-6 mt-10 max-h-\[740px\] overflow-hidden \[mask-image:linear-gradient\(to_bottom,transparent,black_20%,black_80%,transparent\)\]">[\s\S]*?<\/div>/;
const newColumns = `<div className="flex justify-center gap-6 mt-10 max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <TestimonialsColumn
              testimonials={mobileTestimonials}
              className="md:hidden"
              duration={35}
            />
            <TestimonialsColumn
              testimonials={firstColumn}
              className="hidden md:block"
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
        </div>`;

content = content.replace(columnsRegex, newColumns);

fs.writeFileSync(path, content, 'utf8');
