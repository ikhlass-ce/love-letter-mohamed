import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MusicPlayer.module.css";
import { loveData } from "../config/loveData";

export default function MusicPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Auto-play when trigger becomes true
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      playAudioWithFade();
    }
  }, [autoPlayTrigger]);

  const playAudioWithFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        // Fade in volume slowly
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          if (audio.volume >= 0.4) {
            audio.volume = 0.4;
            clearInterval(fadeIntervalRef.current);
          } else {
            audio.volume = Math.min(audio.volume + 0.05, 0.4);
          }
        }, 100);
      })
      .catch((err) => {
        console.log("Autoplay blocked by browser. Awaiting user click.", err);
      });
  };

  const pauseAudioWithFade = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(fadeIntervalRef.current);
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume <= 0.05) {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = Math.max(audio.volume - 0.05, 0);
      }
    }, 50);
  };

  const handleToggle = () => {
    if (isPlaying) {
      pauseAudioWithFade();
    } else {
      playAudioWithFade();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <div className={styles.musicContainer}>
      <audio
        ref={audioRef}
        src={loveData.musicUrl}
        loop
      />
      
      <motion.button
        className={`${styles.floatingBtn} ${isPlaying ? styles.pulseGlow : ""}`}
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Pause music" : "Play music"}
        aria-label="Toggle background music"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.iconWrapper}
            >
              <Volume2 size={20} className={styles.musicIcon} />
              {/* Little floating music note */}
              <motion.span
                className={styles.floatingNote}
                animate={{
                  y: [-5, -20, -10],
                  x: [0, 8, 12],
                  opacity: [0, 1, 0],
                  scale: [0.6, 1.1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <Music size={8} />
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={20} className={styles.mutedIcon} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
