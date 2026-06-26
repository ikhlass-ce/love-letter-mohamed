import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import styles from "./ThingsILove.module.css";
import { loveData } from "../config/loveData";

// Animation configuration for container stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

export default function ThingsILove() {
  return (
    <section id="things" className="section-container">
      <div className={styles.container}>
        <h2 className="section-title">Things I Love About You</h2>
        <p className={styles.sectionSubtitle}>
          Just a few of the infinite reasons why you mean the world to me.
        </p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loveData.thingsILove.map((item) => {
            // Dynamically resolve Lucide Icon
            const IconComponent = Icons[item.icon] || Icons.Heart;

            return (
              <motion.div
                key={item.id}
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  borderColor: "rgba(255, 77, 128, 0.6)",
                  boxShadow: "0 12px 30px rgba(255, 77, 128, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing Background Glow Filter */}
                <div className={styles.cardGlow} />

                {/* Floating Icon Wrapper */}
                <div className={styles.iconContainer}>
                  <IconComponent size={28} className={styles.cardIcon} />
                </div>

                {/* Card Info */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
