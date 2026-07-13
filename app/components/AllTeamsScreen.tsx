import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
const bruinsLogo = "/imports/Boston-Bruins-Logo-1.png";
const sabresLogo = "/imports/Buffalo-Sabres-Logo-1.png";
const redWingsLogo = "/imports/Detroit-Red-Wings-Logo-1.png";
const panthersLogo = "/imports/Florida-Panthers-Logo_1993-1.png";
const canadiensLogo = "/imports/Montreal-Canadiens-Logo-1921-1.jpg";
const senatorsLogo = "/imports/Ottawa-Senators-Logo-2007-1.jpg";
const lightningLogo = "/imports/Tampa-Bay-Lightning-Logo-1.png";
const mapleLeafsLogo = "/imports/Toronto-Maple-Leafs-Logo-1963-1.jpg";
const hurricanesLogo = "/imports/carolina-hurricanes-logo-png_seeklogo-234510-1.png";
const blueJacketsLogo = "/imports/Columbus-Blue-Jackets-Logo.jpg";
const devilsLogo = "/imports/New-Jersey-Devils-Logo-1.png";
const islandersLogo = "/imports/New-York-Islanders-Logo-1997-2010.png";
const rangersLogo = "/imports/New-York-Rangers-Logo-1971-1977.png";
const flyersLogo = "/imports/Philadelphia-Flyers-Logo.png";
const penguinsLogo = "/imports/Pittsburgh-Penguins-Logo-1972-1992.png";
const capitalsLogo = "/imports/Washington-Capitals-Logo-1997-2002.png";
const blackhawksLogo = "/imports/Chicago-Blackhawks-Logo-1965-1989.png";
const avalancheLogo = "/imports/Colorado-Avalanche-Logo-1995.png";
const starsLogo = "/imports/Dallas-Stars-Logo-1993-1994.png";
const wildLogo = "/imports/Minnesota-Wild-Logo-2000-2013.png";
const predatorsLogo = "/imports/Nashville-Predators-Logo-1998-2011.png";
const bluesLogo = "/imports/St-Louis-Blues-Logo-1967.png";
const utahLogo = "/imports/utah-mammoth-logo-png_seeklogo-618353.png";
const jetsLogo = "/imports/Winnipeg-Jets-logo.png";
const sharksLogo = "/imports/20251121193933_832_mascotOrig.png";
const ducksLogo = "/imports/Anaheim-Ducks-Logo.png";
const flamesLogo = "/imports/Calgary-Flames-Emblem.png";
const oilersLogo = "/imports/Edmonton-Oilers-Logo-1996-2011.png";
const kingsLogo = "/imports/los_angeles_kings_logo_primary_2012_sportslogosnet-7735.png";
const krakenLogo = "/imports/Seattle-Kraken-Symbol.png";
const canucksLogo = "/imports/Vancouver-Canucks-Logo.png";
const goldenKnightsLogo = "/imports/Vegas-Golden-Knights-Logo.png";
interface AllTeamsScreenProps {
  onComplete: (team: { id: string; name: string; logo: string }) => void;
  onHome: () => void;
  onBack: () => void;
}

const allTeams = [
  { id: "ducks", name: "Anaheim Ducks", logo: ducksLogo },
  { id: "bruins", name: "Boston Bruins", logo: bruinsLogo },
  { id: "sabres", name: "Buffalo Sabres", logo: sabresLogo },
  { id: "flames", name: "Calgary Flames", logo: flamesLogo },
  { id: "hurricanes", name: "Carolina Hurricanes", logo: hurricanesLogo },
  { id: "blackhawks", name: "Chicago Blackhawks", logo: blackhawksLogo },
  { id: "avalanche", name: "Colorado Avalanche", logo: avalancheLogo },
  { id: "blue-jackets", name: "Columbus Blue Jackets", logo: blueJacketsLogo },
  { id: "stars", name: "Dallas Stars", logo: starsLogo },
  { id: "red-wings", name: "Detroit Red Wings", logo: redWingsLogo },
  { id: "oilers", name: "Edmonton Oilers", logo: oilersLogo },
  { id: "panthers", name: "Florida Panthers", logo: panthersLogo },
  { id: "kings", name: "Los Angeles Kings", logo: kingsLogo },
  { id: "wild", name: "Minnesota Wild", logo: wildLogo },
  { id: "canadiens", name: "Montréal Canadiens", logo: canadiensLogo },
  { id: "predators", name: "Nashville Predators", logo: predatorsLogo },
  { id: "devils", name: "New Jersey Devils", logo: devilsLogo },
  { id: "islanders", name: "New York Islanders", logo: islandersLogo },
  { id: "rangers", name: "New York Rangers", logo: rangersLogo },
  { id: "senators", name: "Ottawa Senators", logo: senatorsLogo },
  { id: "flyers", name: "Philadelphia Flyers", logo: flyersLogo },
  { id: "penguins", name: "Pittsburgh Penguins", logo: penguinsLogo },
  { id: "sharks", name: "San Jose Sharks", logo: sharksLogo },
  { id: "kraken", name: "Seattle Kraken", logo: krakenLogo },
  { id: "blues", name: "St. Louis Blues", logo: bluesLogo },
  { id: "lightning", name: "Tampa Bay Lightning", logo: lightningLogo },
  { id: "maple-leafs", name: "Toronto Maple Leafs", logo: mapleLeafsLogo },
  { id: "utah", name: "Utah Mammoths", logo: utahLogo },
  { id: "canucks", name: "Vancouver Canucks", logo: canucksLogo },
  { id: "golden-knights", name: "Vegas Golden Knights", logo: goldenKnightsLogo },
  { id: "capitals", name: "Washington Capitals", logo: capitalsLogo },
  { id: "jets", name: "Winnipeg Jets", logo: jetsLogo },
];

export function AllTeamsScreen({ onComplete, onHome, onBack }: AllTeamsScreenProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  const handleContinue = () => {
    const team = allTeams.find(t => t.id === selectedTeam);
    if (team) onComplete(team);
  };

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        onLoadedMetadata={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0; }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/30" />

      {/* NHL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 right-0 z-20 flex justify-center"
        style={{ top: "16px" }}
      >
        <img src={logoSrc} alt="NHL" style={{ height: 280, width: "auto" }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col" style={{ paddingTop: 316, paddingBottom: 160, paddingLeft: 20, paddingRight: 20 }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-black text-black text-center flex-shrink-0"
          style={{ fontSize: 64, marginBottom: 16 }}
        >
          SELECT YOUR TEAM
        </motion.h2>

        <div
          className="flex-1 min-h-0 grid grid-cols-5"
          style={{ gap: 12, gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
        >
          {allTeams.map((team, index) => {
            const isSelected = selectedTeam === team.id;
            const isDimmed = selectedTeam && !isSelected;
            return (
              <motion.button
                key={team.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isDimmed ? 0.3 : 1, scale: 1 }}
                transition={{ opacity: { duration: 0.2 }, scale: { delay: 0.3 + index * 0.02, duration: 0.3 } }}
                onClick={() => setSelectedTeam(isSelected ? null : team.id)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="flex h-full min-h-0 flex-col items-center justify-start"
                style={{ gap: 6 }}
              >
                <div
                  className="relative rounded-lg bg-white shadow-md flex items-center justify-center w-full flex-shrink-0 overflow-hidden"
                  style={{
                    height: 112,
                    minHeight: 112,
                    maxHeight: 112,
                    boxShadow: isSelected
                      ? "0 0 24px rgba(239,68,68,0.7), 0 4px 10px rgba(0,0,0,0.2)"
                      : "0 3px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={team.logo}
                    alt={team.name}
                    style={{
                      width: team.id === "kings" ? "72%" : team.id === "flyers" ? "78%" : team.id === "sharks" ? "82%" : "88%",
                      height: team.id === "kings" ? "72%" : team.id === "flyers" ? "78%" : team.id === "sharks" ? "82%" : "88%",
                      objectFit: "contain",
                      filter: isDimmed ? "grayscale(100%)" : "none",
                    }}
                  />
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 border-4 border-red-500 rounded-lg"
                    />
                  )}
                </div>
                <span
                  className="text-center font-semibold flex-shrink-0"
                  style={{
                    alignItems: "center",
                    color: "#111",
                    display: "flex",
                    fontSize: team.name.length > 20 ? 13 : team.name.length > 16 ? 15 : 18,
                    height: 42,
                    justifyContent: "center",
                    lineHeight: 1.08,
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {team.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex-shrink-0 flex items-center justify-center" style={{ height: 118, paddingTop: 18 }}>
          {selectedTeam && (
            <motion.button
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={handleContinue}
              className="text-white font-black uppercase tracking-wider shadow-2xl"
              style={{
                paddingLeft: 58, paddingRight: 58, paddingTop: 24, paddingBottom: 24,
                borderRadius: 9999, fontSize: 36,
                background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          )}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30 flex" style={{ bottom: 36, gap: 24 }}>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          onClick={onBack}
          className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          style={{ padding: 28 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          onClick={onHome}
          className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          style={{ padding: 28 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        >
          <Home style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
