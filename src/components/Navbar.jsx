import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "letter", label: "Our Letter" },
  { id: "things", label: "What I Love" },
  { id: "open", label: "Open When" },
  { id: "memories", label: "Memories" },
  { id: "surprise", label: "Gift" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Brand / Logo */}
        <a href="#hero" className={styles.logo} onClick={(e) => handleLinkClick(e, "hero")}>
          I<Heart size={14} className={styles.logoHeart} fill="#ff4d80" />M
        </a>

        {/* Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`${styles.navLink} ${activeSection === link.id ? styles.active : ""}`}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
