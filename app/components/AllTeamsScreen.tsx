import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft, ChevronRight } from "lucide-react";
import logoSrc from "../../imports/NHL-Logo.png?url";
import backgroundVideo from "../../imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";

import bruinsLogo from "../../imports/Boston-Bruins-Logo-1.png?url";
import sabresLogo from "../../imports/Buffalo-Sabres-Logo-1.png?url";
import redWingsLogo from "../../imports/Detroit-Red-Wings-Logo-1.png?url";
import panthersLogo from "../../imports/Florida-Panthers-Logo_1993-1.png?url";
import canadiensLogo from "../../imports/Montreal-Canadiens-Logo-1921-1.jpg?url";
import senatorsLogo from "../../imports/Ottawa-Senators-Logo-2007-1.jpg?url";
import lightningLogo from "../../imports/Tampa-Bay-Lightning-Logo-1.png?url";
import mapleLeafsLogo from "../../imports/Toronto-Maple-Leafs-Logo-1963-1.jpg?url";
import hurricanesLogo from "../../imports/carolina-hurricanes-logo-png_seeklogo-234510-1.png?url";
import blueJacketsLogo from "../../imports/Columbus-Blue-Jackets-Logo.jpg?url";
import devilsLogo from "../../imports/New-Jersey-Devils-Logo-1.png?url";
import islandersLogo from "../../imports/New-York-Islanders-Logo-1997-2010.png?url";
import rangersLogo from "../../imports/New-York-Rangers-Logo-1971-1977.png?url";
import flyersLogo from "../../imports/Philadelphia-Flyers-Logo.png?url";
import penguinsLogo from "../../imports/Pittsburgh-Penguins-Logo-1972-1992.png?url";
import capitalsLogo from "../../imports/Washington-Capitals-Logo-1997-2002.png?url";
import blackhawksLogo from "../../imports/Chicago-Blackhawks-Logo-1965-1989.png?url";
import avalancheLogo from "../../imports/Colorado-Avalanche-Logo-1995.png?url";
import starsLogo from "../../imports/Dallas-Stars-Logo-1993-1994.png?url";
import wildLogo from "../../imports/Minnesota-Wild-Logo-2000-2013.png?url";
import predatorsLogo from "../../imports/Nashville-Predators-Logo-1998-2011.png?url";
import bluesLogo from "../../imports/St-Louis-Blues-Logo-1967.png?url";
import utahLogo from "../../imports/utah-mammoth-logo-png_seeklogo-618353.png?url";
import jetsLogo from "../../imports/Winnipeg-Jets-logo.png?url";
import sharksLogo from "../../imports/20251121193933_832_mascotOrig.png?url";
import ducksLogo from "../../imports/Anaheim-Ducks-Logo.png?url";
import flamesLogo from "../../imports/Calgary-Flames-Emblem.png?url";
import oilersLogo from "../../imports/Edmonton-Oilers-Logo-1996-2011.png?url";
import kingsLogo from "../../imports/los_angeles_kings_logo_primary_2012_sportslogosnet-7735.png?url";
import krakenLogo from "../../imports/Seattle-Kraken-Symbol.png?url";
import canucksLogo from "../../imports/Vancouver-Canucks-Logo.png?url";
import goldenKnightsLogo from "../../imports/Vegas-Golden-Knights-Logo.png?url";

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

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
  };

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
          style={{ fontSize: 64, marginBottom: 20 }}
        >
          SELECT YOUR TEAM
        </motion.h2>

        <div className="flex-1 grid grid-cols-5" style={{ gap: 14, alignContent: "stretch" }}>
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
                className="flex flex-col items-center"
                style={{ gap: 8 }}
              >
                <div
                  className="relative rounded-lg bg-white shadow-md flex items-center justify-center w-full flex-1"
                  style={{
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
                <span className="text-center font-semibold leading-tight flex-shrink-0" style={{ fontSize: team.name.length > 18 ? 14 : 20, color: "#111" }}>
                  {team.name}
                </span>
              </motion.button>
            );
          })}

          {selectedTeam && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="col-span-2 flex items-center justify-center"
            >
              <motion.button
                onClick={handleContinue}
                className="text-white font-black uppercase tracking-wider shadow-2xl"
                style={{
                  paddingLeft: 60, paddingRight: 60, paddingTop: 28, paddingBottom: 28,
                  borderRadius: 9999, fontSize: 40,
                  background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
              </motion.button>
            </motion.div>
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
