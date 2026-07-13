import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
import { allInventoryItems, InventoryItem } from "../data/inventory";

interface PurchaseSurveyScreenProps {
  onComplete: () => void;
  onHome: () => void;
}

type SurveyStep = "found" | "missingItem" | "experience" | "affected" | "associate" | "associateRating";
type YesNo = "yes" | "no";

const activeBg = "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)";
const inactiveBg = "rgba(255,255,255,0.88)";

const affectedReasons = [
  "Check out time was too long",
  "Could not find my item",
  "The associate was not friendly",
  "I needed help and did not receive it.",
];

const associateRatings = ["Satisfied", "Neutral", "Dissatisfied"];

export function PurchaseSurveyScreen({ onComplete, onHome }: PurchaseSurveyScreenProps) {
  const [step, setStep] = useState<SurveyStep>("found");
  const [foundEverything, setFoundEverything] = useState<YesNo | null>(null);
  const [shoppingSatisfied, setShoppingSatisfied] = useState<YesNo | null>(null);
  const [affectedReason, setAffectedReason] = useState("");
  const [associateAssisted, setAssociateAssisted] = useState<YesNo | null>(null);
  const [associateRating, setAssociateRating] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  const filteredItems = useMemo(() => {
    const query = itemSearch.trim().toLowerCase();
    if (!query) return [];

    return allInventoryItems
      .filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.team.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [itemSearch]);

  const selectFoundEverything = (answer: YesNo) => {
    setFoundEverything(answer);
    setShoppingSatisfied(null);
    setAffectedReason("");
    setAssociateAssisted(null);
    setAssociateRating("");
    if (answer === "yes") {
      setStep("experience");
      return;
    }
    setItemSearch("");
    setSelectedItem(null);
    setShowDropdown(false);
    setStep("missingItem");
  };

  const selectMissingItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setItemSearch(item.name);
    setShowDropdown(false);
    setStep("experience");
  };

  const useTypedItem = () => {
    const name = itemSearch.trim();
    if (!name) return;
    selectMissingItem({ name, category: "Requested item", team: "NHL Shop", image: "" });
  };

  const selectShoppingSatisfied = (answer: YesNo) => {
    setShoppingSatisfied(answer);
    setAffectedReason("");
    setAssociateAssisted(null);
    setAssociateRating("");
    setStep(answer === "yes" ? "associate" : "affected");
  };

  const selectAffectedReason = (reason: string) => {
    setAffectedReason(reason);
    setAssociateAssisted(null);
    setAssociateRating("");
    setStep("associate");
  };

  const selectAssociateAssisted = (answer: YesNo) => {
    setAssociateAssisted(answer);
    setAssociateRating("");
    if (answer === "no") {
      onComplete();
      return;
    }
    setStep("associateRating");
  };

  const selectAssociateRating = (rating: string) => {
    setAssociateRating(rating);
    onComplete();
  };

  const OptionButton = ({
    active,
    onClick,
    children,
    flex = false,
  }: {
    active: boolean;
    onClick: () => void;
    children: string;
    flex?: boolean;
  }) => (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-black transition-all ${flex ? "flex-1" : "w-full"} ${
        active ? "text-white" : "text-black"
      }`}
      style={{
        fontSize: 38,
        lineHeight: 1.15,
        minHeight: 106,
        padding: "26px 30px",
        background: active ? activeBg : inactiveBg,
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
      }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 8, background: active ? "#fff" : "#1e40af" }}
      />
      {children}
    </motion.button>
  );

  const QuestionShell = ({
    eyebrow,
    question,
    children,
  }: {
    eyebrow: string;
    question: string;
    children: React.ReactNode;
  }) => (
    <motion.div
      key={step}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28 }}
      className="w-full"
    >
      <p
        className="font-black text-center uppercase tracking-widest"
        style={{ color: "#cc0000", fontSize: 30, marginBottom: 24 }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-black text-black text-center"
        style={{ fontSize: 58, lineHeight: 1.04, marginBottom: 48 }}
      >
        {question}
      </h2>
      {children}
    </motion.div>
  );

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
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
      <div className="absolute inset-0 bg-white/30" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 right-0 z-20 flex justify-center"
        style={{ top: 16 }}
      >
        <img src={logoSrc} alt="NHL" style={{ height: 200, width: "auto" }} />
      </motion.div>

      <div
        className="relative z-10 h-full flex flex-col justify-center"
        style={{ paddingTop: 250, paddingBottom: 132, paddingLeft: 64, paddingRight: 64 }}
      >
        <AnimatePresence mode="wait">
          {step === "found" && (
            <QuestionShell
              eyebrow="Question 1"
              question="Did you find everything you were looking for in the store today?"
            >
              <div className="flex" style={{ gap: 18 }}>
                <OptionButton active={foundEverything === "yes"} onClick={() => selectFoundEverything("yes")} flex>
                  Yes
                </OptionButton>
                <OptionButton active={foundEverything === "no"} onClick={() => selectFoundEverything("no")} flex>
                  No
                </OptionButton>
              </div>
            </QuestionShell>
          )}

          {step === "missingItem" && (
            <QuestionShell eyebrow="Question 2" question="Please tell us what you were looking for.">
              <div className="relative" style={{ zIndex: 30 }}>
                <Search
                  className="absolute text-gray-400"
                  style={{ width: 44, height: 44, left: 28, top: 44 }}
                />
                <input
                  type="text"
                  value={itemSearch}
                  onChange={(e) => {
                    setItemSearch(e.target.value);
                    setSelectedItem(null);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Search jerseys, hats, accessories..."
                  className="w-full rounded-xl border-2 border-gray-300 bg-white text-black focus:outline-none focus:border-black"
                  style={{ fontSize: 40, padding: "32px 32px 32px 88px" }}
                />

                {showDropdown && itemSearch.trim() && (
                  <div
                    className="absolute left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-y-auto"
                    style={{ top: "calc(100% + 8px)", maxHeight: 520 }}
                  >
                    {filteredItems.map((item) => (
                      <button
                        key={`${item.team}-${item.category}-${item.name}`}
                        onClick={() => selectMissingItem(item)}
                        className="w-full text-left hover:bg-gray-50 transition-all"
                        style={{ padding: "20px 28px", borderBottom: "1px solid #f3f4f6" }}
                      >
                        <p className="font-black text-black" style={{ fontSize: 32, lineHeight: 1.18 }}>
                          {item.name}
                        </p>
                        <p className="text-black/50" style={{ fontSize: 26, marginTop: 4 }}>
                          {item.team} - {item.category}
                        </p>
                      </button>
                    ))}

                    <button
                      onClick={useTypedItem}
                      className="w-full text-left hover:bg-gray-50 transition-all"
                      style={{ padding: "22px 28px" }}
                    >
                      <p className="font-black text-black" style={{ fontSize: 32 }}>
                        Use "{itemSearch.trim()}"
                      </p>
                      <p className="text-black/50" style={{ fontSize: 26, marginTop: 4 }}>
                        Continue with this item
                      </p>
                    </button>
                  </div>
                )}
              </div>

              {selectedItem && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center bg-white rounded-xl shadow-lg"
                  style={{ marginTop: 26, padding: "18px 24px", gap: 24 }}
                >
                  {selectedItem.image && (
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="object-contain flex-shrink-0"
                      style={{ width: 116, height: 116 }}
                    />
                  )}
                  <div>
                    <p className="font-black text-black" style={{ fontSize: 32, lineHeight: 1.2 }}>
                      {selectedItem.name}
                    </p>
                    <p className="text-black/50" style={{ fontSize: 26 }}>
                      {selectedItem.team} - {selectedItem.category}
                    </p>
                  </div>
                </motion.div>
              )}
            </QuestionShell>
          )}

          {step === "experience" && (
            <QuestionShell
              eyebrow={foundEverything === "no" ? "Question 3" : "Question 2"}
              question="Are you satisfied with your shopping experience?"
            >
              <div className="flex" style={{ gap: 18 }}>
                <OptionButton active={shoppingSatisfied === "yes"} onClick={() => selectShoppingSatisfied("yes")} flex>
                  Yes
                </OptionButton>
                <OptionButton active={shoppingSatisfied === "no"} onClick={() => selectShoppingSatisfied("no")} flex>
                  No
                </OptionButton>
              </div>
            </QuestionShell>
          )}

          {step === "affected" && (
            <QuestionShell
              eyebrow={foundEverything === "no" ? "Question 4" : "Question 3"}
              question="What affected your shopping experience?"
            >
              <div className="flex flex-col" style={{ gap: 16 }}>
                {affectedReasons.map((reason) => (
                  <OptionButton
                    key={reason}
                    active={affectedReason === reason}
                    onClick={() => selectAffectedReason(reason)}
                  >
                    {reason}
                  </OptionButton>
                ))}
              </div>
            </QuestionShell>
          )}

          {step === "associate" && (
            <QuestionShell
              eyebrow={
                shoppingSatisfied === "no"
                  ? foundEverything === "no"
                    ? "Question 5"
                    : "Question 4"
                  : foundEverything === "no"
                    ? "Question 4"
                    : "Question 3"
              }
              question="Did an associate assist you in the store today?"
            >
              <div className="flex" style={{ gap: 18 }}>
                <OptionButton active={associateAssisted === "yes"} onClick={() => selectAssociateAssisted("yes")} flex>
                  Yes
                </OptionButton>
                <OptionButton active={associateAssisted === "no"} onClick={() => selectAssociateAssisted("no")} flex>
                  No
                </OptionButton>
              </div>
            </QuestionShell>
          )}

          {step === "associateRating" && (
            <QuestionShell eyebrow="Final Question" question="How satisfied are you with the associate?">
              <div className="flex flex-col" style={{ gap: 16 }}>
                {associateRatings.map((rating) => (
                  <OptionButton
                    key={rating}
                    active={associateRating === rating}
                    onClick={() => selectAssociateRating(rating)}
                  >
                    {rating}
                  </OptionButton>
                ))}
              </div>
            </QuestionShell>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ bottom: 32 }}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onHome}
          className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          style={{ padding: 24 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Home style={{ width: 40, height: 40 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
