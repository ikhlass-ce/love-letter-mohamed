import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, MailOpen, Heart } from "lucide-react";
import styles from "./OpenWhen.module.css";
import { loveData } from "../config/loveData";

export default function OpenWhen() {
  const [activeLetter, setActiveLetter] = useState(null);

  // Close modal on escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveLetter(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="open" className="section-container">
      <div className={styles.container}>
        <h2 className="section-title">Open When...</h2>
        <p className={styles.sectionSubtitle}>
          Comfort zones for you, whenever you need them.
        </p>

        {/* Envelope Grid */}
        <div className={styles.envelopeGrid}>
          {loveData.openWhen.map((item) => (
            <motion.div
              key={item.id}
              className={styles.envelopeCard}
              onClick={() => setActiveLetter(item)}
              whileHover={{
                scale: 1.03,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={styles.cardHeader}>
                <Mail size={32} className={styles.mailIcon} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.shortDescription}</p>
              <span className={styles.openPrompt}>Read Letter</span>
            </motion.div>
          ))}
        </div>

        {/* Detailed letter modal overlay */}
        <AnimatePresence>
          {activeLetter && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLetter(null)}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 50, scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 120 }}
                onClick={(e) => e.stopPropagation()} // Stop propagation
              >
                {/* Close Button */}
                <button
                  className={styles.closeButton}
                  onClick={() => setActiveLetter(null)}
                  title="Close letter"
                >
                  <X size={20} />
                </button>

                {/* Modal Title */}
                <div className={styles.modalHeader}>
                  <MailOpen size={24} className={styles.modalIcon} />
                  <h3>{activeLetter.title}</h3>
                </div>

                {/* Modal Body */}
                <div className={styles.modalBody}>
                  <p className={styles.modalLetterText}>{activeLetter.letter}</p>
                </div>

                {/* Modal Footer */}
                <div className={styles.modalFooter}>
                  <span>With all my love,</span>
                  <p className={styles.modalSig}>Ikhlass</p>
                  <Heart size={12} fill="#ff4d80" className={styles.pulseHeart} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
