import { useMemo, useRef, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CircleHelp, Clock, Home, Search, UserX, X } from "lucide-react";
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
  { label: "Check out time was too long", Icon: Clock },
  { label: "Could not find my item", Icon: Search },
  { label: "The associate was not friendly", Icon: UserX },
  { label: "I needed help and did not receive it.", Icon: CircleHelp },
];

const associateRatings = ["Satisfied", "Neutral", "Dissatisfied"];

type OptionTone = "default" | "green" | "neutral" | "red";

const optionToneStyles: Record<OptionTone, { background: string; color: string; stripe: string; border: string; shadow: string }> = {
  default: {
    background: activeBg,
    color: "#fff",
    stripe: "#fff",
    border: "rgba(255,255,255,0.82)",
    shadow: "0 12px 30px rgba(0,0,0,0.16)",
  },
  green: {
    background: "linear-gradient(135deg, #047857 0%, #16a34a 55%, #86efac 100%)",
    color: "#fff",
    stripe: "#dcfce7",
    border: "rgba(220,252,231,0.92)",
    shadow: "0 12px 30px rgba(22,163,74,0.26)",
  },
  neutral: {
    background: "linear-gradient(135deg, #f3f4f6 0%, #d1d5db 56%, #9ca3af 100%)",
    color: "#111827",
    stripe: "#4b5563",
    border: "rgba(75,85,99,0.5)",
    shadow: "0 12px 30px rgba(75,85,99,0.2)",
  },
  red: {
    background: "linear-gradient(135deg, #991b1b 0%, #dc2626 56%, #fca5a5 100%)",
    color: "#fff",
    stripe: "#fee2e2",
    border: "rgba(254,226,226,0.9)",
    shadow: "0 12px 30px rgba(220,38,38,0.26)",
  },
};

const associateRatingTones: Record<string, OptionTone> = {
  Satisfied: "green",
  Neutral: "neutral",
  Dissatisfied: "red",
};

const maxMissingItems = 5;

const getItemKey = (item: InventoryItem) => `${item.team}::${item.category}::${item.name}`;

function OptionButton({
  active,
  onClick,
  children,
  icon,
  flex = false,
  tone = "default",
}: {
  active: boolean;
  onClick: () => void;
  children: string;
  icon?: ReactNode;
  flex?: boolean;
  tone?: OptionTone;
}) {
  const activeStyle = optionToneStyles[tone];

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-black ${flex ? "flex-1" : "w-full"}`}
      style={{
        fontSize: 38,
        lineHeight: 1.15,
        minHeight: 106,
        padding: "26px 30px",
        background: active ? activeStyle.background : inactiveBg,
        color: active ? activeStyle.color : "#000",
        border: `2px solid ${active ? activeStyle.border : "rgba(255,255,255,0.6)"}`,
        boxShadow: active ? activeStyle.shadow : "0 12px 30px rgba(0,0,0,0.16)",
        transition: "background 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
      }}
      whileTap={{ scale: 0.992 }}
    >
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 8, background: active ? activeStyle.stripe : "#1e40af" }}
      />
      <span className="relative z-10 flex items-center justify-center" style={{ gap: 18 }}>
        {icon && <span className="flex items-center justify-center flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    </motion.button>
  );
}

function NavButton({
  children,
  onClick,
  primary = false,
  disabled = false,
}: {
  children: string;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl font-black"
      style={{
        fontSize: 40,
        width: 540,
        minHeight: 100,
        padding: "26px 30px",
        background: disabled ? "#d1d5db" : primary ? activeBg : inactiveBg,
        color: disabled ? "#9ca3af" : primary ? "#fff" : "#000",
        border: primary ? "none" : "2px solid rgba(0,0,0,0.22)",
        boxShadow: disabled ? "none" : "0 12px 30px rgba(0,0,0,0.14)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease",
      }}
      whileTap={!disabled ? { scale: 0.992 } : {}}
    >
      {children}
    </motion.button>
  );
}

function QuestionShell({ question, children }: { question: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
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
}

export function PurchaseSurveyScreen({ onComplete, onHome, onBack }: PurchaseSurveyScreenProps) {
  const [step, setStep] = useState<SurveyStep>("found");
  const [foundEverything, setFoundEverything] = useState<YesNo | null>(null);
  const [shoppingSatisfied, setShoppingSatisfied] = useState<YesNo | null>(null);
  const [affectedReason, setAffectedReason] = useState("");
  const [associateAssisted, setAssociateAssisted] = useState<YesNo | null>(null);
  const [associateRating, setAssociateRating] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([]);
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
      .filter((item) => {
        const matchesQuery =
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.team.toLowerCase().includes(query);
        const isSelected = selectedItems.some((selected) => getItemKey(selected) === getItemKey(item));
        return matchesQuery && !isSelected;
      })
      .slice(0, 8);
  }, [itemSearch, selectedItems]);

  const canAddMissingItem = selectedItems.length < maxMissingItems;

  const selectFoundEverything = (answer: YesNo) => {
    setFoundEverything(answer);
    setShoppingSatisfied(null);
    setAffectedReason("");
    setAssociateAssisted(null);
    setAssociateRating("");
    setSelectedItems([]);
    setItemSearch("");
    setShowDropdown(false);
  };

  const selectMissingItem = (item: InventoryItem) => {
    setSelectedItems((currentItems) => {
      if (currentItems.some((selected) => getItemKey(selected) === getItemKey(item))) {
        return currentItems;
      }
      if (currentItems.length >= maxMissingItems) {
        return currentItems;
      }
      return [...currentItems, item];
    });
    setItemSearch("");
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

  const removeMissingItem = (item: InventoryItem) => {
    setSelectedItems((currentItems) =>
      currentItems.filter((selected) => getItemKey(selected) !== getItemKey(item))
    );
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
    (step === "missingItem" && selectedItems.length > 0) ||
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
            <QuestionShell key="found" question="Did you find everything you were looking for in the store today?">
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
            <QuestionShell key="missingItem" question="Please tell us what you were looking for.">
              <div className="relative" style={{ zIndex: 30 }}>
                <Search
                  className="absolute text-gray-400"
                  style={{ width: 44, height: 44, left: 28, top: 44 }}
                />
                <input
                  type="text"
                  value={itemSearch}
                  onChange={(e) => {
                    if (!canAddMissingItem) return;
                    setItemSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(canAddMissingItem)}
                  placeholder={canAddMissingItem ? "Search jerseys, hats, accessories..." : "5 items added"}
                  disabled={!canAddMissingItem}
                  className="w-full rounded-xl border-2 border-gray-300 bg-white text-black focus:outline-none focus:border-black"
                  style={{
                    fontSize: 40,
                    padding: "32px 32px 32px 88px",
                    opacity: canAddMissingItem ? 1 : 0.72,
                  }}
                />

                {showDropdown && canAddMissingItem && itemSearch.trim() && (
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

              {selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg"
                  style={{ marginTop: 26, padding: "18px 20px" }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                    <p className="font-black text-black" style={{ fontSize: 28 }}>
                      Items added
                    </p>
                    <p className="font-black text-black/45" style={{ fontSize: 26 }}>
                      {selectedItems.length}/{maxMissingItems}
                    </p>
                  </div>
                  <div className="flex flex-col" style={{ gap: 12 }}>
                    {selectedItems.map((item) => (
                      <div
                        key={getItemKey(item)}
                        className="flex items-center rounded-lg"
                        style={{
                          gap: 18,
                          padding: "12px 12px 12px 16px",
                          background: "rgba(243,244,246,0.92)",
                          border: "1px solid rgba(156,163,175,0.45)",
                        }}
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-contain flex-shrink-0"
                            style={{ width: 74, height: 74 }}
                          />
                        )}
                        <div className="min-w-0" style={{ flex: 1 }}>
                          <p className="font-black text-black truncate" style={{ fontSize: 28, lineHeight: 1.12 }}>
                            {item.name}
                          </p>
                          <p className="text-black/50 truncate" style={{ fontSize: 22, marginTop: 2 }}>
                            {item.team} - {item.category}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMissingItem(item)}
                          aria-label={`Remove ${item.name}`}
                          className="flex items-center justify-center rounded-full bg-white shadow-sm"
                          style={{
                            width: 54,
                            height: 54,
                            border: "2px solid rgba(220,38,38,0.28)",
                            flexShrink: 0,
                          }}
                        >
                          <X style={{ width: 30, height: 30, color: "#dc2626" }} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </QuestionShell>
          )}

          {step === "experience" && (
            <QuestionShell key="experience" question="Are you satisfied with your shopping experience?">
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
            <QuestionShell key="affected" question="What affected your shopping experience?">
              <div className="flex flex-col" style={{ gap: 16 }}>
                {affectedReasons.map(({ label, Icon }) => (
                  <OptionButton
                    key={label}
                    active={affectedReason === label}
                    onClick={() => selectAffectedReason(label)}
                    icon={<Icon style={{ width: 42, height: 42 }} strokeWidth={2.4} />}
                  >
                    {label}
                  </OptionButton>
                ))}
              </div>
            </QuestionShell>
          )}

          {step === "associate" && (
            <QuestionShell key="associate" question="Did an associate assist you in the store today?">
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
            <QuestionShell key="associateRating" question="How satisfied are you with the associate?">
              <div className="flex flex-col" style={{ gap: 16 }}>
                {associateRatings.map((rating) => (
                  <OptionButton
                    key={rating}
                    active={associateRating === rating}
                    onClick={() => selectAssociateRating(rating)}
                    tone={associateRatingTones[rating]}
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
          className="flex justify-center"
          style={{ marginTop: 56 }}
        >
          <NavButton onClick={goForward} primary disabled={!canContinue}>
            Continue
          </NavButton>
        </motion.div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-30 flex" style={{ bottom: 36, gap: 24 }}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={goBack}
          className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          style={{ padding: 28 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onHome}
          className="bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          style={{ padding: 28 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Home style={{ width: 48, height: 48 }} className="text-black" />
        </motion.button>
      </div>
    </div>
  );
}
