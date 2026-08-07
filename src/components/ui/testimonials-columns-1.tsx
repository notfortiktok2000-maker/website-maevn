"use client";

import React from "react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 18,
}: TestimonialsColumnProps) => {
  return (
    <div className={className}>
      <div
        className={`flex flex-col gap-6 pb-6 animate-marquee-vertical`}
        style={{ '--duration': `${duration || 18}s` } as React.CSSProperties}
      >
        {[0, 1].map((copyIndex) => (
          <React.Fragment key={copyIndex}>
            {testimonials.map(
              ({ text, image, name, role, rating = 5 }, index) => (
                <article
                  key={`${copyIndex}-${index}`}
                  className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_15px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="mb-4 flex gap-1 text-sm text-[#c7a96b]"
                    aria-label={`${rating} étoiles sur 5`}
                  >
                    {Array.from({ length: rating }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>

                  <p className="text-sm leading-7 text-white/80 sm:text-[15px]">
                    “{text}”
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <img
                      width={44}
                      height={44}
                      src={image}
                      alt={`Photo de ${name}`}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-white/15"
                    />

                    <div className="flex flex-col">
                      <p className="text-sm font-medium tracking-wide text-white">
                        {name}
                      </p>

                      <p className="text-xs text-white/45">
                        {role}
                      </p>
                    </div>
                  </div>
                </article>
              )
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
