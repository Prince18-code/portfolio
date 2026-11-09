"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  radius: number;
  opacity: number;
  phase: number;
  twinkleSpeed: number;
};

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const starCount = Math.max(100, Math.min(1200, Math.round((window.innerWidth * window.innerHeight) / 1100)));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 1.5,
      radius: 0.3 + Math.random() * 0.85,
      opacity: 0.2 + Math.random() * 0.58,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 1.2,
    }));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reduceMotion) draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const angleX = reduceMotion ? 0 : time * 0.001 / 10;
      const angleY = reduceMotion ? 0 : time * 0.001 / 15;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      for (const star of stars) {
        const shimmer = reduceMotion ? 1 : 0.72 + Math.sin(time * 0.001 * star.twinkleSpeed + star.phase) * 0.28;
        const alpha = star.opacity * shimmer;
        const rotatedY = star.y * cosX - star.z * sinX;
        const depthAfterX = star.y * sinX + star.z * cosX;
        const rotatedX = star.x * cosY + depthAfterX * sinY;
        const depth = -star.x * sinY + depthAfterX * cosY;
        const perspective = 1 / (1.25 + depth * 0.12);
        const x = width / 2 + rotatedX * width * 0.72 * perspective;
        const y = height / 2 + rotatedY * height * 0.72 * perspective;
        context.fillStyle = `rgba(236, 229, 255, ${alpha})`;
        context.beginPath();
        context.arc(x, y, star.radius * (1 + depth * 0.15), 0, Math.PI * 2);
        context.fill();
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />;
}
