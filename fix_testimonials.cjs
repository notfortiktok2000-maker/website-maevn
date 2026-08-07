const fs = require('fs');
const path = './src/components/Testimonials.tsx';

let content = fs.readFileSync(path, 'utf8');

const regex = /const firstColumn = testimonials\.slice\(0, 3\);\s*const secondColumn = testimonials\.slice\(3, 6\);\s*const thirdColumn = testimonials\.slice\(6, 9\);/;
content = content.replace(regex, '');

fs.writeFileSync(path, content, 'utf8');
