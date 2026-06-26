import React, { useEffect, useRef } from "react";

export default function FloatingHearts() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let hearts = [];

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Draw heart function on Canvas
    const drawHeart = (ctx, x, y, size, color, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      
      // Shadow for glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      // Left curve
      ctx.quadraticCurveTo(x, y, x - size / 2, y);
      ctx.quadraticCurveTo(x - size, y, x - size, y + size / 2);
      ctx.quadraticCurveTo(x - size, y + (size * 3) / 4, x - size / 2, y + size);
      // Bottom tip
      ctx.lineTo(x, y + size * 1.25);
      // Right curve
      ctx.lineTo(x + size / 2, y + size);
      ctx.quadraticCurveTo(x + size, y + (size * 3) / 4, x + size, y + size / 2);
      ctx.quadraticCurveTo(x + size, y, x + size / 2, y);
      ctx.quadraticCurveTo(x, y, x, y + size / 4);
      
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Initialize particles
    const initParticles = () => {
      stars = [];
      hearts = [];

      const width = canvas.width;
      const height = canvas.height;

      // Populate stars
      const starCount = Math.floor((width * height) / 8000); // Scaled to screen resolution
      for (let i = 0; i < Math.min(starCount, 150); i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          blinkSpeed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.3 ? "#ffffff" : "#fcc200",
        });
      }

      // Populate initial hearts
      const heartCount = Math.floor((width * height) / 40000); // Less dense
      for (let i = 0; i < Math.min(heartCount, 25); i++) {
        hearts.push(createNewHeart(width, height, true));
      }
    };

    // Helper to create a new heart particle
    const createNewHeart = (width, height, randomizeY = false) => {
      const colors = ["#ff4d80", "#ff7ea5", "#ffa3be", "#fcc200"];
      return {
        x: Math.random() * width,
        y: randomizeY ? Math.random() * height : height + 50,
        size: Math.random() * 8 + 6, // 6px to 14px
        speedY: Math.random() * 0.8 + 0.4, // speed of rising
        speedX: Math.random() * 0.4 - 0.2, // horizontal sway
        opacity: Math.random() * 0.4 + 0.15, // soft opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        swayAmplitude: Math.random() * 20 + 5,
        swaySpeed: Math.random() * 0.01 + 0.005,
        angle: Math.random() * Math.PI * 2,
      };
    };

    // Animation Loop
    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear with slight trailing opacity for motion blur, if desired (here we do clean clear)
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update Stars
      stars.forEach((star) => {
        // Blinking calculation
        star.opacity += star.blinkSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.blinkSpeed = -star.blinkSpeed;
        }

        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw and update Hearts
      hearts.forEach((heart, idx) => {
        // Move heart up
        heart.y -= heart.speedY;
        heart.angle += heart.swaySpeed;
        
        // Horizontal sway
        const swayX = Math.sin(heart.angle) * heart.swayAmplitude * 0.05;
        heart.x += heart.speedX + swayX;

        // Draw the heart
        drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.opacity);

        // Recycle if out of bounds
        if (heart.y < -30 || heart.x < -30 || heart.x > width + 30) {
          hearts[idx] = createNewHeart(width, height, false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Listeners
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Trigger first load
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
