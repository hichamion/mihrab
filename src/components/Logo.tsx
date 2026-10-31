import React from 'react';

/** The Mihrab arch mark — same drawing as public/favicon.svg, used everywhere the brand appears. */
export const LogoMark: React.FC<{ className?: string; title?: string }> = ({ className = 'w-10 h-10', title }) => (
  <svg
    viewBox="0 0 64 64"
    className={`${className} shrink-0`}
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    <rect width="64" height="64" rx="14" fill="#064e3b" />
    <path
      d="M16 54V30C16 18 32 9 32 9s16 9 16 21v24"
      fill="none"
      stroke="#f59e0b"
      strokeWidth="4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M24 54V33c0-6 8-11 8-11s8 5 8 11v21" fill="#10b981" fillOpacity=".35" />
    <circle cx="32" cy="34" r="3" fill="#fcd34d" />
    <path d="M12 54h40" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
