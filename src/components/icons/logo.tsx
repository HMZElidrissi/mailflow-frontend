import { Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const textSizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
}

export default function Logo({ size = "md" }: LogoProps) {
  const iconSize = sizeClasses[size];
  const textSize = textSizeClasses[size];
  return (
    <Link to="/" className="flex items-center mx-auto">
      <Circle className={`${iconSize} text-orange-500`} />
      <span className={`${textSize} ml-2 font-bold text-primary dark:text-gray-300`}>
            mailflow
          </span>
    </Link>
  );
}
