import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Mail, X } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
const introVideo = "/imports/Video_Project_4__1_.mp4";
interface ThankYouScreenProps {
  email: string;
  onReset: () => void;
}

export function ThankYouScreen({ email, onReset }: ThankYouScreenProps) {
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

      {/* Demo email preview */}
      <motion.div
        className="relative z-40 h-full flex flex-col items-center justify-center"
        style={{ padding: "210px 58px 48px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="absolute left-0 right-0 flex justify-center"
          style={{ top: 14 }}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <img src={logoSrc} alt="NHL" style={{ height: 170, width: "auto" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="w-full flex flex-col items-center text-center"
        >
          <div
            className="inline-flex items-center bg-white font-black text-black"
            style={{
              gap: 14,
              fontSize: 26,
              padding: "13px 24px",
              border: "2px solid rgba(0,0,0,0.14)",
              borderRadius: 30,
              marginBottom: 22,
              boxShadow: "0 8px 26px rgba(0,0,0,0.16)",
            }}
          >
            <CheckCircle2 style={{ width: 34, height: 34, color: "#16a34a" }} strokeWidth={3} />
            DEMO EMAIL PREVIEW
          </div>

          <h1
            className="font-black text-white"
            style={{ fontSize: 76, lineHeight: 1.02, marginBottom: 14, textShadow: "0 3px 14px rgba(0,0,0,0.95)" }}
          >
            Your Reward Is Ready
          </h1>
          <p
            className="font-bold"
            style={{
              fontSize: 30,
              color: "rgba(255,255,255,0.84)",
              marginBottom: 30,
              maxWidth: 860,
              overflowWrap: "anywhere",
              textShadow: "0 2px 10px rgba(0,0,0,0.95)",
            }}
          >
            Preview prepared for <span className="text-white">{email || "your@email.com"}</span>
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="w-full bg-white text-left overflow-hidden"
            style={{
              borderRadius: 8,
              border: "2px solid rgba(0,0,0,0.15)",
              boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
            }}
          >
            <div
              className="flex items-center justify-between bg-black text-white"
              style={{ padding: "20px 30px" }}
            >
              <div className="flex items-center" style={{ gap: 20 }}>
                <img src={logoSrc} alt="" style={{ width: 70, height: 70, objectFit: "contain" }} />
                <div>
                  <p className="font-black" style={{ fontSize: 28, lineHeight: 1 }}>
                    NHL SHOP REWARDS
                  </p>
                  <p style={{ fontSize: 20, color: "rgba(255,255,255,0.62)", marginTop: 7 }}>
                    Fan appreciation email
                  </p>
                </div>
              </div>
              <Mail style={{ width: 42, height: 42, color: "rgba(255,255,255,0.8)" }} strokeWidth={2} />
            </div>

            <div style={{ padding: "28px 38px 30px" }}>
              <div className="flex items-start justify-between" style={{ gap: 24, marginBottom: 22 }}>
                <div style={{ minWidth: 0 }}>
                  <p className="font-black text-black" style={{ fontSize: 25 }}>
                    NHL Shop Rewards
                  </p>
                  <p style={{ fontSize: 21, color: "#6b7280", marginTop: 4, overflowWrap: "anywhere" }}>
                    To: {email || "your@email.com"}
                  </p>
                </div>
                <p style={{ fontSize: 20, color: "#9ca3af", flexShrink: 0 }}>Just now</p>
              </div>

              <h2 className="font-black text-black" style={{ fontSize: 40, lineHeight: 1.08, marginBottom: 20 }}>
                Your 15% Off Reward Is Here
              </h2>
              <div style={{ height: 2, background: "#e5e7eb", marginBottom: 22 }} />

              <h3 className="font-black text-black" style={{ fontSize: 34, marginBottom: 10 }}>
                Thanks for visiting!
              </h3>
              <p style={{ fontSize: 27, lineHeight: 1.35, color: "#374151", marginBottom: 22 }}>
                Enjoy 15% off your next in-store purchase. Show this reward at checkout when you shop with us again.
              </p>

              <div
                className="text-center"
                style={{
                  background: "#f3f4f6",
                  border: "3px dashed #111827",
                  borderRadius: 6,
                  padding: "22px 24px",
                  marginBottom: 22,
                }}
              >
                <p className="font-black" style={{ fontSize: 21, color: "#6b7280" }}>
                  YOUR 15% OFF CODE
                </p>
                <p className="font-black text-black" style={{ fontSize: 62, lineHeight: 1, marginTop: 10 }}>
                  NHL15
                </p>
                <p style={{ fontSize: 21, color: "#6b7280", marginTop: 12 }}>
                  Present this code during your next store visit.
                </p>
              </div>

              <div
                className="flex items-center justify-center font-black text-white"
                style={{
                  minHeight: 84,
                  fontSize: 30,
                  background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)",
                  borderRadius: 6,
                }}
              >
                SHOP NHL GEAR
              </div>
              <p className="text-center" style={{ fontSize: 19, color: "#9ca3af", marginTop: 16 }}>
                Demo code for presentation purposes.
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.95 }}
            onClick={onReset}
            className="flex items-center justify-center font-black text-white"
            style={{
              width: 620,
              minHeight: 104,
              gap: 16,
              fontSize: 38,
              marginTop: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)",
              border: "2px solid rgba(255,255,255,0.8)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <X style={{ width: 40, height: 40 }} strokeWidth={2.6} />
            Close Preview
          </motion.button>
          <p
            style={{
              fontSize: 21,
              color: "rgba(255,255,255,0.78)",
              marginTop: 16,
              textShadow: "0 2px 8px rgba(0,0,0,0.95)",
            }}
          >
            Returning home in {countdown} seconds
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
