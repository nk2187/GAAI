import type { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D63B91', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FF8BA7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      <text 
        x="50%" 
        y="50%" 
        dy=".35em"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="38"
        fontWeight="600"
        fill="url(#logo-gradient)"
        letterSpacing="2"
      >
        GA.AI
      </text>
      
      <path 
        d="M148 22 Q 150 20 152 22 C 154 24 152 26 150 24 Q 148 22 148 22"
        fill="url(#logo-gradient)"
        transform="rotate(15 150 23)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="15 150 23"
          to="375 150 23"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
