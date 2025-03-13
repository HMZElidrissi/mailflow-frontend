import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import QuoteIcon from '@/components/icons/quote-icon.tsx';

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

const testimonials = [
  {
    quote:
      "mailflow has transformed our email marketing strategy. We've seen a 40% increase in engagement since we started using it.",
    author: 'Sarah Johnson',
    role: 'Marketing Director, TechCorp',
  },
  {
    quote:
      "The tag-based campaign system is brilliant. It's so easy to segment our audience and deliver targeted content.",
    author: 'Michael Chen',
    role: 'E-commerce Manager, StyleBoutique',
  },
  {
    quote:
      'Setting up automated email sequences used to take days. With mailflow, I can do it in hours.',
    author: 'Elena Rodriguez',
    role: 'Digital Marketer, GrowthAgency',
  },
];

export default function Testimonials() {
  return (
    <motion.section variants={itemVariants} className="mb-16">
      <h2 className="mb-12 text-center text-3xl font-bold">What Our Customers Say</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="border border-border/50 bg-card/50 shadow-lg backdrop-blur transition-all duration-300 hover:shadow-xl"
          >
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center text-orange-500">
                <QuoteIcon />
              </div>
              <p className="mb-6 text-center italic text-muted-foreground">{testimonial.quote}</p>
              <div className="text-center">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}