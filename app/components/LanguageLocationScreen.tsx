import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
interface LanguageLocationScreenProps {
  onContinue: () => void;
  onHome: () => void;
  onBack: () => void;
}

const languages = [
  { code: "en", name: "English", flagCode: "us" },
  { code: "sv", name: "Svenska", flagCode: "se" },
  { code: "fi", name: "Suomi", flagCode: "fi" },
  { code: "ru", name: "Русский", flagCode: "ru" },
  { code: "cs", name: "Čeština", flagCode: "cz" },
  { code: "es", name: "Español", flagCode: "es" },
];

const locations = [
  { id: "us", name: "United States", flagCode: "us" },
  { id: "ca", name: "Canada", flagCode: "ca" },
  { id: "se", name: "Sweden", flagCode: "se" },
  { id: "fi", name: "Finland", flagCode: "fi" },
  { id: "ru", name: "Russia", flagCode: "ru" },
  { id: "cz", name: "Czechia", flagCode: "cz" },
];

const mexicanStates = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato",
  "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León",
  "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
  "Ciudad de México"
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

export function LanguageLocationScreen({ onContinue, onHome, onBack }: LanguageLocationScreenProps) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [step, setStep] = useState<"language" | "location">("language");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force video to be muted
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setLanguage(code as "en" | "sv" | "fi" | "ru" | "cs" | "es");
    setTimeout(() => {
      setStep("location");
    }, 500);
  };

  const handleLocationSelect = (id: string) => {
    setSelectedLocation(id);
    setSelectedState(""); // Reset state selection when country changes

    if (id !== "us") {
      setTimeout(() => {
        onContinue();
      }, 400);
    }
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    // Auto-continue after state selection
    setTimeout(() => {
      onContinue();
    }, 400);
  };

  const requiresStateSelection = selectedLocation === "us";
  const stateList = usStates;

  const handleBackButton = () => {
    if (step === "location") {
      // On location step, go back to language step
      setStep("language");
    } else {
      // On language step, go back to welcome screen
      onBack();
    }
  };

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
        style={{ top: "24px" }}
      >
        <img src={logoSrc} alt="NHL" style={{ height: 200, width: "auto" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col overflow-y-auto" style={{ paddingLeft: 60, paddingRight: 60, paddingTop: 240, paddingBottom: 180 }}>
        {step === "language" ? (
          <motion.div key="language" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="w-full flex flex-col flex-1">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-black text-black text-center flex-shrink-0" style={{ fontSize: 88, marginBottom: 12 }}>
              {t("lang.selectLanguage")}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-600 text-center flex-shrink-0" style={{ fontSize: 40, marginBottom: 40 }}>
              {t("lang.chooseLanguage")}
            </motion.p>
            <div className="flex flex-col" style={{ gap: 24 }}>
              {languages.map((lang, index) => (
                <motion.button key={lang.code} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }} onClick={() => handleLanguageSelect(lang.code)} className="relative overflow-hidden rounded-2xl w-full" style={{ height: 160 }} whileTap={{ scale: 0.98 }}>
                  <div className="absolute inset-0 transition-all duration-300 shadow-lg" style={{ background: selectedLanguage === lang.code ? "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)" : "rgba(255,255,255,0.85)" }} />
                  <div className="absolute left-0 top-0 bottom-0 transition-all duration-300" style={{ width: 10, background: selectedLanguage === lang.code ? "#fff" : "#1e40af" }} />
                  <div className="relative h-full flex items-center justify-center" style={{ gap: 24 }}>
                    <img src={`https://flagcdn.com/w80/${lang.flagCode}.png`} alt={lang.name} style={{ width: 72, height: 48, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                    <span className="font-black tracking-tight transition-all duration-300" style={{ fontSize: 52, color: selectedLanguage === lang.code ? "#fff" : "#000" }}>{lang.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="location" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="w-full flex flex-col flex-1">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-black text-black text-center flex-shrink-0" style={{ fontSize: 88, marginBottom: 12 }}>
              {t("lang.selectLocation")}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-600 text-center flex-shrink-0" style={{ fontSize: 40, marginBottom: 40 }}>
              {t("lang.chooseCountry")}
            </motion.p>
            <div className="flex flex-col" style={{ gap: 24 }}>
              {locations.map((location, index) => (
                <React.Fragment key={location.id}>
                  <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }} onClick={() => handleLocationSelect(location.id)} className="relative overflow-hidden rounded-2xl w-full" style={{ height: 160 }} whileTap={{ scale: 0.98 }}>
                    <div className="absolute inset-0 transition-all duration-300 shadow-lg" style={{ background: selectedLocation === location.id ? "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)" : "rgba(255,255,255,0.85)" }} />
                    <div className="absolute left-0 top-0 bottom-0 transition-all duration-300" style={{ width: 10, background: selectedLocation === location.id ? "#fff" : "#1e40af" }} />
                    <div className="relative h-full flex items-center justify-center" style={{ gap: 24 }}>
                      <img src={`https://flagcdn.com/w80/${location.flagCode}.png`} alt={location.name} style={{ width: 72, height: 48, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                      <span className="font-black tracking-tight transition-all duration-300" style={{ fontSize: 52, color: selectedLocation === location.id ? "#fff" : "#000" }}>{location.name}</span>
                    </div>
                  </motion.button>
                  {location.id === "us" && requiresStateSelection && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <select value={selectedState} onChange={(e) => handleStateSelect(e.target.value)} className="w-full bg-white border-2 border-blue-300 rounded-xl text-black appearance-none cursor-pointer hover:border-blue-500 transition-all focus:outline-none focus:border-blue-600 shadow-lg" style={{ height: 120, paddingLeft: 32, paddingRight: 32, fontSize: 40 }}>
                        <option value="" className="bg-white text-black">{t("lang.selectState")}</option>
                        {stateList.map((state) => (
                          <option key={state} value={state} className="bg-white text-black">{state}</option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30 flex" style={{ bottom: 36, gap: 24 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={handleBackButton} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 28 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowLeft style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} onClick={onHome} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 28 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Home style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
