import React from 'react';

interface LogoProps {
  className?: string;
  height?: number; // Target height in px (will scale proportionately)
  showText?: boolean;
  variant?: 'black' | 'white' | 'white-icon';
}

export default function Logo({ className = '', height = 36, variant = 'black' }: LogoProps) {
  // Use the exact custom uploaded brand logo based on the intended theme variant
  const logoSrc = variant === 'white-icon'
    ? '/src/assets/images/IconCP_Putih.png'
    : variant === 'white' 
      ? '/src/assets/images/LogoCP_Putih.png' 
      : '/src/assets/images/LogoCP_Hitam.png';

  return (
    <div 
      className={`inline-flex items-center justify-start select-none shrink-0 ${className}`} 
      style={{ 
        height: `${height}px`,
      }}
    >
      <img
        src={logoSrc}
        alt="Cepen Production Logo"
        referrerPolicy="no-referrer"
        className="h-full w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
        style={{ 
          height: `${height}px`,
        }}
      />
    </div>
  );
}

