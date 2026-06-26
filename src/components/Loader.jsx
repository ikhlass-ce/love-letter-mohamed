import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import styles from "./Loader.module.css";

const loadingTexts = [
  "Gathering stardust...",
  "Writing down my feelings...",
  "Decorating our secret place...",
  "Almost ready, Baby Mohamed..."
];

export default function Loader({ onFinish }) {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle text
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);

    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 600); // Wait for fadeout animation
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.loaderOverlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={styles.loaderContent}>
            {/* Beating Heart Icon */}
            <motion.div
              className={styles.heartWrapper}
              animate={{
                scale: [1, 1.25, 1, 1.25, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className={styles.loaderHeart} fill="#ff4d80" size={80} />
            </motion.div>

            {/* Glowing Message */}
            <motion.p
              key={textIndex}
              className={styles.loaderText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {loadingTexts[textIndex]}
            </motion.p>

            {/* Progress Bar Container */}
            <div className={styles.progressContainer}>
              <motion.div
                className={styles.progressBar}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className={styles.percentage}>{Math.min(progress, 100)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
