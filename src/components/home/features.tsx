import { motion } from 'framer-motion';
import { FileText, Mail, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

const features = [
  {
    title: 'Contact Management',
    description: 'Organize your contacts with custom tags for targeted campaigns',
    icon: <Users className="h-8 w-8 text-orange-500" />,
  },
  {
    title: 'Automated Campaigns',
    description: 'Set up tag-based triggers to automatically send personalized emails',
    icon: <Mail className="h-8 w-8 text-orange-500" />,
  },
  {
    title: 'Customizable Templates',
    description: 'Create and reuse email templates with variable placeholders',
    icon: <FileText className="h-8 w-8 text-orange-500" />,
  },
];

export default function Features() {
  return (
    <motion.section variants={itemVariants} className="mb-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Powerful Features, Simple Interface
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border border-border/50 bg-card/50 shadow-lg backdrop-blur transition-all duration-300 hover:shadow-xl"
          >
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="mb-3 text-center text-xl font-semibold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}