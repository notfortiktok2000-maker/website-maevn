const fs = require('fs');
const path = './src/pages/Catalogue.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add useEffect import if not there
if (!content.includes('useEffect')) {
  content = content.replace('useRef, useState', 'useRef, useState, useEffect');
}

// Add body scroll lock
const scrollLock = `
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProduct]);
`;

content = content.replace('const [activeImageIndex, setActiveImageIndex] = useState(0);', 'const [activeImageIndex, setActiveImageIndex] = useState(0);' + scrollLock);


// Replace Modal Wrapper
const modalRegex = /<div \s*className="bg-white rounded-2xl w-full max-w-4xl max-h-\[90vh\] flex flex-col md:flex-row overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300"[\s\S]*?onClick=\{e => e\.stopPropagation\(\)\}\s*>/;

const newModalWrapper = `<div 
              className="bg-white rounded-2xl w-[calc(100vw-24px)] md:w-full max-w-4xl max-h-[calc(100dvh-24px)] md:max-h-[90vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              onClick={e => e.stopPropagation()}
            >`;

content = content.replace(modalRegex, newModalWrapper);

// Replace Modal Left Side (Image)
const leftSideRegex = /<div className="w-full md:w-1\/2 bg-\[\#f5f5f5\] shrink-0 h-\[350px\] md:h-auto relative flex flex-col p-4 md:p-8">/;
const newLeftSide = `<div className="w-full md:w-1/2 bg-[#f5f5f5] shrink-0 h-[300px] sm:h-[340px] md:h-auto relative flex flex-col p-4 md:p-8">`;
content = content.replace(leftSideRegex, newLeftSide);

// Replace Modal Right Side
const rightSideRegex = /<div className="w-full md:w-1\/2 p-6 md:p-12 flex flex-col justify-center">/;
const newRightSide = `<div className="w-full md:w-1/2 p-5 sm:p-6 md:p-12 flex flex-col justify-center pb-24 md:pb-12 md:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">`;
content = content.replace(rightSideRegex, newRightSide);

// Replace Title
const titleRegex = /<h2 className="text-2xl md:text-3xl font-medium uppercase tracking-wider mb-4">\{selectedProduct\.name\}<\/h2>/;
const newTitle = `<h2 className="text-[22px] leading-[1.2] sm:text-2xl md:text-3xl font-medium uppercase tracking-wider mb-3 md:mb-4">{selectedProduct.name}</h2>`;
content = content.replace(titleRegex, newTitle);

// Replace price row
const priceRowRegex = /<div className="flex items-center gap-4 mb-6">[\s\S]*?<\/div>/;
const newPriceRow = `<div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 md:mb-6">
                  <span className="text-xl sm:text-2xl font-medium">{selectedProduct.price} DH</span>
                  <span className="text-sm text-gray-400 line-through">{selectedProduct.originalPrice} DH</span>
                  <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-medium">{selectedProduct.discount}</span>
                </div>`;
content = content.replace(priceRowRegex, newPriceRow);


fs.writeFileSync(path, content, 'utf8');
