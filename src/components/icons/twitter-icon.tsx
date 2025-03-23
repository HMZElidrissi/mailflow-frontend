import React from 'react';

interface TwitterIconProps {
  className?: string;
  size?: number;
}

const TwitterIcon: React.FC<TwitterIconProps> = ({
  className = 'text-gray-500 hover:text-gray-800 dark:text-white/60 dark:hover:text-white',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.508 2H19.992L13.4 9.515L21 20H15.0895L10.3486 13.6835L4.83051 20H1.34323L8.39308 12.0026L1 2H7.05216L11.3417 7.8179L16.508 2ZM15.8652 18.2865H17.5143L6.20406 3.6275H4.4315L15.8652 18.2865Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TwitterIcon;
