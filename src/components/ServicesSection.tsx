"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

const services = [
  {
    number: "01",
    eyebrow: "Facials For Every Skin Type",
    title: "Facial Treatments",
    description:
      "Customized to each client's needs — from acne elimination to microdermabrasion, our signature facials combine relaxation with powerful, lasting results.",
    tags: ["Deep Cleanse", "Hydration", "Acne Care"],
    image: "/images/service-facial.jpg",
    alt: "Professional facial treatment with gentle skincare application",
  },
  {
    number: "02",
    eyebrow: "Targeted Skin Renewal",
    title: "Micro-Infusion Facial",
    description:
      "A proven way to boost collagen production, tighten skin, reduce fine lines, minimize pores, and resurface skin for a radiant, youthful complexion.",
    tags: ["Collagen Boost", "Fine Lines", "Pore Refining"],
    image: "/images/service-micro.jpg",
    alt: "Advanced micro-infusion facial treatment for skin rejuvenation",
  },
  {
    number: "03",
    eyebrow: "Light-Based Rejuvenation",
    title: "Photo Facial / IPL",
    description:
      "Intense pulsed light therapy offers skin rejuvenation, lightens brown spots, and removes vascular redness — an ideal treatment for rosacea and sun damage.",
    tags: ["Brown Spots", "Rosacea", "Sun Damage"],
    image: "/images/service-ipl.jpg",
    alt: "IPL photo facial treatment for skin rejuvenation",
  },
  {
    number: "04",
    eyebrow: "Smooth, Lasting Results",
    title: "Laser Hair Removal",
    description:
      "Pain-free laser hair removal with our Motus AX technology. Effective across the widest range of skin types, delivering smooth results in fewer sessions.",
    tags: ["Pain-Free", "All Skin Types", "Fewer Sessions"],
    image: "/images/service-laser.jpg",
    alt: "Professional laser hair removal treatment session",
  },
  {
    number: "05",
    eyebrow: "Everyday Effortless Beauty",
    title: "Microblading & PMU",
    description:
      "Natural-looking, timeless permanent makeup — including microblading, eyeliner, lip blush, and scalp micropigmentation — customized to enhance your features.",
    tags: ["Brows", "Lip Blush", "Eyeliner"],
    image: "/images/service-pmu.jpg",
    alt: "Precision microblading treatment for natural brow enhancement",
  },
  {
    number: "06",
    eyebrow: "Wake Up Ready",
    title: "Lash Services",
    description:
      "Expert lash specialists offering extensions in natural and glamour looks, plus keratin lash lifts that last up to 6–8 weeks for effortless, everyday beauty.",
    tags: ["Extensions", "Lash Lift", "Volume"],
    image: "/images/service-lash.jpg",
    alt: "Professional eyelash extension application",
  },
];

type Service = (typeof services)[number];

const BOOK_URL = "https://skinstudioithaca.com/book";

function CardBody({ service }: { service: Service }) {
  return (
    <div className="grid overflow-hidden rounded-[28px] border border-border-subtle bg-dark-secondary shadow-[0_-8px_40px_rgba(0,0,0,0.35)] lg:grid-cols-[1.05fr_1fr]">
      {/* The number sits in its own fixed-width column so it can never run into the title. */}
      <div className="flex gap-5 p-8 md:p-10 lg:gap-8 lg:p-14">
        <span
          aria-hidden
          className="heading-serif shrink-0 select-none text-[44px] leading-[0.85] text-ivory/[0.14] md:text-[56px] lg:text-[64px]"
        >
          {service.number}
        </span>

        <div className="flex min-w-0 flex-col justify-center">
          <span className="eyebrow mb-3 block">{service.eyebrow}</span>

          <h3 className="heading-serif mb-4 text-3xl md:text-4xl lg:text-[40px]">
            {service.title}
          </h3>

          <p className="mb-7 max-w-md font-sans text-[15px] leading-[1.75] text-body-muted">
            {service.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-subtle px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-body-muted/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex w-fit items-center gap-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:text-rose"
          >
            Book This Treatment
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </a>
        </div>
      </div>

      <div className="relative min-h-[240px] overflow-hidden lg:min-h-[420px]">
        <img
          src={service.image}
          alt={service.alt}
          className="absolute inset-0 object-cover"
          style={{ width: "100%", height: "100%" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-dark-secondary lg:via-dark-secondary/20 lg:to-transparent" />
      </div>
    </div>
  );
}

/** One card in the sticky stack — it pins under the header while the next card slides over it. */
function StackedCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks slightly once the following cards start covering it,
  // so the stack reads as depth rather than a flat overlap.
  const start = index / total;
  const scale = useTransform(
    progress,
    [start, 1],
    [1, 1 - (total - index - 1) * 0.035]
  );
  // Darkened with an opaque scrim rather than by lowering the card's own
  // opacity — a translucent card would let the whole stack show through it.
  const scrimOpacity = useTransform(progress, [start, 1], [0, 0.55]);

  return (
    <div className="sticky top-[96px] flex min-h-[calc(100vh-96px)] items-start justify-center">
      <motion.div
        style={{
          scale,
          top: `${index * 22}px`,
        }}
        className="relative w-full origin-top"
      >
        <CardBody service={service} />
        <motion.div
          aria-hidden
          style={{ opacity: scrimOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[28px] bg-dark-primary"
        />
      </motion.div>
    </div>
  );
}

function StickyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {services.map((service, i) => (
        <StackedCard
          key={service.number}
          service={service}
          index={i}
          total={services.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

/** Fallback used on small screens and with reduced motion — plain, fully readable cards. */
function PlainCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <CardBody service={service} />
    </motion.div>
  );
}

export default function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const useStack = !isNarrow && !prefersReducedMotion;

  return (
    <section id="services" className="bg-dark-primary py-28 md:py-36 lg:py-44">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-16 max-w-2xl lg:mb-20">
          <SectionLabel text="Our Treatments" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-serif text-4xl md:text-5xl lg:text-6xl"
          >
            Treatments Designed
            <br />
            Around Your <span className="heading-serif-italic">Skin.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-md font-sans text-[15px] leading-[1.75] text-body-muted"
          >
            From custom facials to advanced laser treatments, every service is
            tailored to your unique skin goals.
          </motion.p>
        </div>

        {useStack ? (
          <StickyStack />
        ) : (
          <div className="space-y-6">
            {services.map((service, i) => (
              <PlainCard key={service.number} service={service} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex flex-col items-center gap-5 text-center"
        >
          <a
            href="https://skinstudioithaca.com/facial-treatments/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-rose px-8 py-3.5 font-sans text-[15px] font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-hover"
          >
            Explore All Treatments
          </a>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 font-sans text-[13px] font-medium text-body-muted transition-colors duration-300 hover:text-ivory"
          >
            Not sure? Book a free consultation
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
