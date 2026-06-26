import React, { useState } from "react";
import "./App.css";
import backgroundImg from "./assets/background.png";

// Import Helper Components
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import FloatingHearts from "./components/FloatingHearts";
import MusicPlayer from "./components/MusicPlayer";

// Import Section Components
import Hero from "./components/Hero";
import LoveLetter from "./components/LoveLetter";
import ThingsILove from "./components/ThingsILove";
import OpenWhen from "./components/OpenWhen";
import Memories from "./components/Memories";
import Surprise from "./components/Surprise";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  // Trigger when user clicks "Open Letter" on Hero Page
  const handleOpenLetter = () => {
    setLetterOpened(true);
    setPlayMusic(true);
  };

  return (
    <>
      {/* Custom trail cursor (Disabled on Mobile) */}
      <CustomCursor />

      {/* Floating starry night & heart background */}
      <FloatingHearts />

      {/* Subtle photo background watermark */}
      <div className="photo-background" style={{ backgroundImage: `url(${backgroundImg})` }} />

      {/* Intro Loading Overlay */}
      <Loader onFinish={() => setIsLoaded(true)} />

      {isLoaded && (
        <div className="app-container">
          {/* Sticky Navigation */}
          <Navbar />

          {/* Floating background audio control */}
          <MusicPlayer autoPlayTrigger={playMusic} />

          {/* Main Layout Sections */}
          <main>
            {/* Landing page */}
            <Hero onOpenLetter={handleOpenLetter} />

            {/* Glassmorphic letter card */}
            <LoveLetter isOpen={letterOpened} setIsOpen={setLetterOpened} />

            {/* Things I Love list */}
            <ThingsILove />

            {/* Open when comfort letters */}
            <OpenWhen />

            {/* Polaroid Memory gallery */}
            <Memories />

            {/* Final surprise declaration and confetti */}
            <Surprise />
          </main>

          {/* Footer */}
          <footer
            style={{
              padding: "40px 20px",
              textAlign: "center",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              borderTop: "1px solid rgba(255, 77, 128, 0.08)",
              background: "rgba(7, 5, 10, 0.4)",
              backdropFilter: "blur(4px)",
              zIndex: 10,
              position: "relative"
            }}
          >
            <p style={{ margin: "0 0 8px" }}>
              Made with ❤️ by Ikhlass for Baby Mohamed
            </p>
            <p style={{ fontSize: "0.75rem", opacity: 0.6, margin: 0 }}>
              &copy; {new Date().getFullYear()} - Keeping our moments alive.
            </p>
          </footer>
        </div>
      )}
    </>
  );
}
