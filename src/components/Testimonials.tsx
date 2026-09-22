"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    quote:
      "Natalie does such an amazing job — I couldn't ask for a better outcome on my beautiful brows! Plus she's filled with tons of knowledge she loves to share!",
    name: "Kirstyn Siegard",
  },
  {
    quote:
      "Anyone with eyebrows should RUN not walk to see Natalie at Skin Studio! I have never had such amazing brows! Best service I have received in the area!",
    name: "Emily Lynne",
  },
  {
    quote:
      "The atmosphere is extremely cozy and the treatment was better than I could've gotten at any local spa! Two days later, my husband said 'Your face looks different! Your cheeks and forehead look really smooth!'",
    name: "Julie Curcio",
  },
  {
    quote:
      "I got a microdermabrasion and it was above and beyond my expectations! I've had many facials before and this was the best yet. Natalie is talented, professional and knowledgeable about her work.",
    name: "Christi Pritchard",
  },
  {
    quote:
      "Thank you Natalie for always providing excellent affordable service. Ladies, she's the best. I highly recommend her if you are looking for an esthetician. She is on top of her game!",
    name: "Kimberly Noftell",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="testimonials"
      className="bg-dark-deep py-28 md:py-36 lg:py-44"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 text-center md:mb-20">
          <SectionLabel text="Client Stories" align="center" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-serif text-4xl md:text-5xl lg:text-6xl"
          >
            Loved by Our{" "}
            <span className="heading-serif-italic">Clients.</span>
          </motion.h2>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10">
            <span className="heading-serif text-[80px] leading-none text-rose/20 md:text-[120px]">
              &ldquo;
            </span>
          </div>

          <div className="relative min-h-[200px] md:min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="heading-serif mb-8 text-xl leading-relaxed text-ivory md:text-2xl lg:text-[28px] lg:leading-[1.6]">
                  {testimonials[current].quote}
                </p>
                <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-rose">
                  {testimonials[current].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-body-muted transition-all duration-300 hover:border-rose/40 hover:text-ivory"
              aria-label="Previous testimonial"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === current
                      ? "w-6 bg-rose"
                      : "w-1.5 bg-border-subtle hover:bg-body-muted/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-body-muted transition-all duration-300 hover:border-rose/40 hover:text-ivory"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href="https://www.google.com/maps/place/Skin+Studio+Ithaca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-rose px-8 py-3.5 font-sans text-[15px] font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-hover"
            >
              Read All Reviews
            </a>
            <a
              href="https://skinstudioithaca.com/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-border-subtle px-8 py-3.5 font-sans text-[14px] font-medium text-body-muted transition-all duration-300 hover:border-rose/30 hover:text-ivory"
            >
              Book an Appointment
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
