import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "../contexts/LanguageContext";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
const introVideo = "/imports/Video_Project_4__1_.mp4";
interface ThankYouScreenProps {
  onReset: () => void;
}

export function ThankYouScreen({ onReset }: ThankYouScreenProps) {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(60);
  const [showBg, setShowBg] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = bgVideoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      // Start crossfade 1.5 seconds before the end
      if (video.duration - video.currentTime <= 1.5 && !showBg) {
        setShowBg(true);
      }
    };

    const handleEnded = () => {
      setShowBg(true);
      // Remove intro video a bit after it ends so crossfade completes
      setTimeout(() => setHideIntro(true), 800);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [showBg]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => onReset(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onReset]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Intro video layer */}
      <AnimatePresence>
        {!hideIntro && (
          <motion.div
            className="absolute inset-0 z-30"
            initial={{ opacity: 1 }}
            animate={{ opacity: showBg ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <video
              ref={introVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={introVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background ice video — fades in simultaneously with intro fading out */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showBg ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true;
            e.currentTarget.volume = 0;
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/30" />
      </motion.div>

      {/* Content — fades in over the intro video */}
      <motion.div
        className="relative z-40 h-full flex flex-col items-center justify-center px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* NHL Logo */}
        <motion.div
          className="absolute left-0 right-0 flex justify-center"
          style={{ top: "16px" }}
        >
          <img src={logoSrc} alt="NHL" style={{ height: 400, width: "auto" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center w-full"
          style={{ paddingLeft: 60, paddingRight: 60 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="font-black text-black"
            style={{ fontSize: 140, marginBottom: 40, textShadow: "0 2px 12px rgba(255,255,255,0.9)" }}
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="font-bold text-black text-center"
            style={{ fontSize: 52, marginBottom: 80, textShadow: "0 2px 12px rgba(255,255,255,0.9)" }}
          >
            Check your email for your<br />15% off discount code!
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            onClick={onReset}
            className="text-white rounded-full font-black hover:shadow-lg transition-all"
            style={{ paddingLeft: 120, paddingRight: 120, paddingTop: 50, paddingBottom: 50, fontSize: 56, background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
