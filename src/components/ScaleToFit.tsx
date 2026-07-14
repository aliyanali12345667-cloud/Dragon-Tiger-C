import React, { useEffect, useRef, useState } from 'react';

interface ScaleToFitProps {
  children: React.ReactNode;
  targetWidth?: number;
  targetHeight?: number;
}

export default function ScaleToFit({
  children,
}: ScaleToFitProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1120, height: 780, scale: 1 });

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const parent = wrapperRef.current.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      if (parentWidth === 0 || parentHeight === 0) return;

      const R = parentWidth / parentHeight;
      let targetWidth = 1120;
      let targetHeight = 780;
      let scale = 1;

      if (R >= 1.0) {
        // Landscape Mode: Anchor virtual height to standard comfortable 740px
        targetHeight = 740;
        targetWidth = Math.round(740 * R);
        scale = parentHeight / 740;
      } else {
        // Portrait Mode: Anchor virtual width to standard comfortable 480px
        targetWidth = 480;
        targetHeight = Math.round(480 / R);
        scale = parentWidth / 480;
      }

      setDimensions({ width: targetWidth, height: targetHeight, scale });
    };

    // Use ResizeObserver for instant responsive feedback
    const parent = wrapperRef.current?.parentElement;
    if (parent) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(parent);
      handleResize();
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      className="w-full h-full overflow-hidden relative" 
      style={{ minHeight: '0px' }}
    >
      <div
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `scale(${dimensions.scale})`,
          transformOrigin: 'top left',
          transition: 'transform 0.05s ease-out',
        }}
        className="shrink-0 flex flex-col justify-between relative overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
