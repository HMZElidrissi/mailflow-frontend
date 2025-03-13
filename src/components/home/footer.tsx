import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/logo.tsx';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-gray-800 dark:text-white/80">
      <div className="container py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Start sending this afternoon</h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600 dark:text-white/80">
            MailFlow delivers mission-critical emails for some of the fastest growing teams.
          </p>
          <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 dark:bg-white dark:text-black dark:hover:bg-white/90">
            <Link to="/signup">Sign up for free</Link>
          </Button>
        </div>

        <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="space-y-4 md:max-w-[280px]">
            <Logo size="sm" />
            <p className="mb-4 text-sm text-gray-500 dark:text-white/60">
              create, manage, and automate targeted <br />
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
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs/api-reference/introduction"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs/integrations"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
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
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changelog"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roadmap"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
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
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/enterprise"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
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
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-sm text-gray-500 dark:text-white/60 transition-colors hover:text-gray-800 dark:hover:text-white"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <div className="flex items-center gap-4">
            <Link
              to="https://github.com/HMZElidrissi"
              target="_blank"
              className="text-gray-500 dark:text-white/60 hover:text-gray-800 dark:hover:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.5 21.278 9.5 21.017C9.5 20.719 9.492 19.76 9.489 18.958C6.727 19.501 6.142 17.783 6.142 17.783C5.699 16.645 5.061 16.343 5.061 16.343C4.203 15.728 5.127 15.739 5.127 15.739C6.084 15.811 6.596 16.768 6.596 16.768C7.45 18.184 8.873 17.831 9.5 17.579C9.592 16.979 9.855 16.576 10.142 16.345C7.952 16.12 5.658 15.287 5.658 11.541C5.658 10.46 6.047 9.572 6.615 8.873C6.489 8.626 6.149 7.621 6.713 6.223C6.713 6.223 7.514 5.959 9.575 7.279C10.336 7.061 11.17 6.953 12 6.949C12.83 6.953 13.665 7.061 14.427 7.279C16.486 5.959 17.286 6.223 17.286 6.223C17.852 7.621 17.512 8.626 17.386 8.873C17.955 9.572 18.342 10.46 18.342 11.541C18.342 15.295 16.044 16.117 13.849 16.338C14.21 16.618 14.539 17.172 14.539 18.017C14.539 19.247 14.528 20.629 14.528 21.017C14.528 21.278 14.682 21.588 15.19 21.486C19.157 20.161 22 16.416 22 12C22 6.477 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link
              to="https://x.com/HMZElidrissi"
              target="_blank"
              className="text-gray-500 dark:text-white/60 hover:text-gray-800 dark:hover:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.508 2H19.992L13.4 9.515L21 20H15.0895L10.3486 13.6835L4.83051 20H1.34323L8.39308 12.0026L1 2H7.05216L11.3417 7.8179L16.508 2ZM15.8652 18.2865H17.5143L6.20406 3.6275H4.4315L15.8652 18.2865Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 hover:text-gray-800 dark:hover:text-white"
          >
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            All systems operational
          </Link>
        </div>
      </div>
    </footer>
  );
}