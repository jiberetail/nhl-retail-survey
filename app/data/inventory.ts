// Shared NHL Shop NYC inventory with images

const ducksJersey1 = "/imports/0026_-_Men_s_Anaheim_Ducks_Lukas_Dostal_Fanatics_Orange_Home_Breakaway_Jersey.jpg";
const ducksJersey2 = "/imports/0039_-_Men_s_Anaheim_Ducks_Chris_Kreider_Fanatics_Orange_Home_Breakaway_Jersey.jpg";
const ducksJersey3 = "/imports/0049_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Breakaway_Jersey.jpg";
const ducksJersey4 = "/imports/0071_-_Men_s_Anaheim_Ducks_Alex_Killorn_Fanatics_Orange_Home_Breakaway_Jersey.png";
const ducksJersey5 = "/imports/0083_-_Men_s_Anaheim_Ducks_Mikael_Granlund_Fanatics_Orange_Home_Breakaway_Jersey.jpg";
const ducksJersey6 = "/imports/0178_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Authentic_Pro_Jersey.jpg";
const ducksJersey8 = "/imports/0352_-_Men_s_Anaheim_Ducks_Fanatics_White_Breakaway_Away_Jersey.jpg";
const ducksJersey11 = "/imports/1179_-_Men_s_Anaheim_Ducks_Fanatics_Black_Breakaway_Home_Jersey.jpg";
const ducksJersey14 = "/imports/1753_-_Men_s_Anaheim_Ducks_Beckett_Sennecke_Fanatics_Orange_Home_Premium_Jersey.png";
const ducksHat1 = "/imports/0003_-_Men_s_Anaheim_Ducks_New_Era_Black_Core_Logo_Two-Tone_59FIFTY_Fitted_Hat.jpg";
const ducksHat2 = "/imports/0009_-_Men_s_Anaheim_Ducks_New_Era_Black_Core_59FIFTY_Fitted_Hat.jpg";
const ducksHat4 = "/imports/0073_-_Men_s_Anaheim_Ducks_New_Era_Orange_9SEVENTY_Adjustable_Hat.jpg";
const ducksHat5 = "/imports/0080_-_Men_s_Anaheim_Ducks_New_Era_Black_Active_Subtle_Camo_39THIRTY_Flex_Hat.jpg";
const bruinsJersey1 = "/imports/0041_-_Men_s_Boston_Bruins_Charlie_McAvoy_Fanatics_Black_Home_Breakaway_Player_Jersey-1.jpg";
const bruinsHat51 = "/imports/0650_-_Men_s_Boston_Bruins__47_Black_Primary_Hitch_Snapback_Hat.jpg";
const bruinsHat52 = "/imports/0674_-_Men_s_Boston_Bruins_Fanatics_GrayBlack_Fundamental_Adapt_Trucker_Adjustable_Hat.jpg";
export interface InventoryItem {
  name: string;
  category: string;
  team: string;
  image: string;
}

export const allInventoryItems: InventoryItem[] = [
  // Jerseys — Anaheim Ducks
  { name: "Lukas Dostal Orange Home Breakaway Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey1 },
  { name: "Chris Kreider Orange Home Breakaway Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey2 },
  { name: "Orange Home Breakaway Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey3 },
  { name: "Alex Killorn Orange Home Breakaway Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey4 },
  { name: "Mikael Granlund Orange Home Breakaway Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey5 },
  { name: "Orange Home Authentic Pro Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey6 },
  { name: "White Breakaway Away Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey8 },
  { name: "Black Breakaway Home Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey11 },
  { name: "Beckett Sennecke Orange Home Premium Jersey", category: "Jersey", team: "Anaheim Ducks", image: ducksJersey14 },
  // Hats — Anaheim Ducks
  { name: "New Era Black Core Logo Two-Tone 59FIFTY Fitted Hat", category: "Hat", team: "Anaheim Ducks", image: ducksHat1 },
  { name: "New Era Black Core 59FIFTY Fitted Hat", category: "Hat", team: "Anaheim Ducks", image: ducksHat2 },
  { name: "New Era Orange 9SEVENTY Adjustable Hat", category: "Hat", team: "Anaheim Ducks", image: ducksHat4 },
  { name: "New Era Black Active Subtle Camo 39THIRTY Flex Hat", category: "Hat", team: "Anaheim Ducks", image: ducksHat5 },
  // Jerseys — Boston Bruins
  { name: "Charlie McAvoy Black Home Breakaway Player Jersey", category: "Jersey", team: "Boston Bruins", image: bruinsJersey1 },
  // Hats — Boston Bruins
  { name: "47 Black Primary Hitch Snapback Hat", category: "Hat", team: "Boston Bruins", image: bruinsHat51 },
  { name: "Fanatics GrayBlack Fundamental Adapt Trucker Hat", category: "Hat", team: "Boston Bruins", image: bruinsHat52 },
];
