import { motion } from 'framer-motion';

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

const steps = [
  {
    number: 1,
    title: 'Create Contacts',
    description: 'Import your contacts or add them manually. Organize them with custom tags.',
  },
  {
    number: 2,
    title: 'Design Campaigns',
    description: "Create email templates and set trigger tags to determine when they're sent.",
  },
  {
    number: 3,
    title: 'Watch It Work',
    description:
      'The system automatically sends personalized emails when contact tags match campaign triggers.',
  },
];

export default function HowItWorks() {
  return (
    <motion.section variants={itemVariants} className="mb-16">
      <div className="rounded-xl bg-gradient-to-br from-muted/30 to-background p-8">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}