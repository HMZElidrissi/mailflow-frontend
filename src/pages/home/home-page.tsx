import { useState } from 'react';
import { motion } from 'framer-motion';
import { classDiagram, flowDiagram, markdownContent } from '@/config/specifications.ts';
import Hero from '@/components/home/hero.tsx';
import Features from '@/components/home/features.tsx';
import HowItWorks from '@/components/home/how-it-works.tsx';
import Benefits from '@/components/home/benefits.tsx';
import TechnicalSpecs from '@/components/home/technical-specs.tsx';
import Testimonials from '@/components/home/testimonials.tsx';
import CtaSection from '@/components/home/cta.tsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <motion.div
      className="container mx-auto space-y-16 px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CtaSection />
      <TechnicalSpecs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        markdownContent={markdownContent}
        flowDiagram={flowDiagram}
        classDiagram={classDiagram}
      />
    </motion.div>
  );
}