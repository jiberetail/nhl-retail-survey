"use client";

import { useState, useEffect } from "react"; // v2
import { LanguageProvider } from "./contexts/LanguageContext";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LanguageLocationScreen } from "./components/LanguageLocationScreen";
import { AllTeamsScreen } from "./components/AllTeamsScreen";
import { MerchCategoryScreen } from "./components/MerchCategoryScreen";
import { MerchDemographicScreen } from "./components/MerchDemographicScreen";
import { MerchItemsScreen } from "./components/MerchItemsScreen";
import { OnlineAvailableScreen } from "./components/OnlineAvailableScreen";
import { EmailCaptureScreen } from "./components/EmailCaptureScreen";
import { PurchaseSurveyScreen } from "./components/PurchaseSurveyScreen";
import { ThankYouScreen } from "./components/ThankYouScreen";

const KIOSK_W = 1080;
const KIOSK_H = 1920;

type CartItem = {
  id: string;
  name: string;
  image: string;
  size?: string;
  productUrl?: string;
  productId?: string;
  shopCategory?: string;
  categoryUrl?: string;
  teamName?: string;
  category?: string;
  demographic?: string;
  price: number;
  regularPrice?: number;
  currency: "USD";
};

export default function App() {
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const resize = () => {
      const s = Math.min(window.innerWidth / KIOSK_W, window.innerHeight / KIOSK_H);
      setScale(s);
      setOffsetX((window.innerWidth - KIOSK_W * s) / 2);
      setOffsetY((window.innerHeight - KIOSK_H * s) / 2);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "language" | "allteams" | "merch" | "demographic" | "items" |
    "onlineavailable" | "emailcapture" | "purchasesurvey" | "complete"
  >("welcome");

  const [selectedTeam, setSelectedTeam] = useState<{ id: string; name: string; logo: string | null }>({ id: "", name: "", logo: null });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDemographic, setSelectedDemographic] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const resetAll = () => {
    setCartItems([]);
    setSelectedTeam({ id: "", name: "", logo: null });
    setSelectedCategory("");
    setSelectedDemographic("");
    setSubmittedEmail("");
    setCurrentScreen("welcome");
  };

  return (
    <LanguageProvider>
      <div className="size-full overflow-hidden bg-black">
        <div
          className="bg-white overflow-hidden relative"
          style={{
            width: KIOSK_W,
            height: KIOSK_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: offsetY,
            left: offsetX,
          }}
        >
          {currentScreen === "welcome" && (
            <WelcomeScreen onStart={() => setCurrentScreen("language")} />
          )}
          {currentScreen === "language" && (
            <LanguageLocationScreen
              onContinue={() => setCurrentScreen("allteams")}
              onHome={() => setCurrentScreen("welcome")}
              onBack={() => setCurrentScreen("welcome")}
            />
          )}
          {currentScreen === "allteams" && (
            <AllTeamsScreen
              onComplete={(team) => {
                setSelectedTeam(team);
                setCurrentScreen("merch");
              }}
              onHome={() => setCurrentScreen("welcome")}
              onBack={() => setCurrentScreen("language")}
            />
          )}
          {currentScreen === "merch" && (
            <MerchCategoryScreen
              sport="nhl"
              teamName={selectedTeam.name}
              teamLogo={selectedTeam.logo}
              onComplete={(category) => {
                setSelectedCategory(category);
                if (category === "jerseys") {
                  setCurrentScreen("demographic");
                } else {
                  setCurrentScreen("items");
                }
              }}
              onHome={() => setCurrentScreen("welcome")}
              onBack={() => setCurrentScreen("allteams")}
              onBackToTeams={() => setCurrentScreen("allteams")}
            />
          )}
          {currentScreen === "demographic" && (
            <MerchDemographicScreen
              category={selectedCategory}
              teamName={selectedTeam.name}
              onComplete={(demographic) => {
                setSelectedDemographic(demographic);
                setCurrentScreen("items");
              }}
              onHome={() => setCurrentScreen("welcome")}
              onBack={() => setCurrentScreen("merch")}
            />
          )}
          {currentScreen === "items" && (
            <MerchItemsScreen
              teamName={selectedTeam.name}
              teamLogo={selectedTeam.logo}
              category={selectedCategory}
              demographic={selectedDemographic}
              onAddToCart={(item) => {
                setCartItems(prev => [
                  ...prev,
                  {
                    ...item,
                    teamName: selectedTeam.name,
                    category: selectedCategory,
                    demographic: selectedDemographic,
                  },
                ]);
              }}
              onComplete={() => setCurrentScreen("onlineavailable")}
              onHome={() => setCurrentScreen("welcome")}
              onBack={() => {
                if (selectedCategory === "jerseys") {
                  setCurrentScreen("demographic");
                } else {
                  setCurrentScreen("merch");
                }
              }}
              onContinueShopping={() => setCurrentScreen("merch")}
            />
          )}
          {currentScreen === "onlineavailable" && (
            <OnlineAvailableScreen
              cartItems={cartItems}
              onComplete={() => setCurrentScreen("purchasesurvey")}
              onContinueShopping={() => setCurrentScreen("merch")}
              onBack={() => setCurrentScreen("items")}
              onHome={resetAll}
            />
          )}
          {currentScreen === "emailcapture" && (
            <EmailCaptureScreen
              onContinue={(email) => {
                setSubmittedEmail(email);
                setCurrentScreen("complete");
              }}
              onHome={resetAll}
            />
          )}
          {currentScreen === "purchasesurvey" && (
            <PurchaseSurveyScreen
              onComplete={() => setCurrentScreen("emailcapture")}
              onBack={() => setCurrentScreen("onlineavailable")}
              onHome={resetAll}
            />
          )}
          {currentScreen === "complete" && (
            <ThankYouScreen email={submittedEmail} onReset={resetAll} />
          )}

        </div>
      </div>
    </LanguageProvider>
  );
}
