import { motion } from 'framer-motion';
import { BarChart4, MousePointerClick, Zap } from 'lucide-react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const benefits = [
  {
    title: 'Save Time',
    description: 'Automate your email campaigns and focus on growing your business',
    icon: <Zap className="h-6 w-6 text-green-500" />,
  },
  {
    title: 'Increase Engagement',
    description: 'Personalized emails drive higher open and click-through rates',
    icon: <MousePointerClick className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Drive Conversions',
    description: 'Target the right audience with relevant content at the right time',
    icon: <BarChart4 className="h-6 w-6 text-purple-500" />,
  },
];

export default function Benefits() {
  return (
    <motion.section variants={itemVariants} className="mb-16">
      <h2 className="mb-12 text-center text-3xl font-bold">Why Choose mailflow?</h2>
      <div className="mx-auto max-w-3xl">
        {benefits.map((benefit, index) => (
          <div key={index} className="mb-8 flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">{benefit.icon}</div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}