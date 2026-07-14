import React, { useEffect, useRef } from 'react';

interface ThreeDRendererProps {
  modelType: 'dragon' | 'tiger' | 'tie';
  isAnimating?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

// Particle structures for efficient pooling
interface FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface RainParticle {
  x: number;
  y: number;
  length: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

// Procedural vector illustration drawing helpers
function drawProceduralDragon(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  scale: number,
  isAnimating: boolean
) {
  // 1. Deep Volcanic Background with lava heat glows
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.85);
  bgGrad.addColorStop(0, '#1f0408');
  bgGrad.addColorStop(0.4, '#0d0204');
  bgGrad.addColorStop(1, '#020002');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Volcanic rising ash embers in background
  ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
  for (let e = 0; e < 6; e++) {
    const ex = (width * 0.15 + (e * 113 + t * 25)) % width;
    const ey = (height * 0.95 - (e * 67 + t * 40)) % height;
    ctx.beginPath();
    ctx.arc(ex, ey >= 0 ? ey : ey + height, Math.sin(t + e) * 2 + 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Lava cracks glowing in background
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.22)';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(width * 0.05, height * 0.95);
  ctx.quadraticCurveTo(width * 0.35, height * 0.78, width * 0.45, height * 0.98);
  ctx.moveTo(width * 0.55, height * 0.95);
  ctx.quadraticCurveTo(width * 0.75, height * 0.72, width * 0.95, height * 0.98);
  ctx.stroke();

  ctx.save();
  // Center translation and breathing pulse scale
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-width / 2, -height / 2);

  // 2. Wings & Coil Silhouette back-layer with dramatic fire-rim glow
  const wingGrad = ctx.createLinearGradient(width * 0.1, height * 0.3, width * 0.3, height * 0.7);
  wingGrad.addColorStop(0, '#3f040a');
  wingGrad.addColorStop(0.5, '#1e0205');
  wingGrad.addColorStop(1, '#0a0002');
  
  ctx.fillStyle = wingGrad;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 10;
  
  ctx.beginPath();
  // Back wing curve
  ctx.moveTo(width * 0.18, height * 0.75);
  ctx.bezierCurveTo(width * 0.02, height * 0.42, width * 0.06, height * 0.18, width * 0.38, height * 0.28);
  ctx.bezierCurveTo(width * 0.32, height * 0.40, width * 0.26, height * 0.52, width * 0.26, height * 0.75);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0; // reset shadow for head

  // 3. Neck & Main Volcanic Dragon Head with premium 3D shading
  const headGrad = ctx.createLinearGradient(width * 0.2, height * 0.2, width * 0.6, height * 0.85);
  headGrad.addColorStop(0, '#45060b'); // basalt red core
  headGrad.addColorStop(0.4, '#1b0204'); // deep obsidian black
  headGrad.addColorStop(1, '#0c0102'); // midnight core shadow

  ctx.fillStyle = headGrad;
  ctx.strokeStyle = '#f97316'; // Vivid glowing lava outline
  ctx.shadowColor = '#f97316';
  ctx.shadowBlur = isAnimating ? 12 : 6;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.moveTo(width * 0.25, height * 0.88); // Base of neck
  ctx.quadraticCurveTo(width * 0.18, height * 0.52, width * 0.34, height * 0.36); // Curved back neck/head
  
  // Back of head spikes/horns
  ctx.lineTo(width * 0.18, height * 0.16); // Majestic Primary Horn
  ctx.quadraticCurveTo(width * 0.34, height * 0.25, width * 0.40, height * 0.33); // Primary horn ridge
  
  ctx.lineTo(width * 0.30, height * 0.26); // Secondary small horn
  ctx.lineTo(width * 0.42, height * 0.34);
  
  ctx.lineTo(width * 0.52, height * 0.36); // Eye brow ridge
  ctx.quadraticCurveTo(width * 0.59, height * 0.38, width * 0.64, height * 0.42); // Snout/Upper jaw tip
  ctx.lineTo(width * 0.48, height * 0.48); // Open mouth interior upper
  ctx.lineTo(width * 0.43, height * 0.51); // Deep throat cavity
  ctx.lineTo(width * 0.53, height * 0.57); // Inner lower jaw
  ctx.quadraticCurveTo(width * 0.47, height * 0.64, width * 0.38, height * 0.66); // Back jaw curve
  ctx.quadraticCurveTo(width * 0.30, height * 0.71, width * 0.32, height * 0.88); // Front throat/neck
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 4. Overlapping Dragon Scales along the neck for intense detail
  ctx.strokeStyle = 'rgba(249, 115, 22, 0.55)'; // glowing molten lines
  ctx.lineWidth = 1.2;
  const neckRows = 5;
  for (let row = 0; row < neckRows; row++) {
    const rowY = height * 0.55 + row * 15;
    const colsInRow = 3;
    for (let col = 0; col < colsInRow; col++) {
      const scaleX = width * 0.25 + col * 12 + row * 4;
      const scaleY = rowY + col * 2;
      ctx.fillStyle = `rgba(${120 + row * 20}, 15, 20, 0.85)`;
      ctx.beginPath();
      ctx.arc(scaleX, scaleY, 6, 0, Math.PI, false);
      ctx.quadraticCurveTo(scaleX, scaleY + 7, scaleX - 6, scaleY);
      ctx.fill();
      ctx.stroke();
    }
  }

  // 5. 3D Head shading overlay (creates real volume)
  const shadowOverlay = ctx.createRadialGradient(width * 0.35, height * 0.45, 10, width * 0.35, height * 0.45, width * 0.3);
  shadowOverlay.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowOverlay.addColorStop(0.7, 'rgba(0, 0, 0, 0.45)');
  shadowOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
  ctx.fillStyle = shadowOverlay;
  ctx.beginPath();
  ctx.moveTo(width * 0.25, height * 0.88);
  ctx.quadraticCurveTo(width * 0.18, height * 0.52, width * 0.34, height * 0.36);
  ctx.lineTo(width * 0.52, height * 0.36);
  ctx.quadraticCurveTo(width * 0.59, height * 0.38, width * 0.64, height * 0.42);
  ctx.lineTo(width * 0.48, height * 0.48);
  ctx.lineTo(width * 0.43, height * 0.51);
  ctx.lineTo(width * 0.53, height * 0.57);
  ctx.quadraticCurveTo(width * 0.47, height * 0.64, width * 0.38, height * 0.66);
  ctx.quadraticCurveTo(width * 0.30, height * 0.71, width * 0.32, height * 0.88);
  ctx.closePath();
  ctx.fill();

  // 6. Glowing Magma Veins/Embers on neck and cheek (Basalt detailing)
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  // Cheek lava branch
  ctx.moveTo(width * 0.34, height * 0.45);
  ctx.lineTo(width * 0.39, height * 0.42);
  ctx.lineTo(width * 0.41, height * 0.46);
  // Neck lava branch
  ctx.moveTo(width * 0.31, height * 0.58);
  ctx.lineTo(width * 0.35, height * 0.62);
  ctx.lineTo(width * 0.33, height * 0.68);
  ctx.stroke();

  // 7. Razor-sharp white/ivory shaded fangs
  const fangGrad = ctx.createLinearGradient(width * 0.48, height * 0.42, width * 0.56, height * 0.56);
  fangGrad.addColorStop(0, '#ffffff');
  fangGrad.addColorStop(0.6, '#fffee4');
  fangGrad.addColorStop(1, '#cca352'); // golden bone base
  ctx.fillStyle = fangGrad;
  
  ctx.beginPath();
  // Upper razor fang
  ctx.moveTo(width * 0.55, height * 0.44);
  ctx.lineTo(width * 0.53, height * 0.48);
  ctx.lineTo(width * 0.51, height * 0.45);
  // Bottom razor fang
  ctx.moveTo(width * 0.51, height * 0.56);
  ctx.lineTo(width * 0.49, height * 0.52);
  ctx.lineTo(width * 0.47, height * 0.54);
  ctx.closePath();
  ctx.fill();

  // 8. Fierce reptilian eye with slit pupil
  const eyeCenterX = width * 0.455;
  const eyeCenterY = height * 0.41;
  
  // Outer orbital red glow
  const orbGrad = ctx.createRadialGradient(eyeCenterX, eyeCenterY, 1, eyeCenterX, eyeCenterY, 8);
  orbGrad.addColorStop(0, '#ef4444');
  orbGrad.addColorStop(0.5, '#7f1d1d');
  orbGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = orbGrad;
  ctx.beginPath();
  ctx.arc(eyeCenterX, eyeCenterY, 8, 0, Math.PI * 2);
  ctx.fill();

  // Yellow core iris
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.ellipse(eyeCenterX, eyeCenterY, 5, 3, -0.05, 0, Math.PI * 2);
  ctx.fill();

  // Slit pupil
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(eyeCenterX, eyeCenterY, 4, 1, -0.05 + Math.PI / 2, 0, Math.PI * 2);
  ctx.fill();

  // Specular highlight white bead
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeCenterX - 1.2, eyeCenterY - 1, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawProceduralTiger(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  scale: number,
  isAnimating: boolean
) {
  // 1. Stormy Midnight Blue Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width * 0.85);
  bgGrad.addColorStop(0, '#0c1130');
  bgGrad.addColorStop(0.4, '#040514');
  bgGrad.addColorStop(1, '#010106');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Storm lightning aura circles
  ctx.fillStyle = 'rgba(34, 211, 238, 0.08)';
  ctx.beginPath();
  ctx.arc(width * 0.25, height * 0.35, 60, 0, Math.PI * 2);
  ctx.arc(width * 0.75, height * 0.32, 70, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-width / 2, -height / 2);

  // 2. Ears (Detailed internal and external curves)
  // Left Ear
  const leftEarGrad = ctx.createLinearGradient(width * 0.24, height * 0.16, width * 0.38, height * 0.30);
  leftEarGrad.addColorStop(0, '#0f172a'); // slate-900 outer edge
  leftEarGrad.addColorStop(0.5, '#475569'); // slate-600
  leftEarGrad.addColorStop(1, '#f1f5f9'); // white interior fur
  ctx.fillStyle = leftEarGrad;
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(width * 0.32, height * 0.32);
  ctx.lineTo(width * 0.22, height * 0.14);
  ctx.lineTo(width * 0.44, height * 0.24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pink inner ear cavity
  ctx.fillStyle = '#fecdd3';
  ctx.beginPath();
  ctx.moveTo(width * 0.31, height * 0.28);
  ctx.lineTo(width * 0.25, height * 0.18);
  ctx.lineTo(width * 0.37, height * 0.24);
  ctx.closePath();
  ctx.fill();

  // Right Ear
  const rightEarGrad = ctx.createLinearGradient(width * 0.76, height * 0.16, width * 0.62, height * 0.30);
  rightEarGrad.addColorStop(0, '#0f172a');
  rightEarGrad.addColorStop(0.5, '#475569');
  rightEarGrad.addColorStop(1, '#f1f5f9');
  ctx.fillStyle = rightEarGrad;
  ctx.strokeStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(width * 0.68, height * 0.32);
  ctx.lineTo(width * 0.78, height * 0.14);
  ctx.lineTo(width * 0.56, height * 0.24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pink inner ear cavity (Right)
  ctx.fillStyle = '#fecdd3';
  ctx.beginPath();
  ctx.moveTo(width * 0.69, height * 0.28);
  ctx.lineTo(width * 0.75, height * 0.18);
  ctx.lineTo(width * 0.63, height * 0.24);
  ctx.closePath();
  ctx.fill();

  // 3. White Tiger Majestic Head base with 3D Spherical Fur Shading
  const furGrad = ctx.createRadialGradient(width * 0.5, height * 0.5, 20, width * 0.5, height * 0.5, width * 0.34);
  furGrad.addColorStop(0, '#ffffff'); // clean bright central face
  furGrad.addColorStop(0.5, '#f1f5f9'); // soft ice white
  furGrad.addColorStop(0.85, '#cbd5e1'); // silver-grey fur shadow
  furGrad.addColorStop(1, '#64748b'); // deep slate outer shade

  ctx.fillStyle = furGrad;
  ctx.strokeStyle = '#22d3ee'; // Neon electric cyan lightning highlights
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = isAnimating ? 14 : 7;
  ctx.lineWidth = 2.2;

  // Furry tuft outline for natural feline silhouette instead of plain curves
  ctx.beginPath();
  ctx.moveTo(width * 0.5, height * 0.24); // top head center
  
  // Left side cheeks with sharp fur tufts
  ctx.quadraticCurveTo(width * 0.58, height * 0.25, width * 0.63, height * 0.29);
  ctx.lineTo(width * 0.65, height * 0.32); // tuft 1
  ctx.lineTo(width * 0.61, height * 0.34); 
  ctx.lineTo(width * 0.67, height * 0.38); // tuft 2
  ctx.lineTo(width * 0.62, height * 0.40);
  ctx.quadraticCurveTo(width * 0.74, height * 0.48, width * 0.69, height * 0.62);
  ctx.lineTo(width * 0.73, height * 0.64); // jaw tuft 1
  ctx.lineTo(width * 0.67, height * 0.66);
  ctx.bezierCurveTo(width * 0.58, height * 0.76, width * 0.53, height * 0.78, width * 0.5, height * 0.78); // chin

  // Right side cheeks with sharp fur tufts (symmetric)
  ctx.bezierCurveTo(width * 0.47, height * 0.78, width * 0.42, height * 0.76, width * 0.33, height * 0.66);
  ctx.lineTo(width * 0.27, height * 0.64); // jaw tuft 1
  ctx.lineTo(width * 0.31, height * 0.62);
  ctx.quadraticCurveTo(width * 0.26, height * 0.48, width * 0.38, height * 0.40);
  ctx.lineTo(width * 0.33, height * 0.38); // tuft 2
  ctx.lineTo(width * 0.39, height * 0.34);
  ctx.lineTo(width * 0.35, height * 0.32); // tuft 1
  ctx.lineTo(width * 0.37, height * 0.29);
  ctx.quadraticCurveTo(width * 0.42, height * 0.25, width * 0.5, height * 0.24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0; // reset shadow

  // 4. Detailed Realistic Charcoal Tiger Stripes with beveled highlight edges
  ctx.fillStyle = '#0f172a'; // slate-900 rich black/dark indigo

  // --- Forehead Majestic "King" (王) Mark ---
  ctx.beginPath();
  // Horizontal top line
  ctx.fillRect(width * 0.45, height * 0.27, width * 0.1, 3);
  // Horizontal middle line
  ctx.fillRect(width * 0.46, height * 0.31, width * 0.08, 3);
  // Horizontal bottom line
  ctx.fillRect(width * 0.44, height * 0.35, width * 0.12, 3);
  // Vertical spine line
  ctx.fillRect(width * 0.49, height * 0.27, 4, 11);

  // Left forehead side stripes
  ctx.beginPath();
  ctx.moveTo(width * 0.42, height * 0.28);
  ctx.quadraticCurveTo(width * 0.45, height * 0.31, width * 0.47, height * 0.33);
  ctx.lineTo(width * 0.45, height * 0.27);
  ctx.closePath();
  ctx.fill();

  // Right forehead side stripes
  ctx.beginPath();
  ctx.moveTo(width * 0.58, height * 0.28);
  ctx.quadraticCurveTo(width * 0.55, height * 0.31, width * 0.53, height * 0.33);
  ctx.lineTo(width * 0.55, height * 0.27);
  ctx.closePath();
  ctx.fill();

  // Cheek/Side Face Shaded Stripes
  ctx.beginPath();
  // Left Cheek Stripe 1
  ctx.moveTo(width * 0.30, height * 0.48);
  ctx.quadraticCurveTo(width * 0.37, height * 0.49, width * 0.41, height * 0.46);
  ctx.quadraticCurveTo(width * 0.36, height * 0.52, width * 0.30, height * 0.52);
  // Left Cheek Stripe 2
  ctx.moveTo(width * 0.28, height * 0.56);
  ctx.quadraticCurveTo(width * 0.36, height * 0.57, width * 0.40, height * 0.53);
  ctx.quadraticCurveTo(width * 0.35, height * 0.61, width * 0.28, height * 0.60);

  // Right Cheek Stripe 1 (Symmetric)
  ctx.moveTo(width * 0.70, height * 0.48);
  ctx.quadraticCurveTo(width * 0.63, height * 0.49, width * 0.59, height * 0.46);
  ctx.quadraticCurveTo(width * 0.64, height * 0.52, width * 0.70, height * 0.52);
  // Right Cheek Stripe 2
  ctx.moveTo(width * 0.72, height * 0.56);
  ctx.quadraticCurveTo(width * 0.64, height * 0.57, width * 0.60, height * 0.53);
  ctx.quadraticCurveTo(width * 0.65, height * 0.61, width * 0.72, height * 0.60);
  ctx.closePath();
  ctx.fill();

  // 5. Snout & Soft Shaded Nose
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(width * 0.43, height * 0.54);
  ctx.bezierCurveTo(width * 0.43, height * 0.45, width * 0.57, height * 0.45, width * 0.57, height * 0.54);
  ctx.quadraticCurveTo(width * 0.60, height * 0.66, width * 0.5, height * 0.68);
  ctx.quadraticCurveTo(width * 0.40, height * 0.66, width * 0.43, height * 0.54);
  ctx.closePath();
  ctx.fill();

  // Nose pad with detailed pink-rose leather gradient
  const noseGrad = ctx.createLinearGradient(width * 0.46, height * 0.53, width * 0.54, height * 0.60);
  noseGrad.addColorStop(0, '#fda4af'); // rose pink
  noseGrad.addColorStop(0.7, '#f43f5e'); // deep crimson rose
  noseGrad.addColorStop(1, '#9f1239'); // dark nose base
  ctx.fillStyle = noseGrad;
  ctx.beginPath();
  ctx.moveTo(width * 0.46, height * 0.54);
  ctx.lineTo(width * 0.54, height * 0.54);
  ctx.lineTo(width * 0.52, height * 0.59);
  ctx.lineTo(width * 0.48, height * 0.59);
  ctx.closePath();
  ctx.fill();

  // Muzzle lines and whiskers
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width * 0.5, height * 0.59);
  ctx.lineTo(width * 0.5, height * 0.66); // philtrum
  ctx.quadraticCurveTo(width * 0.45, height * 0.66, width * 0.41, height * 0.62); // left mouth corner
  ctx.moveTo(width * 0.5, height * 0.66);
  ctx.quadraticCurveTo(width * 0.55, height * 0.66, width * 0.59, height * 0.62); // right mouth corner
  ctx.stroke();

  // Whiskers (Elegant silver-gold strokes responding slightly to t!)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 0.8;
  const whiskerWave = Math.sin(t * 3) * 1.5;
  
  // Left whiskers
  ctx.beginPath();
  ctx.moveTo(width * 0.44, height * 0.59);
  ctx.quadraticCurveTo(width * 0.32, height * 0.58 + whiskerWave, width * 0.22, height * 0.62);
  ctx.moveTo(width * 0.43, height * 0.61);
  ctx.quadraticCurveTo(width * 0.30, height * 0.62 + whiskerWave, width * 0.20, height * 0.70);
  
  // Right whiskers
  ctx.moveTo(width * 0.56, height * 0.59);
  ctx.quadraticCurveTo(width * 0.68, height * 0.58 - whiskerWave, width * 0.78, height * 0.62);
  ctx.moveTo(width * 0.57, height * 0.61);
  ctx.quadraticCurveTo(width * 0.70, height * 0.62 - whiskerWave, width * 0.80, height * 0.70);
  ctx.stroke();

  // 6. Protruding razor sharp ivory tiger fangs (vicious & detailed)
  ctx.fillStyle = '#fffbeb';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  // Left canine
  ctx.moveTo(width * 0.42, height * 0.61);
  ctx.lineTo(width * 0.40, height * 0.65);
  ctx.lineTo(width * 0.43, height * 0.63);
  // Right canine
  ctx.moveTo(width * 0.58, height * 0.61);
  ctx.lineTo(width * 0.60, height * 0.65);
  ctx.lineTo(width * 0.57, height * 0.63);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 7. Majestic Cyan Glowing eyes with heavy shadows
  const eyeLeftX = width * 0.415;
  const eyeRightX = width * 0.585;
  const eyeY = height * 0.43;

  [eyeLeftX, eyeRightX].forEach((ex, idx) => {
    const isLeft = idx === 0;
    
    // Glowing cyan base iris
    const eyeGrad = ctx.createRadialGradient(ex, eyeY, 1, ex, eyeY, 9);
    eyeGrad.addColorStop(0, '#ffffff');
    eyeGrad.addColorStop(0.3, '#22d3ee'); // cyan
    eyeGrad.addColorStop(0.7, '#0891b2'); // dark cyan
    eyeGrad.addColorStop(1, '#020617');

    ctx.fillStyle = eyeGrad;
    ctx.beginPath();
    ctx.ellipse(ex, eyeY, 9, 5, isLeft ? -0.15 : 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Sharp cat pupils
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.ellipse(ex, eyeY, 5, 2, isLeft ? -0.15 + Math.PI/2 : 0.15 + Math.PI/2, 0, Math.PI * 2);
    ctx.fill();

    // Eye catchlight sparkles
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ex - 1.8, eyeY - 1.2, 1.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawProceduralTie(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  scale: number,
  isAnimating: boolean
) {
  // 1. Royal Purple Imperial Luxury Gradient Background
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.85);
  bgGrad.addColorStop(0, '#250c3d');
  bgGrad.addColorStop(0.5, '#0d0218');
  bgGrad.addColorStop(1, '#020005');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  // Floating translation & breathing scale
  ctx.translate(width / 2, height / 2 + Math.sin(t * 1.5) * 5);
  ctx.scale(scale, scale);
  ctx.translate(-width / 2, -height / 2);

  // 2. Crossed Gilded Swords with Beveled Shaded Blades
  ctx.strokeStyle = '#92400e'; // deep amber/gold border
  ctx.lineWidth = 1.5;

  // Sword 1 (Left-top to right-bottom)
  ctx.save();
  ctx.translate(width * 0.5, height * 0.52);
  ctx.rotate(Math.PI / 4);
  
  // Left side blade (shaded dark gold)
  ctx.fillStyle = '#b45309';
  ctx.fillRect(-3, -width * 0.33, 3, width * 0.66);
  // Right side blade (bright gold highlight)
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(0, -width * 0.33, 3, width * 0.66);
  
  // Crossguard and grip pommel
  ctx.fillStyle = '#d97706';
  ctx.fillRect(-11, width * 0.18, 22, 6);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(-3, width * 0.21, 6, width * 0.08);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(0, width * 0.30, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Sword 2 (Right-top to left-bottom)
  ctx.save();
  ctx.translate(width * 0.5, height * 0.52);
  ctx.rotate(-Math.PI / 4);
  
  // Left side blade (bright gold highlight)
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(-3, -width * 0.33, 3, width * 0.66);
  // Right side blade (shaded dark gold)
  ctx.fillStyle = '#b45309';
  ctx.fillRect(0, -width * 0.33, 3, width * 0.66);
  
  // Crossguard and grip pommel
  ctx.fillStyle = '#d97706';
  ctx.fillRect(-11, width * 0.18, 22, 6);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(-3, width * 0.21, 6, width * 0.08);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(0, width * 0.30, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. Central Roman Imperial Shield with 3D Depth
  const shieldGrad = ctx.createRadialGradient(width * 0.5, height * 0.52, 5, width * 0.5, height * 0.52, 60);
  shieldGrad.addColorStop(0, '#dc2626'); // Rich royal crimson red shield
  shieldGrad.addColorStop(0.5, '#991b1b');
  shieldGrad.addColorStop(0.9, '#450a0a');
  shieldGrad.addColorStop(1, '#1e0000'); // black outer shadow rim
  
  ctx.fillStyle = shieldGrad;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = isAnimating ? 14 : 7;

  ctx.beginPath();
  ctx.moveTo(width * 0.34, height * 0.35);
  ctx.lineTo(width * 0.66, height * 0.35);
  ctx.quadraticCurveTo(width * 0.66, height * 0.58, width * 0.5, height * 0.72);
  ctx.quadraticCurveTo(width * 0.34, height * 0.58, width * 0.34, height * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Gold studded rivets on the shield rim
  ctx.fillStyle = '#fef08a';
  const rivetCount = 8;
  for (let r = 0; r < rivetCount; r++) {
    const angle = Math.PI * 0.1 + (r / (rivetCount - 1)) * Math.PI * 0.8;
    const rx = width * 0.5 + Math.cos(angle) * 44;
    const ry = height * 0.49 + Math.sin(angle) * 44;
    ctx.beginPath();
    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Elegant Diagonal Metallic Sheen overlay
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  const sheenGrad = ctx.createLinearGradient(0, 0, width, height);
  sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  sheenGrad.addColorStop(0.42, 'rgba(255, 255, 255, 0)');
  sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.28)'); // diagonal bright flash
  sheenGrad.addColorStop(0.58, 'rgba(255, 255, 255, 0)');
  sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // 5. Golden Laurel Wreath (Extremely detailed, multi-shaded leaves)
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.52, 64, Math.PI * 0.85, Math.PI * 2.15, false);
  ctx.stroke();

  // Wreath Leaves
  const leafCount = 9;
  for (let i = 0; i <= leafCount; i++) {
    const angleLeft = Math.PI * 0.85 + (i / leafCount) * (Math.PI * 0.6);
    const xl = width * 0.5 + Math.cos(angleLeft) * 64;
    const yl = height * 0.52 + Math.sin(angleLeft) * 64;
    
    // Shaded leaf (with gold and bronze tones)
    const leafLGrad = ctx.createRadialGradient(xl, yl, 1, xl, yl, 5);
    leafLGrad.addColorStop(0, '#fef08a');
    leafLGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = leafLGrad;
    ctx.beginPath();
    ctx.ellipse(xl, yl, 5.0, 2.5, angleLeft + Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    const angleRight = Math.PI * 2.15 - (i / leafCount) * (Math.PI * 0.6);
    const xr = width * 0.5 + Math.cos(angleRight) * 64;
    const yr = height * 0.52 + Math.sin(angleRight) * 64;
    
    const leafRGrad = ctx.createRadialGradient(xr, yr, 1, xr, yr, 5);
    leafRGrad.addColorStop(0, '#fef08a');
    leafRGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = leafRGrad;
    ctx.beginPath();
    ctx.ellipse(xr, yr, 5.0, 2.5, angleRight - Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. Central Gold/Bronze Medallion Core
  const coreGrad = ctx.createRadialGradient(width * 0.5, height * 0.50, 2, width * 0.5, height * 0.50, 16);
  coreGrad.addColorStop(0, '#fef08a'); // golden yellow
  coreGrad.addColorStop(0.7, '#d97706'); // golden brown
  coreGrad.addColorStop(1, '#78350f'); // bronze brown
  
  ctx.fillStyle = coreGrad;
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  const cxS = width * 0.5;
  const cyS = height * 0.50;
  ctx.arc(cxS, cyS, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#451a03'; // Deep contrast color for the letters
  ctx.font = '900 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TIE', cxS, cyS);

  ctx.restore();
}

export default function ThreeDRenderer({
  modelType,
  isAnimating = false,
  className = '',
  width = 300,
  height = 300,
}: ThreeDRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Particle pools to avoid garbage collection stuttering
  const firePoolRef = useRef<FireParticle[]>([]);
  const sparkPoolRef = useRef<SparkParticle[]>([]);
  const rainPoolRef = useRef<RainParticle[]>([]);
  const ripplePoolRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDestroyed = false;

    // Initialize rain pool for tiger
    if (modelType === 'tiger' && rainPoolRef.current.length === 0) {
      rainPoolRef.current = Array.from({ length: 25 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 15 + 10,
        speed: Math.random() * 8 + 6,
      }));
    }

    // Initialize sparkle stars for tie
    if (modelType === 'tie' && sparkPoolRef.current.length === 0) {
      sparkPoolRef.current = Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random(),
        life: Math.random() * 100,
        maxLife: Math.random() * 100 + 100,
      }));
    }

    // Initialize fire particles pool if empty
    if (modelType === 'dragon' && firePoolRef.current.length === 0) {
      firePoolRef.current = [];
    }

    // Main render loop
    const render = () => {
      if (isDestroyed) return;
      timeRef.current += isAnimating ? 0.03 : 0.01;
      const t = timeRef.current;

      // Dynamic High-DPI support for razor-sharp graphics
      const dpr = window.devicePixelRatio || 2.5;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // 1. DRAW PROCEDURAL EMBLEM ILLUSTRATION (Zero Images!)
      let scale = 1.0;
      if (isAnimating) {
        scale = 1.0 + Math.sin(t * 1.8) * 0.012; // breathing pulse
      } else {
        scale = 1.0 + Math.sin(t * 1.0) * 0.005;
      }

      if (modelType === 'dragon') {
        drawProceduralDragon(ctx, width, height, t, scale, isAnimating);
      } else if (modelType === 'tiger') {
        drawProceduralTiger(ctx, width, height, t, scale, isAnimating);
      } else {
        drawProceduralTie(ctx, width, height, t, scale, isAnimating);
      }

      // 2. OVERLAY RICH PARTICLE & WEATHER FX
      if (modelType === 'dragon') {
        // ==========================================
        // 🌋 VOLCANIC LAVA DRAGON EFFECTS
        // ==========================================

        // Dynamic fire particle generator
        const spawnCount = isAnimating ? 3 : 1;
        const mouthX = width * 0.46;
        const mouthY = height * 0.48;

        for (let s = 0; s < spawnCount; s++) {
          if (Math.random() > 0.3) {
            const angle = Math.PI * 0.85 + (Math.random() - 0.5) * 0.3;
            const speed = Math.random() * 2.8 + (isAnimating ? 3.0 : 1.5);
            firePoolRef.current.push({
              x: mouthX,
              y: mouthY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 8 + 3,
              alpha: 1.0,
              life: 0,
              maxLife: Math.random() * 25 + 20,
              color: 'white',
            });
          }
        }

        // Draw and update fire particles
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        firePoolRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.04; // slight rising gravity
          p.life++;

          const ageRatio = p.life / p.maxLife;
          p.alpha = 1.0 - ageRatio;
          p.size += 0.3; // expanding fire ball

          let r = 255, g = 255, b = 255;
          if (ageRatio > 0.15 && ageRatio <= 0.4) {
            g = 210; b = 30; // Gold
          } else if (ageRatio > 0.4 && ageRatio <= 0.7) {
            g = 120; b = 10; // Orange
          } else if (ageRatio > 0.7) {
            g = 20; b = 5; // Crimson
          }

          const fireGrad = ctx.createRadialGradient(p.x, p.y, p.size * 0.1, p.x, p.y, p.size);
          fireGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.95})`);
          fireGrad.addColorStop(0.3, `rgba(249, 115, 22, ${p.alpha * 0.85})`);
          fireGrad.addColorStop(0.7, `rgba(239, 68, 68, ${p.alpha * 0.4})`);
          fireGrad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = fireGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Clean up dead particles
        firePoolRef.current = firePoolRef.current.filter(p => p.life < p.maxLife);

        // Dragon Eye Flare
        const eyeX = width * 0.455;
        const eyeY = height * 0.41;
        const eyePulse = 1.0 + Math.sin(t * 4) * 0.22;

        const eyeGrad = ctx.createRadialGradient(eyeX, eyeY, 1, eyeX, eyeY, 14 * eyePulse);
        eyeGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        eyeGrad.addColorStop(0.2, 'rgba(239, 68, 68, 0.95)');
        eyeGrad.addColorStop(0.6, 'rgba(185, 28, 28, 0.45)');
        eyeGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = eyeGrad;
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 14 * eyePulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(eyeX - 25 * eyePulse, eyeY);
        ctx.lineTo(eyeX + 25 * eyePulse, eyeY);
        ctx.moveTo(eyeX, eyeY - 15 * eyePulse);
        ctx.lineTo(eyeX, eyeY + 15 * eyePulse);
        ctx.stroke();

        ctx.restore();
      } else if (modelType === 'tiger') {
        // ==========================================
        // ⛈️ ELECTRIC STORM TIGER EFFECTS
        // ==========================================
        ctx.save();
        ctx.strokeStyle = 'rgba(103, 232, 249, 0.16)';
        ctx.lineWidth = 1.0;

        // Update and draw rain streaks
        rainPoolRef.current.forEach((r) => {
          r.y += r.speed;
          r.x += 1.2;

          if (r.y > height * 0.82) {
            if (Math.random() > 0.85) {
              ripplePoolRef.current.push({
                x: r.x,
                y: height * 0.82 + Math.random() * 15,
                radius: 1,
                maxRadius: Math.random() * 8 + 5,
                alpha: 0.6,
              });
            }
            r.y = 0;
            r.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x - 2, r.y + r.length);
          ctx.stroke();
        });

        // Draw splashing ripples
        ripplePoolRef.current.forEach((rip) => {
          rip.radius += 0.35;
          rip.alpha = 1.0 - rip.radius / rip.maxRadius;

          ctx.strokeStyle = `rgba(34, 211, 238, ${rip.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.ellipse(rip.x, rip.y, rip.radius, rip.radius * 0.4, 0, 0, Math.PI * 2);
          ctx.stroke();
        });
        ripplePoolRef.current = ripplePoolRef.current.filter(rip => rip.radius < rip.maxRadius);

        // Crackling lightning bolts
        const strikingChance = isAnimating ? 0.09 : 0.04;
        if (Math.random() < strikingChance) {
          ctx.strokeStyle = '#ffffff';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 18;
          ctx.lineWidth = 1.5;

          let curX = Math.random() * width;
          let curY = 0;
          ctx.beginPath();
          ctx.moveTo(curX, curY);

          const segments = Math.floor(Math.random() * 5) + 4;
          for (let seg = 0; seg < segments; seg++) {
            const nextX = curX + (Math.random() - 0.5) * 44;
            const nextY = curY + (height / segments) * 0.9;
            ctx.lineTo(nextX, nextY);
            curX = nextX;
            curY = nextY;
          }
          ctx.stroke();
        }

        ctx.restore();
      } else {
        // ==========================================
        // 🏛️ ROMAN TIE EMBLEM EFFECTS
        // ==========================================
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const rayCount = 10;
        const cx = width / 2;
        const cy = height / 2;
        ctx.translate(cx, cy + Math.sin(t * 1.5) * 5); // lock to emblem hovering offset
        ctx.rotate(t * 0.12);

        for (let r = 0; r < rayCount; r++) {
          const angle = (r / rayCount) * Math.PI * 2;
          const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * width, Math.sin(angle) * height);
          rayGrad.addColorStop(0, 'rgba(250, 204, 21, 0.18)');
          rayGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.05)');
          rayGrad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, Math.max(width, height) * 0.8, angle - 0.08, angle + 0.08);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Sparkling golden stars
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        sparkPoolRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life++;

          p.vx += Math.sin(t + p.x) * 0.005;

          const sparkleAlpha = Math.sin(t * 4 + p.life) * 0.4 + 0.6;
          ctx.fillStyle = `rgba(250, 204, 21, ${sparkleAlpha * 0.85})`;
          ctx.beginPath();
          
          const cxStar = p.x;
          const cyStar = p.y;
          const rStar = p.size * (0.8 + sparkleAlpha * 0.4);
          
          ctx.moveTo(cxStar, cyStar - rStar * 1.8);
          ctx.quadraticCurveTo(cxStar, cyStar, cxStar + rStar * 1.8, cyStar);
          ctx.quadraticCurveTo(cxStar, cyStar, cxStar, cyStar + rStar * 1.8);
          ctx.quadraticCurveTo(cxStar, cyStar, cxStar - rStar * 1.8, cyStar);
          ctx.quadraticCurveTo(cxStar, cyStar, cxStar, cyStar - rStar * 1.8);
          ctx.closePath();
          ctx.fill();

          if (p.life > p.maxLife) {
            p.x = Math.random() * width;
            p.y = Math.random() * height;
            p.life = 0;
          }
        });

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [modelType, isAnimating, width, height]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`} id={`3d-${modelType}`}>
      <div className="absolute inset-0 border border-amber-500/20 rounded-2xl pointer-events-none" />
      <div className="absolute top-2 left-2 text-[8px] font-bold tracking-widest text-amber-400/40 uppercase font-mono select-none">
        {modelType === 'dragon' ? 'DRACO 3D • ULTRA HD' : modelType === 'tiger' ? 'TIGRIS 3D • ULTRA HD' : 'TIE IMPERIALIS'}
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="object-cover select-none pointer-events-none"
      />
    </div>
  );
}
