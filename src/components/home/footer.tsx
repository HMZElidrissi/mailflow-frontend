import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Logo from '@/components/icons/logo.tsx';
import GitHubIcon from '@/components/icons/github-icon';
import TwitterIcon from '@/components/icons/twitter-icon';
import SystemStatusIndicator from '@/components/icons/system-status-indicator';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-gray-800 dark:border-neutral-800 dark:bg-black dark:text-white/80">
      <div className="container py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Start sending this afternoon
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600 dark:text-white/80">
            MailFlow delivers mission-critical emails for some of the fastest growing teams.
          </p>
          <Button
            asChild
            className="bg-orange-600 text-white hover:bg-orange-700 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <Link to="/sign-up">Sign up for free</Link>
          </Button>
        </div>

        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="space-y-4 md:max-w-[280px]">
            <Logo size="sm" />
            <p className="mb-4 text-sm text-gray-500 dark:text-white/60">
              create, manage and automate targeted <br />
              email campaigns that convert.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/docs/introduction"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs/api-reference/introduction"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs/integrations"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/blog"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changelog"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roadmap"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/enterprise"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-white/60 dark:hover:text-white"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <Link to="https://github.com/HMZElidrissi" target="_blank">
              <GitHubIcon />
            </Link>
            <Link to="https://x.com/HMZElidrissi" target="_blank">
              <TwitterIcon />
            </Link>
          </div>
          <SystemStatusIndicator status="operational" />
        </div>
      </div>
    </footer>
  );
}
