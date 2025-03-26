import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div>
      {/* Content */}
      <div className="container relative z-10 pb-10 pt-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:text-gray-900 dark:bg-white/[0.08] dark:text-white/80 dark:hover:text-white">
            <span>Introducing mailflow.com</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Email Marketing <br />
            Simplified
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-white/80">
            The best way to reach humans instead of spam folders. create, manage, and automate
            targeted email campaigns that convert.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-700 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <Link to="/sign-up">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              <Link to="/docs">Documentation</Link>
            </Button>
          </div>
        </div>

        {/* Trusted By Logos */}
        <div className="mt-10">
          <p className="mb-8 text-center text-sm text-gray-500 dark:text-white/60">
            Companies of all sizes trust MailFlow to deliver their most important emails.
          </p>
        </div>
      </div>
    </div>
  );
}
