import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import logoSrc from "../../imports/NHL-Logo.png?url";
import backgroundVideo from "../../imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";

interface EmailCaptureScreenProps {
  onContinue: () => void;
  onHome: () => void;
}

export function EmailCaptureScreen({ onContinue, onHome }: EmailCaptureScreenProps) {
  const [email, setEmail] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.muted = true; video.volume = 0; }
  }, []);

  const isValid = email.includes("@") && email.includes(".");

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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full text-center">

          {/* Badge */}
          <div className="inline-flex items-center justify-center rounded-full font-black text-white" style={{ background: "#cc0000", fontSize: 48, paddingLeft: 48, paddingRight: 48, paddingTop: 20, paddingBottom: 20, marginBottom: 48 }}>
            GET 15% OFF
          </div>

          <h1 className="font-black text-black leading-tight" style={{ fontSize: 72, marginBottom: 24 }}>
            Get 15% Off Your<br />Next In Store Purchase
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
            onClick={onContinue}
            disabled={!isValid}
            className="w-full font-black text-white rounded-2xl transition-all"
            style={{
              fontSize: 52,
              paddingTop: 44,
              paddingBottom: 44,
              background: isValid
                ? "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)"
                : "#d1d5db",
              color: isValid ? "#fff" : "#9ca3af",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>

      {/* Home button */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ bottom: 36 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          onClick={onHome} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 28 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Home style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
