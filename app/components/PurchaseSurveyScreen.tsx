import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
import { allInventoryItems, InventoryItem } from "../data/inventory";

interface PurchaseSurveyScreenProps {
  onComplete: () => void;
  onHome: () => void;
  onBack: () => void;
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

export function PurchaseSurveyScreen({ onComplete, onHome, onBack }: PurchaseSurveyScreenProps) {
  const [step, setStep] = useState<SurveyStep>("found");
  const [foundEverything, setFoundEverything] = useState<YesNo | null>(null);
  const [shoppingSatisfied, setShoppingSatisfied] = useState<YesNo | null>(null);
  const [affectedReason, setAffectedReason] = useState("");
  const [associateAssisted, setAssociateAssisted] = useState<YesNo | null>(null);
  const [associateRating, setAssociateRating] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (pressTimeoutRef.current) {
        clearTimeout(pressTimeoutRef.current);
      }
    };
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

  const flashButton = (buttonId: string, action: () => void) => {
    if (pressTimeoutRef.current) {
      clearTimeout(pressTimeoutRef.current);
    }
    setPressedButton(buttonId);
    action();
    pressTimeoutRef.current = setTimeout(() => {
      setPressedButton(null);
      pressTimeoutRef.current = null;
    }, 180);
  };

  const selectFoundEverything = (answer: YesNo) => {
    setFoundEverything(answer);
    setShoppingSatisfied(null);
    setAffectedReason("");
    setAssociateAssisted(null);
    setAssociateRating("");
    setSelectedItem(null);
    setItemSearch("");
    setShowDropdown(false);
  };

  const selectMissingItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setItemSearch(item.name);
    setShowDropdown(false);
    setShoppingSatisfied(null);
    setAffectedReason("");
    setAssociateAssisted(null);
    setAssociateRating("");
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
  };

  const selectAffectedReason = (reason: string) => {
    setAffectedReason(reason);
    setAssociateAssisted(null);
    setAssociateRating("");
  };

  const selectAssociateAssisted = (answer: YesNo) => {
    setAssociateAssisted(answer);
    setAssociateRating("");
  };

  const selectAssociateRating = (rating: string) => {
    setAssociateRating(rating);
  };

  const canContinue =
    (step === "found" && foundEverything !== null) ||
    (step === "missingItem" && selectedItem !== null) ||
    (step === "experience" && shoppingSatisfied !== null) ||
    (step === "affected" && affectedReason !== "") ||
    (step === "associate" && associateAssisted !== null) ||
    (step === "associateRating" && associateRating !== "");

  const goBack = () => {
    if (step === "found") {
      onBack();
      return;
    }
    if (step === "missingItem") {
      setStep("found");
      return;
    }
    if (step === "experience") {
      setStep(foundEverything === "no" ? "missingItem" : "found");
      return;
    }
    if (step === "affected") {
      setStep("experience");
      return;
    }
    if (step === "associate") {
      setStep(shoppingSatisfied === "no" ? "affected" : "experience");
      return;
    }
    setStep("associate");
  };

  const goForward = () => {
    if (!canContinue) return;
    if (step === "found") {
      setStep(foundEverything === "no" ? "missingItem" : "experience");
      return;
    }
    if (step === "missingItem") {
      setStep("experience");
      return;
    }
    if (step === "experience") {
      setStep(shoppingSatisfied === "no" ? "affected" : "associate");
      return;
    }
    if (step === "affected") {
      setStep("associate");
      return;
    }
    if (step === "associate") {
      if (associateAssisted === "yes") {
        setStep("associateRating");
        return;
      }
      onComplete();
      return;
    }
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
  }) => {
    const buttonId = `${step}:${children}`;
    const isPressed = active || pressedButton === buttonId;

    return (
      <motion.button
        onClick={() => flashButton(buttonId, onClick)}
        className={`relative overflow-hidden rounded-xl font-black transition-all ${flex ? "flex-1" : "w-full"} ${
          isPressed ? "text-white" : "text-black"
        }`}
        style={{
          fontSize: 38,
          lineHeight: 1.15,
          minHeight: 106,
          padding: "26px 30px",
          background: isPressed ? activeBg : inactiveBg,
          boxShadow: isPressed ? "0 18px 42px rgba(0,0,0,0.28)" : "0 12px 30px rgba(0,0,0,0.12)",
        }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
      >
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: 8, background: isPressed ? "#fff" : "#1e40af" }}
        />
        {children}
      </motion.button>
    );
  };

  const NavButton = ({
    children,
    onClick,
    primary = false,
    disabled = false,
  }: {
    children: string;
    onClick: () => void;
    primary?: boolean;
    disabled?: boolean;
  }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 rounded-xl font-black transition-all ${primary && !disabled ? "text-white" : "text-black"}`}
      style={{
        fontSize: 40,
        minHeight: 100,
        padding: "26px 30px",
        background: disabled ? "#d1d5db" : primary ? activeBg : inactiveBg,
        color: disabled ? "#9ca3af" : primary ? "#fff" : "#000",
        border: primary ? "none" : "2px solid rgba(0,0,0,0.22)",
        boxShadow: disabled ? "none" : "0 12px 30px rgba(0,0,0,0.14)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      whileHover={!disabled ? { scale: 1.015 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {children}
    </motion.button>
  );

  const QuestionShell = ({
    question,
    children,
  }: {
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
            <QuestionShell question="Did you find everything you were looking for in the store today?">
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
            <QuestionShell question="Please tell us what you were looking for.">
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
                    style={{ top: "calc(100% + 8px)", maxHeight: 500 }}
                  >
                    {filteredItems.map((item) => (
                      <button
                        key={`${item.team}-${item.category}-${item.name}`}
                        onClick={() => selectMissingItem(item)}
                        className="w-full text-left hover:bg-gray-50 transition-all"
                        style={{ padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}
                      >
                        <div className="flex items-center" style={{ gap: 22 }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-contain flex-shrink-0"
                            style={{ width: 92, height: 92 }}
                          />
                          <div>
                            <p className="font-black text-black" style={{ fontSize: 32, lineHeight: 1.18 }}>
                              {item.name}
                            </p>
                            <p className="text-black/50" style={{ fontSize: 26, marginTop: 4 }}>
                              {item.team} - {item.category}
                            </p>
                          </div>
                        </div>
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
            <QuestionShell question="Are you satisfied with your shopping experience?">
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
            <QuestionShell question="What affected your shopping experience?">
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
            <QuestionShell question="Did an associate assist you in the store today?">
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
            <QuestionShell question="How satisfied are you with the associate?">
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

        <motion.div
          key={`nav-${step}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex"
          style={{ gap: 18, marginTop: 56 }}
        >
          <NavButton onClick={goBack}>Back</NavButton>
          <NavButton onClick={goForward} primary disabled={!canContinue}>
            Continue
          </NavButton>
        </motion.div>
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
