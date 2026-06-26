import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Calendar, Edit3, Heart } from "lucide-react";
import styles from "./LoveLetter.module.css";
import { loveData } from "../config/loveData";

export default function LoveLetter({ isOpen, setIsOpen }) {
  const [typedContent, setTypedContent] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [editableText, setEditableText] = useState(loveData.loveLetter.letterText);
  const [isEditing, setIsEditing] = useState(false);
  const letterTextRef = useRef(loveData.loveLetter.letterText);

  // Synchronize initial letter text if config changes
  useEffect(() => {
    setEditableText(loveData.loveLetter.letterText);
    letterTextRef.current = loveData.loveLetter.letterText;
  }, []);

  // Handle character-by-character typing once letter is opened
  useEffect(() => {
    if (!isOpen) {
      setTypedContent("");
      setCharIndex(0);
      return;
    }

    if (charIndex < editableText.length) {
      const timer = setTimeout(() => {
        // Support typing speed
        setTypedContent((prev) => prev + editableText.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 15); // Adjust typing speed here
      return () => clearTimeout(timer);
    }
  }, [isOpen, charIndex, editableText]);

  // Update text when user edits it on screen
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setEditableText(newText);
    letterTextRef.current = newText;
    // Reset typing effect so it starts typing the newly edited section or just stays complete
    setTypedContent(newText);
    setCharIndex(newText.length);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="section-container">
      <div className={styles.container}>
        <h2 className="section-title">A Message From My Heart</h2>

        <div className={styles.envelopeWrapper}>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Envelope Closed state */
              <motion.div
                key="closed"
                className={styles.envelopeClosed}
                onClick={toggleOpen}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.envelopeSeal}>
                  <Heart fill="#ff4d80" size={32} className={styles.sealHeart} />
                </div>
                <div className={styles.envelopeFront}>
                  <Mail size={48} className={styles.mailIcon} />
                  <p className={styles.envelopeLabel}>For Baby Mohamed</p>
                  <span className={styles.clickPrompt}>Click to open</span>
                </div>
              </motion.div>
            ) : (
              /* Envelope Open State revealing the Scroll/Letter */
              <motion.div
                key="open"
                className={styles.envelopeOpenWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Envelope Base background */}
                <div className={styles.envelopeBack}>
                  <button className={styles.closeBtn} onClick={toggleOpen}>
                    Close Letter
                  </button>
                </div>

                {/* The Paper Letter Card */}
                <motion.div
                  className={styles.letterPaper}
                  initial={{ y: 200, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 70 }}
                >
                  <div className={styles.paperHeader}>
                    <div className={styles.dateStamp}>
                      <Calendar size={14} className={styles.paperHeaderIcon} />
                      <span>{loveData.loveLetter.date}</span>
                    </div>
                    <button 
                      className={`${styles.editToggle} ${isEditing ? styles.activeEdit : ""}`}
                      onClick={() => setIsEditing(!isEditing)}
                      title="Edit letter content"
                    >
                      <Edit3 size={14} />
                      <span>{isEditing ? "Done" : "Edit"}</span>
                    </button>
                  </div>

                  <div className={styles.letterBody}>
                    {isEditing ? (
                      <textarea
                        className={styles.letterTextarea}
                        value={editableText}
                        onChange={handleTextChange}
                        rows={12}
                        placeholder={loveData.loveLetter.editablePlaceholder}
                      />
                    ) : (
                      /* Renders typed content */
                      <p className={styles.letterParagraphs}>
                        {typedContent}
                        {charIndex < editableText.length && (
                          <span className={styles.typingCursor}>_</span>
                        )}
                      </p>
                    )}
                  </div>

                  <div className={styles.paperFooter}>
                    <p className={styles.signatureLabel}>From your favorite,</p>
                    <p className={styles.signature}>{loveData.loveLetter.signature}</p>
                    <div className={styles.footerHeart}>❤️</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
