import React, { useState, useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [trails, setTrails] = useState([]);
  const trailIdRef = useRef(0);
  const lastSpawnRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile/touch device
    const checkDevice = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // Mouse movement handler
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      // Calculate distance from last heart spawn
      const dx = x - lastSpawnRef.current.x;
      const dy = y - lastSpawnRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Spawn a heart if the mouse moved more than 35 pixels
      if (distance > 35) {
        const id = trailIdRef.current++;
        // Randomize some styles
        const size = Math.random() * 12 + 8; // 8px to 20px
        const rotate = Math.random() * 40 - 20; // -20deg to 20deg
        const color = ["#ff4d80", "#ff7ea5", "#ffb3c6", "#fcc200"][
          Math.floor(Math.random() * 4)
        ];

        setTrails((prev) => [
          ...prev,
          { id, x, y, size, rotate, color },
        ]);

        // Keep trails light
        setTrails((prev) => (prev.length > 15 ? prev.slice(prev.length - 15) : prev));
        lastSpawnRef.current = { x, y };
      }
    };

    // Detect if cursor is hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(`[role="button"]`) ||
        target.classList.contains("interactive");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Periodically clean up old trails
    const cleanupInterval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 600);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(cleanupInterval);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Primary custom cursor pointer */}
      <div
        className={`${styles.cursorRing} ${isHovered ? styles.cursorHover : ""}`}
        style={{
          transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
        }}
      />
      <div
        className={styles.cursorDot}
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      />

      {/* Floating trail hearts */}
      {trails.map((trail) => (
        <span
          key={trail.id}
          className={styles.trailHeart}
          style={{
            left: trail.x,
            top: trail.y,
            fontSize: `${trail.size}px`,
            color: trail.color,
            transform: `translate3d(-50%, -50%, 0) rotate(${trail.rotate}deg)`,
          }}
        >
          ❤️
        </span>
      ))}
    </>
  );
}
