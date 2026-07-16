import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LoaderCircle, Mail } from "lucide-react";
import { SurveyNavigation } from "./SurveyNavigation";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
interface EmailCaptureScreenProps {
  onContinue: (email: string) => void;
  onHome: () => void;
}

export function EmailCaptureScreen({ onContinue, onHome }: EmailCaptureScreenProps) {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.muted = true; video.volume = 0; }
  }, []);

  useEffect(() => {
    return () => {
      if (sendTimerRef.current) clearTimeout(sendTimerRef.current);
    };
  }, []);

  const isValid = email.includes("@") && email.includes(".");

  const handleContinue = () => {
    if (!isValid || isSending) return;
    setIsSending(true);
    sendTimerRef.current = setTimeout(() => onContinue(email.trim()), 1800);
  };

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70"
        onLoadedMetadata={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0; }}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/30" />

      {/* NHL Logo */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="absolute left-0 right-0 z-20 flex justify-center" style={{ top: 16 }}>
        <img src={logoSrc} alt="NHL" style={{ height: 200, width: "auto" }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center" style={{ paddingLeft: 72, paddingRight: 72 }}>
        <AnimatePresence mode="wait">
          {!isSending ? (
            <motion.div
              key="email-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
              className="w-full text-center"
            >

              {/* Badge */}
              <div className="inline-flex items-center justify-center rounded-full font-black text-white" style={{ background: "var(--action-blue-gradient)", fontSize: 48, paddingLeft: 48, paddingRight: 48, paddingTop: 20, paddingBottom: 20, marginBottom: 48 }}>
                GET 10% OFF
              </div>

              <h1 className="font-black text-black leading-tight" style={{ fontSize: 72, marginBottom: 24 }}>
                Get 10% Off Your<br />Next In Store Purchase
              </h1>

              <p className="text-black/60" style={{ fontSize: 40, marginBottom: 60 }}>
                Please enter your email address
              </p>

              {/* Email input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-2xl border-2 border-gray-300 bg-white text-black focus:outline-none focus:border-black transition-all"
                style={{ fontSize: 48, padding: "36px 40px", marginBottom: 48 }}
              />

              {/* Continue button */}
              <motion.button
                onClick={handleContinue}
                disabled={!isValid}
                className="w-full font-black text-white rounded-2xl transition-all flex items-center justify-center"
                style={{
                  gap: 20,
                  fontSize: 52,
                  paddingTop: 44,
                  paddingBottom: 44,
                  background: isValid
                    ? "var(--action-blue-gradient)"
                    : "#d1d5db",
                  color: isValid ? "#fff" : "#9ca3af",
                  cursor: isValid ? "pointer" : "not-allowed",
                }}
                whileHover={isValid ? { scale: 1.02 } : {}}
                whileTap={isValid ? { scale: 0.97 } : {}}
              >
                <Mail style={{ width: 50, height: 50 }} strokeWidth={2.4} />
                Send My 10% Off Code
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="email-sending"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full text-center"
            >
              <motion.div
                className="mx-auto flex items-center justify-center rounded-full bg-white shadow-2xl"
                style={{ width: 190, height: 190, marginBottom: 54 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              >
                <LoaderCircle
                  className="animate-spin text-black"
                  style={{ width: 94, height: 94 }}
                  strokeWidth={2.2}
                />
              </motion.div>

              <h1 className="font-black text-black" style={{ fontSize: 78, marginBottom: 24 }}>
                Preparing your reward...
              </h1>
              <p className="text-black/65" style={{ fontSize: 38, lineHeight: 1.35, marginBottom: 56 }}>
                Creating a demo email preview for<br />
                <span className="font-black text-black">{email.trim()}</span>
              </p>

              <div className="w-full overflow-hidden bg-white/60" style={{ height: 18, borderRadius: 9 }}>
                <motion.div
                  className="h-full"
                  style={{ background: "var(--action-blue-gradient)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SurveyNavigation onHome={onHome} />
    </div>
  );
}
