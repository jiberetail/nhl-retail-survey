import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
interface MerchDemographicScreenProps {
  category: string;
  teamName: string;
  onComplete: (demographic: string) => void;
  onHome: () => void;
  onBack: () => void;
}

export function MerchDemographicScreen({ category, teamName, onComplete, onHome, onBack }: MerchDemographicScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force video to be muted
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  const handleDemographicSelect = (demographicId: string) => {
    onComplete(demographicId);
  };

  const demographics = [
    { id: "men", name: "Men" },
    { id: "women", name: "Women" },
    { id: "kids", name: "Kids" },
  ];

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
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

      {/* Light overlay for better contrast */}
      <div className="absolute inset-0 bg-white/30" />

      {/* NHL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 right-0 z-20 flex justify-center"
        style={{ top: "16px" }}
      >
        <img src={logoSrc} alt="NHL" style={{ height: 400, width: "auto" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center" style={{ paddingLeft: 80, paddingRight: 80, paddingTop: 220, paddingBottom: 120 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-black text-black text-center" style={{ fontSize: 64, marginBottom: 60 }}>
            SELECT STYLE
          </motion.h2>
          <div className="flex flex-col" style={{ gap: 32 }}>
            {demographics.map((demographic, index) => (
              <motion.button key={demographic.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }} onClick={() => handleDemographicSelect(demographic.id)} className="relative group" whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ backgroundColor: "#ffffff" }}>
                  <div className="absolute left-0 top-0 bottom-0" style={{ width: 8, background: "#1e40af" }} />
                  <div className="relative flex items-center justify-center" style={{ height: 160 }}>
                    <span className="font-black tracking-tight text-black" style={{ fontSize: 56 }}>{demographic.name}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30 flex" style={{ bottom: 32, gap: 16 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={onBack} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowLeft style={{ width: 32, height: 32 }} className="text-black" />
        </motion.button>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={onHome} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Home style={{ width: 32, height: 32 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
