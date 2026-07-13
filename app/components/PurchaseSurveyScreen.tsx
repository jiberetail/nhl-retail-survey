import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
import { allInventoryItems, InventoryItem } from "../data/inventory";

interface PurchaseSurveyScreenProps {
  onComplete: () => void;
  onHome: () => void;
}

const activeBg = "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)";
const inactiveBg = "rgba(255,255,255,0.85)";

export function PurchaseSurveyScreen({ onComplete, onHome }: PurchaseSurveyScreenProps) {
  const [q1, setQ1] = useState<"online" | "instore" | "no" | null>(null);
  const [q2, setQ2] = useState<"yes" | "no" | null>(null);
  const [whyNo, setWhyNo] = useState<"notfound" | "expensive" | "other" | null>(null);
  const [itemSearch, setItemSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.muted = true; video.volume = 0; }
  }, []);

  const filteredItems = itemSearch.length > 1
    ? allInventoryItems.filter(i =>
        i.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
        i.category.toLowerCase().includes(itemSearch.toLowerCase()) ||
        i.team.toLowerCase().includes(itemSearch.toLowerCase())
      ).slice(0, 8)
    : [];

  const canFinish = q1 !== null && (
    (q1 === "online" || q1 === "instore") ? q2 !== null : whyNo !== null
  );

  const Btn = ({ active, onClick, children, flex = false }: { active: boolean; onClick: () => void; children: string; flex?: boolean }) => (
    <button onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-black transition-all ${flex ? "flex-1" : "w-full"} ${active ? "text-white" : "text-black"}`}
      style={{ fontSize: 36, paddingTop: 22, paddingBottom: 22, background: active ? activeBg : inactiveBg }}>
      <div className="absolute left-0 top-0 bottom-0" style={{ width: 6, background: active ? "#fff" : "#1e40af" }} />
      {children}
    </button>
  );

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

      {/* Content — fixed, no scroll */}
      <div className="relative z-10 h-full flex flex-col" style={{ paddingTop: 236, paddingBottom: 140, paddingLeft: 56, paddingRight: 56 }}>

        {/* Q1 */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="font-black text-black text-center" style={{ fontSize: 44, marginBottom: 20 }}>
            Did you purchase an item in store or online?
          </h2>
          <div className="flex flex-col" style={{ gap: 14, marginBottom: 28 }}>
            <Btn active={q1 === "online"}  onClick={() => { setQ1("online");  setQ2(null); setWhyNo(null); }}>Yes — Online</Btn>
            <Btn active={q1 === "instore"} onClick={() => { setQ1("instore"); setQ2(null); setWhyNo(null); }}>Yes — In Store</Btn>
            <Btn active={q1 === "no"}      onClick={() => { setQ1("no");      setQ2(null); setWhyNo(null); }}>No</Btn>
          </div>
        </motion.div>

        {/* Q2 — satisfied */}
        <AnimatePresence>
          {(q1 === "online" || q1 === "instore") && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <h2 className="font-black text-black text-center" style={{ fontSize: 44, marginBottom: 20 }}>
                Are you satisfied with your shopping experience?
              </h2>
              <div className="flex" style={{ gap: 14, marginBottom: 28 }}>
                <Btn active={q2 === "yes"} onClick={() => setQ2("yes")} flex>Yes</Btn>
                <Btn active={q2 === "no"}  onClick={() => setQ2("no")}  flex>No</Btn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Why no purchase */}
        <AnimatePresence>
          {q1 === "no" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <h2 className="font-black text-black text-center" style={{ fontSize: 44, marginBottom: 20 }}>
                Why didn't you make a purchase?
              </h2>
              <div className="flex flex-col" style={{ gap: 14, marginBottom: 20 }}>
                <Btn active={whyNo === "notfound"}  onClick={() => { setWhyNo("notfound");  setItemSearch(""); setShowDropdown(false); setSelectedItem(null); }}>Couldn't Find My Item</Btn>
                <Btn active={whyNo === "expensive"} onClick={() => { setWhyNo("expensive"); setItemSearch(""); setShowDropdown(false); setSelectedItem(null); }}>Too Expensive</Btn>
                <Btn active={whyNo === "other"}     onClick={() => { setWhyNo("other");     setItemSearch(""); setShowDropdown(false); setSelectedItem(null); }}>Other</Btn>
              </div>

              {/* Item search */}
              <AnimatePresence>
                {whyNo === "notfound" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginBottom: 20, position: "relative", zIndex: 10 }}>
                    <p className="font-bold text-black text-center" style={{ fontSize: 34, marginBottom: 14 }}>What were you looking for?</p>
                    <div className="relative">
                      <Search className="absolute text-gray-400" style={{ width: 36, height: 36, left: 24, top: "50%", transform: "translateY(-50%)" }} />
                      <input type="text" value={itemSearch}
                        onChange={(e) => { setItemSearch(e.target.value); setShowDropdown(true); }}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Search jerseys, hats, accessories..."
                        className="w-full rounded-xl border-2 border-gray-300 bg-white text-black focus:outline-none focus:border-black"
                        style={{ fontSize: 34, padding: "20px 20px 20px 72px" }}
                      />
                    </div>
                    {showDropdown && filteredItems.length > 0 && (
                      <div className="absolute left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-y-auto z-50" style={{ top: "100%", maxHeight: 320, marginTop: 6 }}>
                        {filteredItems.map((item, i) => (
                          <button key={i} onClick={() => { setItemSearch(item.name); setSelectedItem(item); setShowDropdown(false); }}
                            className="w-full text-left hover:bg-gray-50 transition-all"
                            style={{ padding: "18px 28px", borderBottom: "1px solid #f3f4f6" }}>
                            <p className="font-black text-black" style={{ fontSize: 32 }}>{item.name}</p>
                            <p className="text-black/50" style={{ fontSize: 26 }}>{item.team} · {item.category}</p>
                          </button>
                        ))}
                      </div>
                    )}
                    {itemSearch.length > 1 && filteredItems.length === 0 && (
                      <div className="bg-white rounded-xl border border-gray-200 text-center" style={{ padding: "24px", marginTop: 6 }}>
                        <p className="text-black/50" style={{ fontSize: 32 }}>No items found for "{itemSearch}"</p>
                      </div>
                    )}

                    {/* Selected item image */}
                    {selectedItem && !showDropdown && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center bg-white rounded-xl shadow-lg" style={{ marginTop: 16, padding: "16px 24px", gap: 24 }}>
                        <img src={selectedItem.image} alt={selectedItem.name} className="object-contain flex-shrink-0" style={{ width: 120, height: 120 }} />
                        <div>
                          <p className="font-black text-black" style={{ fontSize: 30, lineHeight: 1.2 }}>{selectedItem.name}</p>
                          <p className="text-black/50" style={{ fontSize: 26 }}>{selectedItem.team} · {selectedItem.category}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Finish button */}
        <AnimatePresence>
          {canFinish && (
            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              onClick={onComplete}
              className="w-full font-black text-white rounded-2xl"
              style={{ fontSize: 48, paddingTop: 40, paddingBottom: 40, background: activeBg }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              Finish
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* Home button */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ bottom: 32 }}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          onClick={onHome} className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg" style={{ padding: 24 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Home style={{ width: 40, height: 40 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
