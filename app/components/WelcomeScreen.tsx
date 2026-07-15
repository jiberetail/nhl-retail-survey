import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Shirt, QrCode, Truck } from "lucide-react";
const videoSrc = "/imports/new_vid.mp4";
const logoSrc = "/imports/NHL-Logo.png";
interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.85 }}
        onLoadedMetadata={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0; }}
        onPlay={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0; }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Gradient — clear at top, dark at bottom half */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.82) 58%, rgba(0,0,0,0.92) 100%)" }} />

      {/* NHL Logo — top center, small */}
      <motion.div
        className="absolute left-0 right-0 flex justify-center"
        style={{ top: 32 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={logoSrc} alt="NHL" style={{ width: 648 }} />
      </motion.div>

      {/* Bottom content block */}
      <div className="absolute left-0 right-0 bottom-0 flex flex-col" style={{ paddingLeft: 56, paddingRight: 56, paddingBottom: 100 }}>

        {/* Headline */}
        <motion.p
          className="font-black text-white text-center leading-none"
          style={{ width: "100%", letterSpacing: 0, lineHeight: 0.95, marginBottom: 48 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap", fontSize: 112, letterSpacing: 0 }}>ORDER IT HERE</span>
          <span style={{ display: "block", whiteSpace: "nowrap", fontSize: 124, letterSpacing: 0 }}>SHIP IT HOME!</span>
        </motion.p>

        {/* Green button */}
        <motion.button
          onClick={onStart}
          className="flex items-center justify-center self-center"
          style={{
            background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)",
            borderRadius: 10,
            paddingTop: 28,
            paddingBottom: 28,
            paddingLeft: 64,
            paddingRight: 64,
            marginBottom: 52,
            border: "3px solid #ffffff",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="font-black text-white uppercase" style={{ fontSize: 48, letterSpacing: 0 }}>
            Start
          </span>
        </motion.button>

        {/* Three rows */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col" style={{ gap: 36 }}>
            {[
              { Icon: Shirt, label: "Pick your items" },
              { Icon: QrCode, label: "Scan & Purchase" },
              { Icon: Truck,  label: "Get It Delivered" },
            ].map(({ Icon, label }, i) => (
              <div key={i} className="flex items-center" style={{ gap: 32 }}>
                <Icon style={{ width: 56, height: 56, color: "rgba(255,255,255,0.7)", flexShrink: 0 }} strokeWidth={1.8} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 52, fontWeight: 300 }}>|</span>
                <span style={{ fontSize: 52, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
