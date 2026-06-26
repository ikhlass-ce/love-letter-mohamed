import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Camera } from "lucide-react";
import styles from "./Memories.module.css";
import { loveData } from "../config/loveData";

export default function Memories() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close lightbox on escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine organic rotation based on ID
  const getRotation = (id) => {
    const rotations = [-3, 3, -2, 2];
    return rotations[(id - 1) % rotations.length];
  };

  return (
    <section id="memories" className="section-container">
      <div className={styles.container}>
        <h2 className="section-title">Our Sweet Memories</h2>
        <p className={styles.sectionSubtitle}>
          Moments frozen in time, keeping the warmth of our journey alive.
        </p>

        {/* Polaroid Board */}
        <div className={styles.polaroidGrid}>
          {loveData.memories.map((photo) => (
            <motion.div
              key={photo.id}
              className={styles.polaroidCard}
              onClick={() => setSelectedPhoto(photo)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ rotate: `${getRotation(photo.id)}deg` }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                y: -10,
                zIndex: 20,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
              }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            >
              {/* Photo Frame Container */}
              <div className={styles.imageWrapper}>
                <img
                  src={photo.image}
                  alt={photo.title}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <Camera size={24} className={styles.cameraIcon} />
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className={styles.polaroidText}>
                <p className={styles.photoTitle}>{photo.title}</p>
                <div className={styles.dateRow}>
                  <Calendar size={12} className={styles.dateIcon} />
                  <span className={styles.photoDate}>{photo.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox / Zoom Overlay */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className={styles.lightboxOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                className={styles.lightboxContent}
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className={styles.closeButton}
                  onClick={() => setSelectedPhoto(null)}
                  title="Close lightbox"
                >
                  <X size={20} />
                </button>

                {/* Left Side: Large Image */}
                <div className={styles.lightboxImageWrapper}>
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className={styles.lightboxImage}
                  />
                </div>

                {/* Right Side: Information Card */}
                <div className={styles.lightboxInfo}>
                  <div className={styles.lightboxHeader}>
                    <span className={styles.lightboxDate}>
                      <Calendar size={14} />
                      {selectedPhoto.date}
                    </span>
                    <h3 className={styles.lightboxTitle}>{selectedPhoto.title}</h3>
                  </div>
                  <p className={styles.lightboxDescription}>
                    {selectedPhoto.description}
                  </p>
                  <div className={styles.lightboxFooter}>
                    <span>I cherish this moment with you ❤️</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
