import React from 'react';

interface WaveDividerProps {
  color?: string;
}

export default function WaveDivider({ color = 'white' }: WaveDividerProps) {
  return (
    <div className="wave-divider" style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '60px' }}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C41.7,21.5,108.61,46.12,187.35,53.25c76.23,6.9,122.37,5.55,134.04,3.19Z"
          style={{ fill: color }}
        ></path>
      </svg>
    </div>
  );
}
