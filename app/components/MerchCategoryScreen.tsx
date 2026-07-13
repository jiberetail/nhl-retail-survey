import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import { NHL_CATEGORY_ARTWORK } from "../data/nhlCategoryArtwork";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
interface MerchCategoryScreenProps {
  sport: string;
  teamName: string;
  teamLogo: string | null;
  onComplete: (category: string) => void;
  onHome: () => void;
  onBack: () => void;
  onBackToTeams: () => void;
}

export function MerchCategoryScreen({ teamName, onComplete, onHome, onBack, onBackToTeams }: MerchCategoryScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force video to be muted
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    onComplete(categoryId);
  };

  const teamArtwork = NHL_CATEGORY_ARTWORK[teamName as keyof typeof NHL_CATEGORY_ARTWORK];

  const categories = [
    { id: "jerseys", name: "Jerseys", artwork: teamArtwork?.jerseys },
    { id: "hats", name: "Hats", artwork: teamArtwork?.hats },
    { id: "shirts", name: "Shirts", artwork: teamArtwork?.shirts },
    { id: "accessories", name: "Accessories", artwork: teamArtwork?.accessories },
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
      <div className="relative z-10 h-full flex flex-col justify-center items-center" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 440, paddingBottom: 120 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-black text-black text-center leading-tight" style={{ fontSize: 48, marginBottom: 48 }}>
            WHAT KIND OF {teamName.toUpperCase()} MERCH ARE YOU LOOKING FOR?
          </motion.h2>
          <div className="grid grid-cols-2" style={{ gap: 40 }}>
            {categories.map((category, index) => (
              <motion.button key={category.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }} onClick={() => handleCategorySelect(category.id)} className="relative group" aria-label={`Shop ${teamName} ${category.name}`} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: "#ffffff" }}>
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    {category.artwork?.image ? (
                      <img
                        src={category.artwork.image}
                        alt={category.artwork.productName}
                        className="w-full h-full object-contain"
                        style={{ filter: "drop-shadow(0 14px 14px rgba(0, 0, 0, 0.24))" }}
                      />
                    ) : (
                      <div className="font-black text-gray-300" style={{ fontSize: 80 }}>{category.name[0]}</div>
                    )}
                  </div>
                </div>
                <div className="text-center" style={{ marginTop: 16 }}>
                  <span className="font-black tracking-tight text-black" style={{ fontSize: 36 }}>{category.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center" style={{ bottom: 32, gap: 24 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={onBack} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowLeft style={{ width: 32, height: 32 }} className="text-black" />
        </motion.button>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={onBackToTeams} className="bg-white border-2 border-gray-300 rounded-full font-black text-black hover:bg-gray-50 transition-all shadow-lg" style={{ padding: "20px 36px", fontSize: 28 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Back to Team Selection
        </motion.button>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={onHome} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Home style={{ width: 32, height: 32 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
