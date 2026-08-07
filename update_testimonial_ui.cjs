const fs = require('fs');
const path = './src/components/ui/testimonials-columns-1.tsx';

let content = fs.readFileSync(path, 'utf8');

// Replace motion.div with normal div and apply CSS animation
const motionRegex = /<motion\.div\s*animate=\{\{[\s\S]*?className="flex flex-col gap-6 pb-6"\s*>/;

const newDiv = `<div
        className={\`flex flex-col gap-6 pb-6 \${prefersReducedMotion ? '' : 'animate-marquee-vertical'}\`}
        style={{ '--duration': \`\${duration || 18}s\` } as React.CSSProperties}
      >`;

content = content.replace(motionRegex, newDiv);
content = content.replace(/<\/motion\.div>/, '</div>');

// Remove import { motion } if not used elsewhere in this file
// actually, it might be safer to leave it or remove it.
content = content.replace(/import \{ motion, useReducedMotion \} from "motion\/react";/, 'import { useReducedMotion } from "motion/react";');

fs.writeFileSync(path, content, 'utf8');
