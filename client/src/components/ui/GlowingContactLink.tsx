import React from 'react';

interface GlowingContactLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const GlowingContactLink: React.FC<GlowingContactLinkProps> = ({ href, children, className, ...props }) => {
  return (
    <a 
      href={href} 
      className={`group relative inline-flex items-center justify-center ${className || ''}`}
      style={{ textDecoration: 'none', WebkitTapHighlightColor: 'transparent' }}
      {...props}
    >
      {/* Background Glow (only visible on hover, uses a safe implementation) */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
            style={{
               boxShadow: '0 0 15px 2px rgba(0, 180, 216, 0.4)',
               transform: 'translateZ(0)'
            }}
      />
      
      {/* Text layer with gradient */}
      <span 
        className="relative font-bold"
        style={{
          backgroundImage: 'linear-gradient(90deg, #0077b6 0%, #e0fbfc 40%, #00b4d8 50%, #e0fbfc 60%, #0077b6 100%)',
          backgroundSize: '200% auto',
          color: '#00b4d8', // Fallback
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'sweep-gradient 3s linear infinite',
          // Fix for Android blurring transparent text:
          transform: 'translateZ(0)',
          willChange: 'background-position',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {children}
      </span>
      
      <style>{`
        @keyframes sweep-gradient {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
      `}</style>
    </a>
  );
};

