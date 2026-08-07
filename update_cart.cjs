const fs = require('fs');
const path = './src/lib/CartContext.tsx';

let content = fs.readFileSync(path, 'utf8');

const regex = /const cartTotal = items\.reduce\(\(total, item\) => total \+ item\.price \* item\.quantity, 0\);/;
const newCalc = `const cartSubtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartDiscount = cartCount >= 2 ? 50 : 0;
  const cartTotal = cartSubtotal - cartDiscount;`;

content = content.replace(regex, newCalc);

content = content.replace('cartTotal: number;', 'cartTotal: number;\n  cartSubtotal: number;\n  cartDiscount: number;');
content = content.replace('cartTotal }}', 'cartTotal, cartSubtotal, cartDiscount }}');

fs.writeFileSync(path, content, 'utf8');
