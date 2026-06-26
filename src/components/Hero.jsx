import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";
import { loveData } from "../config/loveData";

export default function Hero({ onOpenLetter }) {
  const [typedText, setTypedText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const sentences = loveData.hero.typingSentences;

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];
    let typingSpeed = isDeleting ? 30 : 70;

    // Pause when fully typed
    if (!isDeleting && charIndex === currentSentence.length) {
      typingSpeed = 2000; // Pause for 2 seconds
      setIsDeleting(true);
    } 
    // Pause when fully deleted
    else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setSentenceIndex((prev) => (prev + 1) % sentences.length);
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentSentence.substring(0, charIndex - 1)
          : currentSentence.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, sentenceIndex, sentences]);

  const handleOpenClick = () => {
    onOpenLetter();
    const letterSection = document.getElementById("letter");
    if (letterSection) {
      letterSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Floating heart icon above title */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={styles.topHeart}
        >
          <Heart fill="#ff4d80" size={48} className={styles.heartGlow} />
        </motion.div>

        {/* Big Animated Title */}
        <motion.h1 
          className={styles.title}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {loveData.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {loveData.hero.subtitle}
        </motion.h2>

        {/* Typing Animation Area */}
        <div className={styles.typewriterWrapper}>
          <span className={styles.typewriterText}>{typedText}</span>
          <span className={styles.cursor}>|</span>
        </div>

        {/* Action Button */}
        <motion.button
          className={styles.openBtn}
          onClick={handleOpenClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span>{loveData.hero.buttonText}</span>
          <Heart size={16} fill="white" className={styles.btnHeart} />
        </motion.button>
      </motion.div>

      {/* Down Chevron indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        onClick={handleOpenClick}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
