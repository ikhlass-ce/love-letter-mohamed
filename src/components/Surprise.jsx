import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import styles from "./Surprise.module.css";
import { loveData } from "../config/loveData";

export default function Surprise() {
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerConfettiSurprise = () => {
    setIsRevealed(true);

    // Blast 1: center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d80", "#ff7ea5", "#fcc200", "#ffffff"]
    });

    // Blast 2: left side shooting right
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#ff4d80", "#ff7ea5", "#ffa3be"]
      });
    }, 250);

    // Blast 3: right side shooting left
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#ff4d80", "#fcc200", "#ffffff"]
      });
    }, 400);
  };

  return (
    <section id="surprise" className="section-container">
      <div className={styles.container}>
        {/* Glow backdrop behind final container */}
        <div className={styles.glowingOrb} />

        <div className={styles.contentCard}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.finalGreetingWrapper}
          >
            {/* Pulsing Beating Heart */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1, 1.15, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={styles.heartWrapper}
            >
              <Heart fill="#ff4d80" size={56} className={styles.bigHeart} />
            </motion.div>

            {/* Glowing Header */}
            <h2 className={`${styles.mainHeading} glow-pink`}>
              {loveData.surprise.heading}
            </h2>
            <p className={styles.subHeading}>{loveData.surprise.subheading}</p>
          </motion.div>

          <div className={styles.revealArea}>
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                /* Interactive Button */
                <motion.button
                  key="button"
                  className={styles.revealBtn}
                  onClick={triggerConfettiSurprise}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles size={16} className={styles.sparkleIcon} />
                  <span>{loveData.surprise.revealButtonText}</span>
                  <Sparkles size={16} className={styles.sparkleIcon} />
                </motion.button>
              ) : (
                /* Revealed Love Secret Box */
                <motion.div
                  key="secret"
                  className={styles.secretBox}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <p className={styles.secretText}>
                    "{loveData.surprise.finalMessage}"
                  </p>
                  
                  <span className={styles.foreverTag}>
                    Forever Yours, Ikhlass ❤️
                  </span>
                  
                  <motion.button 
                    className={styles.resetBtn}
                    onClick={() => setIsRevealed(false)}
                    whileHover={{ scale: 1.05 }}
                  >
                    Close & Sparkle Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
