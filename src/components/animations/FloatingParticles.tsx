"use client";

import { useEffect, useRef, useCallback } from "react";

interface FloatingParticlesProps {
  count?: number;
  speed?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeDirection: number;
  colorIndex: number;
}

// Warm saffron/gold tones — like sparks from a diya
const WARM_COLORS = [
  "224,124,36",   // saffron #E07C24
  "200,169,81",   // gold #C8A951
  "220,192,120",  // light gold #DCC078
  "240,160,80",   // light saffron #F0A050
  "237,216,184",  // sandal-light #EDD8B8
  "193,105,79",   // terra #C1694F
];

export default function FloatingParticles({
  count = 40,
  speed = 0.5,
  className = "",
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Some particles are larger — like flower petals or diya sparks
          size: Math.random() > 0.85 ? Math.random() * 5 + 3 : Math.random() * 3 + 1,
          speedY: -(Math.random() * speed + 0.1),
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          fadeDirection: Math.random() > 0.5 ? 1 : -1,
          colorIndex: Math.floor(Math.random() * WARM_COLORS.length),
        });
      }
      return particles;
    },
    [count, speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeDirection * 0.003;

        if (p.opacity >= 0.6) p.fadeDirection = -1;
        if (p.opacity <= 0.05) p.fadeDirection = 1;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const color = WARM_COLORS[p.colorIndex];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity})`;
        ctx.fill();

        // Add a soft glow around larger particles
        if (p.size > 3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${p.opacity * 0.15})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
