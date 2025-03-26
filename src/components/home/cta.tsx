import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

export default function CtaSection() {
  return (
    <motion.section variants={itemVariants} className="mb-16">
      <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-primary/10 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to transform your email marketing?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Join thousands of businesses that are using mailflow to create engaging, targeted email
          campaigns that convert.
        </p>
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Link to="/sign-up" className="flex items-center gap-2">
            Get Started for Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
