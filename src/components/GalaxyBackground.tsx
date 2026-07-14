import React, { useMemo } from 'react';

export default function GalaxyBackground() {
  // Generate deterministic coordinates for starry points so they persist correctly
  const stars = useMemo(() => {
    const arr = [];
    let seed = 12345;
    const lcg = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 70; i++) {
      arr.push({
        id: i,
        top: `${lcg() * 100}%`,
        left: `${lcg() * 100}%`,
        size: lcg() * 2.2 + 0.6,
        delay: `${lcg() * 6}s`,
        duration: `${lcg() * 4 + 3}s`,
        opacity: lcg() * 0.7 + 0.3,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="galaxy-bg-root">
      {/* Base Pitch Space Black */}
      <div className="absolute inset-0 bg-[#04020a]" />

      {/* Rotating Milky Way Nebula Spiral Dust Layer 1 */}
      <div 
        className="absolute w-[180%] h-[180%] -top-[40%] -left-[40%] rounded-full opacity-35 filter blur-[110px] animate-galaxy-slow"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(219,39,119,0.12) 30%, rgba(59,130,246,0.05) 60%, transparent 80%)',
        }}
      />

      {/* Nebula Dust Layer 2 - Drifting Cosmic Dust Clouds */}
      <div 
        className="absolute w-[120%] h-[120%] top-[10%] left-[20%] rounded-full opacity-40 filter blur-[120px] animate-nebula-drift-1"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, rgba(147,51,234,0.08) 40%, transparent 70%)',
        }}
      />

      {/* Nebula Dust Layer 3 - Electric Blue Star Hatchery */}
      <div 
        className="absolute w-[130%] h-[130%] -top-[20%] left-[-10%] rounded-full opacity-35 filter blur-[130px] animate-nebula-drift-2"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(30,58,138,0.06) 50%, transparent 70%)',
        }}
      />

      {/* Twinkling Space Star Field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-point"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `starTwinkle ${star.duration} ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* GIANT GLOWING MYSTICAL TEAL MOON FROM THE SCREENSHOT */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full top-[-10%] left-1/2 -translate-x-1/2 pointer-events-none opacity-40 mix-blend-screen select-none filter blur-[40px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(165, 243, 252, 0.5) 0%, rgba(103, 232, 249, 0.3) 25%, rgba(6, 182, 212, 0.08) 50%, rgba(15, 23, 42, 0) 70%)',
          animationDuration: '8s'
        }}
      />
      <div 
        className="absolute w-[240px] h-[240px] rounded-full top-[10%] left-1/2 -translate-x-1/2 pointer-events-none opacity-30 mix-blend-screen select-none border border-cyan-300/10 shadow-[0_0_80px_rgba(34,211,238,0.4)]"
        style={{
          background: 'radial-gradient(circle, rgba(224, 242, 254, 0.6) 0%, rgba(186, 230, 253, 0.3) 40%, rgba(14, 165, 233, 0.05) 100%)'
        }}
      />

      {/* Subtle Spatial Horizon lines (Constellations mapping) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" strokeDasharray="3,15" />
        <circle cx="50%" cy="50%" r="55%" fill="none" stroke="url(#grid-grad)" strokeWidth="0.5" strokeDasharray="5,25" />
        <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="url(#grid-grad)" strokeWidth="0.25" strokeDasharray="2,10" />
        <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="url(#grid-grad)" strokeWidth="0.25" strokeDasharray="2,10" />
      </svg>

      {/* Futuristic glowing 3D perspective table-top grid */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] opacity-[0.08] overflow-hidden pointer-events-none select-none">
        <div 
          className="w-[200%] h-full left-[-50%] absolute" 
          style={{
            backgroundImage: 'linear-gradient(to right, #ffe39c 1.5px, transparent 1.5px), linear-gradient(to bottom, #ffe39c 1.5px, transparent 1.5px)',
            backgroundSize: '50px 50px',
            transform: 'perspective(220px) rotateX(65deg)',
            transformOrigin: 'top center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04020a] via-transparent to-transparent" />
      </div>
    </div>
  );
}
