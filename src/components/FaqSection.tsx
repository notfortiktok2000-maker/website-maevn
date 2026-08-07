import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "motion/react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "La montre ressemble-t-elle vraiment aux photos ?",
    answer: "Oui. Nous faisons en sorte que les photos montrent fidèlement la couleur, la finition et les proportions de la montre. De légères différences peuvent exister selon la lumière ou l’écran utilisé."
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "La livraison prend généralement entre 24 et 72 heures selon votre ville. Certaines régions peuvent nécessiter un délai légèrement plus long."
  },
  {
    question: "Est-ce que vous livrez partout au Maroc ?",
    answer: "Oui, nous livrons dans toutes les villes du Maroc. Votre commande est confirmée avant l’expédition."
  },
  {
    question: "Comment passer une commande ?",
    answer: "Choisissez votre modèle, remplissez vos informations puis confirmez la commande. Notre équipe peut vous contacter par téléphone ou WhatsApp avant l’envoi."
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer: "Le paiement se fait à la livraison. Vous payez uniquement lorsque votre commande arrive."
  },
  {
    question: "Puis-je vérifier le colis avant de payer ?",
    answer: "Cela dépend des conditions du livreur et du service de livraison disponible dans votre ville. Contactez-nous avant de commander pour connaître les modalités exactes."
  },
  {
    question: "Puis-je retourner ou échanger la montre ?",
    answer: "Un échange peut être demandé si le produit reçu présente un défaut ou si une erreur a été faite dans la commande. La montre doit rester inutilisée et dans son emballage d’origine."
  },
  {
    question: "Que contient le colis ?",
    answer: "Le colis contient la montre commandée ainsi que son emballage MAEVN. Les accessoires inclus peuvent varier selon le modèle."
  },
  {
    question: "Comment savoir si la montre conviendra à mon poignet ?",
    answer: "La majorité de nos modèles disposent d’un bracelet réglable. Consultez les dimensions indiquées sur la fiche produit ou contactez-nous pour être conseillé."
  },
  {
    question: "Comment suivre ma commande ?",
    answer: "Après confirmation et expédition, nous pouvons vous transmettre les informations disponibles concernant le suivi de votre livraison."
  },
  {
    question: "Que faire si je me suis trompé dans mon numéro ou mon adresse ?",
    answer: "Contactez-nous rapidement sur WhatsApp avant l’expédition afin que nous puissions corriger vos informations."
  },
  {
    question: "La montre est-elle résistante à l’eau ?",
    answer: "Référez-vous uniquement aux caractéristiques affichées sur la fiche du modèle. Ne présentez pas la montre comme étanche si cette information n’est pas officiellement confirmée."
  }
];

const FaqCard = ({ question, answer }: FaqItem) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="bg-[#171717] border border-white/[0.06] rounded-[8px] md:rounded-[10px] p-[18px] md:p-[20px] shadow-sm hover:border-white/[0.1] transition-colors cursor-pointer md:cursor-default"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-white font-semibold text-[14px] sm:text-[15px] leading-[1.3]">
          {question}
        </h3>
        <div className="md:hidden flex-shrink-0 text-white/50 mt-0.5">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </div>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100'}`}>
        <div className="overflow-hidden">
          <p className="text-[#a1a1aa] text-[12px] sm:text-[13px] leading-[1.55] mt-2 md:mt-2.5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FaqSection() {
  return (
    <section id="faq" className="bg-[#090909] py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-[1180px] mx-auto border border-white/[0.06] rounded-[8px] md:rounded-[10px] p-6 sm:p-10 lg:p-12">
        
        <motion.header 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[520px] mb-12 md:mb-16"
        >
          <h2 className="text-white text-[28px] md:text-[30px] lg:text-[38px] font-medium tracking-tight leading-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-white/65 text-[13px] md:text-[15px] leading-relaxed mb-6">
            Tout ce qu’il faut savoir avant de commander votre montre MAEVN.
            Une autre question ? Contactez-nous directement sur WhatsApp.
          </p>
          <div className="flex flex-col items-start gap-2">
            <a 
              href="https://wa.me/212710900502" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#c7a96b] text-[13px] md:text-[14px] font-medium hover:text-[#d4b475] transition-colors"
            >
              Nous contacter sur WhatsApp
            </a>
            <span className="text-white/40 text-[11px] md:text-[12px]">
              Ma l9itich jawab dyalk ? Sift lina message f WhatsApp.
            </span>
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="columns-1 md:columns-2 lg:columns-3 gap-3 md:gap-4 w-full"
        >
          {faqs.map((faq, i) => (
            <div key={i} className="mb-3 md:mb-4 break-inside-avoid w-full">
              <FaqCard question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
