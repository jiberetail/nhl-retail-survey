import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft, Search } from "lucide-react";
import logoSrc from "../../imports/NHL-Logo.png?url";
import backgroundVideo from "../../imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";

// Anaheim Ducks Men's Jerseys
import ducksJersey1 from "../../imports/0026_-_Men_s_Anaheim_Ducks_Lukas_Dostal_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksJersey2 from "../../imports/0039_-_Men_s_Anaheim_Ducks_Chris_Kreider_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksJersey3 from "../../imports/0049_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksJersey4 from "../../imports/0071_-_Men_s_Anaheim_Ducks_Alex_Killorn_Fanatics_Orange_Home_Breakaway_Jersey.png?url";
import ducksJersey5 from "../../imports/0083_-_Men_s_Anaheim_Ducks_Mikael_Granlund_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksJersey6 from "../../imports/0178_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Authentic_Pro_Jersey.jpg?url";
import ducksJersey7 from "../../imports/0344_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Authentic_Pro_Custom_Jersey.jpg?url";
import ducksJersey8 from "../../imports/0352_-_Men_s_Anaheim_Ducks_Fanatics_White_Breakaway_Away_Jersey.jpg?url";
import ducksJersey9 from "../../imports/1034_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Premium_Custom_Jersey.jpg?url";
import ducksJersey10 from "../../imports/1064_-_Men_s_Anaheim_Ducks_Jacob_Trouba_Fanatics_Orange_Home_Breakaway_Player_Jersey.jpg?url";
import ducksJersey11 from "../../imports/1179_-_Men_s_Anaheim_Ducks_Fanatics_Black_Breakaway_Home_Jersey.jpg?url";
import ducksJersey12 from "../../imports/1304_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Home_Premium_Jersey.jpg?url";
import ducksJersey13 from "../../imports/1534_-_Men_s_Anaheim_Ducks_John_Carlson_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksJersey14 from "../../imports/1753_-_Men_s_Anaheim_Ducks_Beckett_Sennecke_Fanatics_Orange_Home_Premium_Jersey.png?url";

// Anaheim Ducks Women's Jerseys
import ducksWomenJersey1 from "../../imports/0235_-_Women_s_Anaheim_Ducks_Beckett_Sennecke_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey2 from "../../imports/0392_-_Women_s_Anaheim_Ducks_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey3 from "../../imports/0413_-_Women_s_Anaheim_Ducks_Leo_Carlsson_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey4 from "../../imports/0418_-_Women_s_Anaheim_Ducks_Fanatics_Black_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey5 from "../../imports/0450_-_Women_s_Anaheim_Ducks_Cutter_Gauthier_Fanatics_Orange_Home_Breakaway_Jersey.png?url";
import ducksWomenJersey6 from "../../imports/0706_-_Women_s_Anaheim_Ducks_Troy_Terry_Fanatics_Black_Home_Team_Breakaway_Player_Jersey.jpg?url";
import ducksWomenJersey7 from "../../imports/0850_-_Women_s_Anaheim_Ducks_Mikael_Granlund_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey8 from "../../imports/0878_-_Women_s_Anaheim_Ducks_Chris_Kreider_Fanatics_Orange_Home_Breakaway_Player_Jersey.jpg?url";
import ducksWomenJersey9 from "../../imports/0918_-_Women_s_Anaheim_Ducks_Fanatics_White_Away_Breakaway_Jersey.jpg?url";
import ducksWomenJersey10 from "../../imports/0953_-_Women_s_Anaheim_Ducks_Ryan_Poehling_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey11 from "../../imports/0980_-_Women_s_Anaheim_Ducks_Petr_Mrazek_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey12 from "../../imports/1118_-_Women_s_Anaheim_Ducks_Jakob_Silfverberg_Fanatics_Black_Breakaway_Jersey.jpg?url";
import ducksWomenJersey13 from "../../imports/1273_-_Women_s_Anaheim_Ducks_John_Carlson_Fanatics_Orange_Home_Breakaway_Jersey.jpg?url";
import ducksWomenJersey14 from "../../imports/1468_-_Women_s_Anaheim_Ducks_Lukas_Dostal_Fanatics_Orange_Home_Breakaway_Jersey.png?url";

// Anaheim Ducks Kids/Youth Jerseys
import ducksKidsJersey1 from "../../imports/0484_-_Youth_Anaheim_Ducks_Chris_Kreider_Outerstuff_Orange_Home_Replica_Jersey.jpg?url";
import ducksKidsJersey2 from "../../imports/0786_-_Youth_Anaheim_Ducks_Black_Home_Replica_Jersey.jpg?url";
import ducksKidsJersey3 from "../../imports/1238_-_Youth_Anaheim_Ducks_Black_Home_Replica_Custom_Jersey.jpg?url";
import ducksKidsJersey4 from "../../imports/1458_-_Youth_Anaheim_Ducks_Orange_Home_Replica_Jersey.jpg?url";

// Anaheim Ducks Hats
import ducksHat1 from "../../imports/0003_-_Men_s_Anaheim_Ducks_New_Era_Black_Core_Logo_Two-Tone_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat2 from "../../imports/0009_-_Men_s_Anaheim_Ducks_New_Era_Black_Core_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat3 from "../../imports/0047_-_Men_s_Anaheim_Ducks_Mitchell___Ness_Black_Team_Ground_Pro_Adjustable_Hat.jpg?url";
import ducksHat4 from "../../imports/0073_-_Men_s_Anaheim_Ducks_New_Era_Orange_9SEVENTY_Adjustable_Hat.jpg?url";
import ducksHat5 from "../../imports/0080_-_Men_s_Anaheim_Ducks_New_Era_Black_Active_Subtle_Camo_39THIRTY_Flex_Hat.jpg?url";
import ducksHat6 from "../../imports/0107_-_Men_s_Anaheim_Ducks_Mitchell___Ness_Black_Core_Top_Spot_Snapback_Hat.jpg?url";
import ducksHat7 from "../../imports/0133_-_Men_s_Anaheim_Ducks_New_Era_Orange_COOLERA_9FORTY_M-Crown_Adjustable_Hat.jpg?url";
import ducksHat8 from "../../imports/0140_-_Men_s_Anaheim_Ducks_New_Era_Black_Core_Trucker_9SEVENTY_Stretch-Snap_Hat.jpg?url";
import ducksHat9 from "../../imports/0171_-_Men_s_Anaheim_Ducks__47_Teal_Core_Vintage_Logo_Clean_Up_Adjustable_Hat.jpg?url";
import ducksHat10 from "../../imports/0281_-_Men_s_Anaheim_Ducks__47_Khaki_Logo_Clean_Up_Adjustable_Hat.jpg?url";
import ducksHat11 from "../../imports/0370_-_Men_s_Anaheim_Ducks_Fanatics_BlackOrange_Authentic_Pro_Rink_Team_Code_Flex_Hat.jpg?url";
import ducksHat12 from "../../imports/0423_-_Men_s_Anaheim_Ducks_New_Era_TurquoiseCharcoal_Two-Tone_Color_Pack_9FIFTY_Snapback_Hat.jpg?url";
import ducksHat13 from "../../imports/0584_-_Men_s_Anaheim_Ducks_Fanatics_BlackNatural_Rival_Trucker_Adjustable_Hat.png?url";
import ducksHat14 from "../../imports/0656_-_Men_s_Anaheim_Ducks_New_Era_Black_Quilted_Nylon_9SEVENTY_Adjustable_Trucker_Hat.jpg?url";
import ducksHat15 from "../../imports/0706_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Fundamentals_Loden_Snapback_Hat.jpg?url";
import ducksHat16 from "../../imports/0787_-_Men_s_Anaheim_Ducks_Fanatics_Orange_Core_Primary_Logo_Adjustable_Hat.jpg?url";
import ducksHat17 from "../../imports/0911_-_Men_s_Anaheim_Ducks_Fanatics_Black_Fundamental_Gino_Stack_Snapback_Hat.jpg?url";
import ducksHat18 from "../../imports/1150_-_Men_s_Anaheim_Ducks_Mitchell___Ness_Black_Tailgate_Balaclava.jpg?url";
import ducksHat19 from "../../imports/1413_-_Men_s_Anaheim_Ducks_New_Era_Light_PurplePurple_Lavender_Bloom_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat20 from "../../imports/1436_-_Men_s_Anaheim_Ducks__47_Orange_Clean_Up_Adjustable_Hat.jpg?url";
import ducksHat21 from "../../imports/1567_-_Men_s_Anaheim_Ducks_Levelwear_Cream_Faux_Leather_Patch_Unstructured_Adjustable_Hat.jpg?url";
import ducksHat22 from "../../imports/1676_-_Men_s_Anaheim_Ducks_New_Era_TurquoiseCharcoal_Two-Tone_Color_Pack_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat23 from "../../imports/1704_-_Men_s_Anaheim_Ducks_New_Era_CreamTan_Colorpack_Two-Tone_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat24 from "../../imports/1753_-_Men_s_Anaheim_Ducks_Fanatics_Black_Core_Fitted_Hat.jpg?url";
import ducksHat25 from "../../imports/1758_-_Men_s_Anaheim_Ducks__47_Black_Nantasket_Captain_Adjustable_Hat.jpg?url";
import ducksHat26 from "../../imports/1816_-_Men_s_Anaheim_Ducks_American_Needle_Tan_Hepcat_Washed_Twill_Adjustable_Hat.jpg?url";
import ducksHat27 from "../../imports/1860_-_Men_s_Anaheim_Ducks_New_Era_BlackOrange_Mascot_2-Tone_9FORTY_Adjustable_Hat.jpg?url";
import ducksHat28 from "../../imports/1883_-_Men_s_Anaheim_Ducks__47_Black_No_Shot_Captain_Snapback_Hat.jpg?url";
import ducksHat29 from "../../imports/2062_-_Men_s_Anaheim_Ducks_New_Era_Orange_Core_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat30 from "../../imports/2080_-_Men_s_Anaheim_Ducks__47_Black_Core_Logo_Clean_Up_Adjustable_Hat.jpg?url";
import ducksHat31 from "../../imports/2089_-_Men_s_Anaheim_Ducks__47_Purple_Cold_Zone_MVP_Adjustable_Hat.jpg?url";
import ducksHat32 from "../../imports/2130_-_Men_s_Anaheim_Ducks_New_Era_Olive_Tonal_Florals_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat33 from "../../imports/2208_-_Men_s_Anaheim_Ducks_New_Era_CreamOrange_Vintage_Cuffed_Knit_Hat.jpg?url";
import ducksHat34 from "../../imports/2645_-_Men_s_Anaheim_Ducks__47_CreamBlack_Logo_Hitch_Adjustable_Hat.jpg?url";
import ducksHat35 from "../../imports/2732_-_Men_s_Anaheim_Ducks_New_Era_Black_Script_A-Frame_9FIFTY_Snapback_Hat.jpg?url";
import ducksHat36 from "../../imports/2744_-_Men_s_Anaheim_Ducks_New_Era_Orange_Faded_A-Frame_9FIFTY_Trucker_Snapback_Hat.jpg?url";
import ducksHat37 from "../../imports/2748_-_Men_s_Anaheim_Ducks__47_Black_No_Shot_Captain_Snapback_Hat.jpg?url";
import ducksHat38 from "../../imports/2761_-_Men_s_Anaheim_Ducks_Fanatics_Black_Force_Adjustable_Hat.png?url";
import ducksHat39 from "../../imports/2763_-_Men_s_Anaheim_Ducks_New_Era_TanBlack_Localized_City_Icon_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat40 from "../../imports/2766_-_Men_s_Anaheim_Ducks_Mitchell___Ness_Teal_Head_Coach_Trucker_Adjustable_Hat.jpg?url";
import ducksHat41 from "../../imports/2768_-_Men_s_Anaheim_Ducks_New_Era_OrangeBlack_39THIRTY_Two-Tone_Featherweight_M-Crown_Flex_Hat.jpg?url";
import ducksHat42 from "../../imports/2782_-_Men_s_Anaheim_Ducks_New_Era_Black_Freedom_Pre-Curved_59FIFTY_Fitted_Hat.jpg?url";
import ducksHat43 from "../../imports/2790_-_Men_s_Anaheim_Ducks_New_Era_Black_Throwback_Stanley_Cup_Champions_Side_Patch_19TWENTY_Adjustable_Hat.jpg?url";
import ducksHat44 from "../../imports/2830_-_Men_s_Anaheim_Ducks_Fanatics_Black_Team_Logo_Pride_Adjustable_Hat.jpg?url";
import ducksHat45 from "../../imports/0071_-_Youth_Anaheim_Ducks_New_Era_Black_9FORTY_A-Frame_Adjustable_Hat.jpg?url";
import ducksHat46 from "../../imports/1760_-_Youth_Anaheim_Ducks_Mitchell___Ness_Orange_Mascot_Snapback_Hat.jpg?url";
import ducksHat47 from "../../imports/2129_-_Unisex_Anaheim_Ducks_New_Era_Orange_Mascot_Patch_9TWENTY_Adjustable_Hat.jpg?url";

// Boston Bruins Men's Jerseys
import bruinsJersey1 from "../../imports/0041_-_Men_s_Boston_Bruins_Charlie_McAvoy_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey2 from "../../imports/0055_-_Men_s_Boston_Bruins_David_Pastrnak_Fanatics_Black_Home_Breakaway_Jersey.png?url";
import bruinsJersey3 from "../../imports/0080_-_Men_s_Boston_Bruins_Charlie_McAvoy_Fanatics_Black_Home_Premium_Player_Jersey.jpg?url";
import bruinsJersey4 from "../../imports/0096_-_Men_s_Boston_Bruins_Jeremy_Swayman_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey5 from "../../imports/0164_-_Men_s_Boston_Bruins_Fanatics_Black_Breakaway_Home_Jersey.jpg?url";
import bruinsJersey6 from "../../imports/0188_-_Men_s_Boston_Bruins_Nikita_Zadorov_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey7 from "../../imports/0213_-_Men_s_Boston_Bruins_Fanatics_Black_Home_Breakaway_Custom_Jersey.jpg?url";
import bruinsJersey8 from "../../imports/0243_-_Men_s_Boston_Bruins_Fanatics_Black_Home_Authentic_Pro_Custom_Jersey.jpg?url";
import bruinsJersey9 from "../../imports/0263_-_Men_s_Boston_Bruins_David_Pastrnak_Fanatics_Black_Home_Premium_Player_Jersey.jpg?url";
import bruinsJersey10 from "../../imports/0295_-_Men_s_Boston_Bruins_Fanatics_Black_Home_Premium_Custom_Jersey.jpg?url";
import bruinsJersey11 from "../../imports/0398_-_Men_s_Boston_Bruins_Jeremy_Swayman_Fanatics_Black_Home_Breakaway_Jersey.png?url";
import bruinsJersey12 from "../../imports/0424_-_Men_s_Boston_Bruins_Fanatics_Gold_2026_NHL_Stadium_Series_Premium_Jersey.jpg?url";
import bruinsJersey13 from "../../imports/0426_-_Men_s_Boston_Bruins_Fanatics_White_Away_Breakaway_Custom_Jersey.jpg?url";
import bruinsJersey14 from "../../imports/0427_-_Men_s_Boston_Bruins_David_Pastrnak_Mitchell___Ness_Black_2015_Power_Play_Jersey.jpg?url";
import bruinsJersey15 from "../../imports/0445_-_Men_s_Boston_Bruins_Fanatics_Black_Home_Premium_Jersey.jpg?url";
import bruinsJersey16 from "../../imports/0452_-_Men_s_Boston_Bruins_Pavel_Zacha_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey17 from "../../imports/0489_-_Men_s_Boston_Bruins_Fanatics_White_Away_Breakaway_Jersey.jpg?url";
import bruinsJersey18 from "../../imports/0500_-_Men_s_Boston_Bruins_David_Pastrnak_Fanatics_White_Away_Premium_Player_Jersey.jpg?url";
import bruinsJersey19 from "../../imports/0508_-_Men_s_Boston_Bruins_Ray_Bourque_Mitchell___Ness_Gold_Big___Tall_1996-97_Blue_Line_2.0_Jersey.jpg?url";
import bruinsJersey20 from "../../imports/0533_-_Men_s_Boston_Bruins_Bobby_Orr_Black_1971-72_Power_Play_Jersey.jpg?url";
import bruinsJersey21 from "../../imports/0569_-_Men_s_Boston_Bruins_Fanatics_Black_Home_Authentic_Pro_Jersey.jpg?url";
import bruinsJersey22 from "../../imports/0586_-_Men_s_Boston_Bruins_Fanatics_White_Away_Premium_Custom_Jersey.jpg?url";
import bruinsJersey23 from "../../imports/0623_-_Men_s_Boston_Bruins_Fanatics_Black_100th_Anniversary_Authentic_Pro_Jersey.jpg?url";
import bruinsJersey24 from "../../imports/0702_-_Men_s_Boston_Bruins_Fanatics_Black_Practice_Jersey.jpg?url";
import bruinsJersey25 from "../../imports/0838_-_Men_s_Boston_Bruins_Ray_Bourque_Mitchell___Ness_Gold_1996-97_Power_Play_Jersey.jpg?url";
import bruinsJersey26 from "../../imports/0843_-_Men_s_Boston_Bruins_Fanatics_Gold_2026_NHL_Stadium_Series_Authentic_Pro_Jersey.png?url";
import bruinsJersey27 from "../../imports/0863_-_Men_s_Boston_Bruins_Fanatics_White_Away_Premium_Jersey.jpg?url";
import bruinsJersey28 from "../../imports/0866_-_Men_s_Boston_Bruins_Fanatics_White_Breakaway_Away_Jersey.jpg?url";
import bruinsJersey29 from "../../imports/0883_-_Men_s_Boston_Bruins_Hampus_Lindholm_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey30 from "../../imports/0894_-_Men_s_Boston_Bruins_Bobby_Orr_Mitchell___Ness_Black_Big___Tall_197172_Blue_Line_2.0_Jersey.jpg?url";
import bruinsJersey31 from "../../imports/0897_-_Men_s_Boston_Bruins_Fanatics_White_Hockey_Fights_Cancer_Survivor_Practice_Jersey.jpg?url";
import bruinsJersey32 from "../../imports/0916_-_Men_s_Boston_Bruins_Elias_Lindholm_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey33 from "../../imports/0920_-_Men_s_Boston_Bruins_Patrick_Brown_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey34 from "../../imports/0925_-_Men_s_Boston_Bruins_Ray_Bourque_Mitchell___Ness_White_Big___Tall_Captain_Patch_Blue_Line_Player_Jersey.jpg?url";
import bruinsJersey35 from "../../imports/0947_-_Men_s_Boston_Bruins_Sean_Kuraly_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey36 from "../../imports/1017_-_Men_s_Boston_Bruins_Brad_Marchand_Black_2014-15_Power_Play_Jersey.jpg?url";
import bruinsJersey37 from "../../imports/1096_-_Men_s_Boston_Bruins_Fanatics_Black_Anniversary_Home_Breakaway_Jersey.jpg?url";
import bruinsJersey38 from "../../imports/1097_-_Men_s_Boston_Bruins_David_Pastrnak_Black_2014-15_Power_Play_Jersey.jpg?url";
import bruinsJersey39 from "../../imports/1156_-_Men_s_Boston_Bruins_Fanatics_White_Away_Premium_Jersey.jpg?url";
import bruinsJersey40 from "../../imports/1185_-_Men_s_Boston_Bruins_Fanatics_Gold_2026_NHL_Stadium_Series_Premium_Custom_Jersey.png?url";
import bruinsJersey41 from "../../imports/1295_-_Men_s_Boston_Bruins_Fanatics_Black_Home_Authentic_Pro_Jersey.jpg?url";
import bruinsJersey42 from "../../imports/1427_-_Men_s_Boston_Bruins_Fanatics_White_Away_Authentic_Pro_Jersey.jpg?url";
import bruinsJersey43 from "../../imports/1489_-_Men_s_Boston_Bruins_David_Pastrnak_Fanatics_White_Away_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey44 from "../../imports/1533_-_Men_s_Boston_Bruins_David_Pastrnak_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsJersey45 from "../../imports/1576_-_Men_s_Boston_Bruins_John_Bucyk_Fanatics_Black_Premier_Breakaway_Retired_Player_Jersey.jpg?url";
import bruinsJersey46 from "../../imports/1656_-_Men_s_Boston_Bruins_Fanatics_White_Away_Authentic_Pro_Custom_Jersey.jpg?url";
import bruinsJersey47 from "../../imports/1748_-_Men_s_Boston_Bruins_Jeremy_Swayman_Fanatics_White_Away_Breakaway_Player_Jersey.jpg?url";

// Boston Bruins Women's Jerseys
import bruinsWomenJersey1 from "../../imports/0114_-_Women_s_Boston_Bruins_Fanatics_Black_Home_Breakaway_Jersey.jpg?url";
import bruinsWomenJersey2 from "../../imports/0493_-_Women_s_Boston_Bruins_David_Pastrnak_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey3 from "../../imports/0544_-_Women_s_Boston_Bruins_Morgan_Geekie_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey4 from "../../imports/0545_-_Women_s_Boston_Bruins_Fanatics_Black_Alternate_100th_Anniversary_Breakaway_Jersey.jpg?url";
import bruinsWomenJersey5 from "../../imports/0763_-_Women_s_Boston_Bruins_Fanatics_Black_Home_Breakaway_Custom_Jersey.jpg?url";
import bruinsWomenJersey6 from "../../imports/0818_-_Women_s_Boston_Bruins_James_Hagens_Fanatics_Black_Breakaway_Jersey.png?url";
import bruinsWomenJersey7 from "../../imports/0858_-_Women_s_Boston_Bruins_Nikita_Zadorov_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey8 from "../../imports/0912_-_Women_s_Boston_Bruins_David_Pastrnak_Fanatics_Black_100th_Anniversary_Breakaway_Jersey.jpg?url";
import bruinsWomenJersey9 from "../../imports/0976_-_Women_s_Boston_Bruins_Fanatics_Black_Anniversary_Home_Breakaway_Jersey.jpg?url";
import bruinsWomenJersey10 from "../../imports/1168_-_Women_s_Boston_Bruins_Fanatics_Black_Home_Breakaway_Custom_Jersey.jpg?url";
import bruinsWomenJersey11 from "../../imports/1197_-_Women_s_Boston_Bruins_Jeremy_Swayman_Fanatics_Black_Home_Breakaway_Jersey.png?url";
import bruinsWomenJersey12 from "../../imports/1391_-_Women_s_Boston_Bruins_David_Pastrnak_Fanatics_Black_Home_Breakaway_Jersey.png?url";
import bruinsWomenJersey13 from "../../imports/1396_-_Women_s_Boston_Bruins_David_Pastrnak_Fanatics_White_Away_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey14 from "../../imports/1406_-_Women_s_Boston_Bruins_Elias_Lindholm_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey15 from "../../imports/1443_-_Women_s_Boston_Bruins_Hampus_Lindholm_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey16 from "../../imports/1581_-_Women_s_Boston_Bruins_Pavel_Zacha_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey17 from "../../imports/1602_-_Women_s_Boston_Bruins_Sean_Kuraly_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey18 from "../../imports/1647_-_Women_s_Boston_Bruins_Patrick_Brown_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey19 from "../../imports/1648_-_Women_s_Boston_Bruins_Michael_Eyssimont_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey20 from "../../imports/1659_-_Women_s_Boston_Bruins_John_Beecher_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey21 from "../../imports/1666_-_Women_s_Boston_Bruins_Hampus_Lindholm_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey22 from "../../imports/1677_-_Women_s_Boston_Bruins_Casey_Mittelstadt_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey23 from "../../imports/1679_-_Women_s_Boston_Bruins_Andrew_Peeke_Fanatics_Black_Home_Breakaway_Player_Jersey.jpg?url";
import bruinsWomenJersey24 from "../../imports/1796_-_Women_s_Boston_Bruins_Fanatics_White_Away_Breakaway_Jersey.jpg?url";

// Boston Bruins Kids/Youth Jerseys
import bruinsKidsJersey1 from "../../imports/0570_-_Youth_Boston_Bruins_Jeremy_Swayman_Outerstuff_Black_Home_Replica_Jersey.jpg?url";
import bruinsKidsJersey2 from "../../imports/0587_-_Youth_Boston_Bruins_David_Pastrnak_White_Home_Replica_Player_Jersey.jpg?url";
import bruinsKidsJersey3 from "../../imports/0598_-_Youth_Boston_Bruins_David_Pastrnak_Black_Home_Premier_Player_Jersey.jpg?url";
import bruinsKidsJersey4 from "../../imports/0680_-_Infant_Boston_Bruins_Black_Home_Replica_Jersey.jpg?url";
import bruinsKidsJersey5 from "../../imports/0798_-_Youth_Boston_Bruins_Black_Home_Custom_Premier_Jersey.jpg?url";
import bruinsKidsJersey6 from "../../imports/0880_-_Youth_Boston_Bruins_Fanatics_White_Away_Breakaway_Jersey.jpg?url";
import bruinsKidsJersey7 from "../../imports/0911_-_Youth_Boston_Bruins_Black_Home_Replica_Jersey.jpg?url";
import bruinsKidsJersey8 from "../../imports/0944_-_Youth_Boston_Bruins_Outerstuff_Gold_2026_Stadium_Series_Premier_Jersey.jpg?url";
import bruinsKidsJersey9 from "../../imports/0948_-_Youth_Boston_Bruins_Black_Home_Replica_Blank_Jersey.jpg?url";
import bruinsKidsJersey10 from "../../imports/0960_-_Youth_Boston_Bruins_Black_Home_Replica_Custom_Jersey.jpg?url";
import bruinsKidsJersey11 from "../../imports/1200_-_Youth_Boston_Bruins_Black_Home_Custom_Replica_Jersey.jpg?url";
import bruinsKidsJersey12 from "../../imports/1245_-_Youth_Boston_Bruins_David_Pastrnak_Mitchell___Ness_White_2019_All-Star_Game_Power_Play_Jersey.jpg?url";
import bruinsKidsJersey13 from "../../imports/1279_-_Youth_Boston_Bruins_Bobby_Orr_Mitchell___Ness_Black_Power_Play_Player_Jersey.jpg?url";
import bruinsKidsJersey14 from "../../imports/1543_-_Youth_Boston_Bruins_Black_Home_Premier_Jersey.jpg?url";
import bruinsKidsJersey15 from "../../imports/1770_-_Youth_Boston_Bruins_David_Pastrnak_Mitchell___Ness_Black_2016_Winter_Classic_Power_Play_Jersey.jpg?url";

// Boston Bruins Hats
import bruinsHat51 from "../../imports/0650_-_Men_s_Boston_Bruins__47_Black_Primary_Hitch_Snapback_Hat.jpg?url";
import bruinsHat52 from "../../imports/0674_-_Men_s_Boston_Bruins_Fanatics_GrayBlack_Fundamental_Adapt_Trucker_Adjustable_Hat.jpg?url";
import bruinsHat53 from "../../imports/0682_-_Men_s_Boston_Bruins_Mitchell___Ness_Black_Tailgate_Balaclava.jpg?url";
import bruinsHat54 from "../../imports/0708_-_Men_s_Boston_Bruins_Fanatics_White_Rope_A-Frame_Adjustable_Hat.jpg?url";
import bruinsHat55 from "../../imports/0722_-_Men_s_Boston_Bruins_Mitchell___Ness_GoldBlack_Color_Pop_Snapback_Hat.jpg?url";
import bruinsHat56 from "../../imports/0756_-_Men_s_Boston_Bruins_New_Era_GrayBlack_Wool_Pin_Low_Profile_9FIFTY_Snapback_Hat.jpg?url";
import bruinsHat57 from "../../imports/0758_-_Men_s_Boston_Bruins_Mitchell___Ness_Black_Core_Team_Script_2.0_Snapback_Hat.jpg?url";
import bruinsHat58 from "../../imports/0761_-_Men_s_Boston_Bruins_Fanatics_Gold_Authentic_Pro_Team_Rink_Snapback_Hat.jpg?url";
import bruinsHat59 from "../../imports/0763_-_Men_s_Boston_Bruins_Mitchell___Ness_Camo_Hidden_Camo_Pro_Crown_Adjustable_Hat.jpg?url";
import bruinsHat60 from "../../imports/0771_-_Men_s_Boston_Bruins__47_Black_Byline_Hitch_Adjustable_Hat.jpg?url";
import bruinsHat61 from "../../imports/0777_-_Men_s_Boston_Bruins_American_Needle_BlackGold_Burnett_Adjustable_Hat.jpg?url";
import bruinsHat62 from "../../imports/0779_-_Men_s_Boston_Bruins_New_Era_Charcoal_Washed_Patch_19TWENTY_Trucker_Adjustable_Hat.jpg?url";
import bruinsHat63 from "../../imports/0801_-_Men_s_Boston_Bruins__47_Black_Emmett_Heavy_Twill_Trucker_Hitch_Rope_Adjustable_Hat.jpg?url";
import bruinsHat64 from "../../imports/0803_-_Men_s_Boston_Bruins_Fanatics_Gray_Captain_Rope_Adjustable_Hat.jpg?url";
import bruinsHat65 from "../../imports/0967_-_Men_s_Boston_Bruins_Levelwear_Charcoal_Rise_Copper_Insignia_Flex_Hat.jpg?url";
import bruinsHat66 from "../../imports/0972_-_Men_s_Boston_Bruins_Fanatics_BlackGold_Fundamentals_Thrive_Cuffed_Knit_Hat_with_Pom.jpg?url";
import bruinsHat67 from "../../imports/0994_-_Men_s_Boston_Bruins__47_Black_Bering_Cuffed_Knit_Hat_with_Pom.jpg?url";
import bruinsHat68 from "../../imports/1013_-_Men_s_Boston_Bruins_Fanatics_Black_Aspyn_Cuffed_Knit_Hat_with_Pom.jpg?url";
import bruinsHat69 from "../../imports/1015_-_Men_s_Boston_Bruins_Fanatics_BlackGray_Authentic_Pro_Home_Ice_Cuffed_Knit_Hat_with_Pom.jpg?url";
import bruinsHat70 from "../../imports/1033_-_Men_s_Boston_Bruins_Mitchell___Ness_Black_Team_Snapback_Hat.jpg?url";
import bruinsHat71 from "../../imports/1059_-_Men_s_Boston_Bruins_Fanatics_BlackWhite_Averie_Trucker_Adjustable_Hat.jpg?url";
import bruinsHat72 from "../../imports/1114_-_Men_s_Boston_Bruins_Mitchell___Ness_BlackGold_May_Flowers_Pro_Crown_Adjustable_Hat.jpg?url";
import bruinsHat73 from "../../imports/1126_-_Men_s_Boston_Bruins_Mitchell___Ness_Black_Team_Ground_Pro_Adjustable_Hat.jpg?url";
import bruinsHat74 from "../../imports/1137_-_Men_s_Boston_Bruins_Fanatics_White_Hockey_Fights_Cancer_Bucket_Hat.jpg?url";
import bruinsHat75 from "../../imports/1145_-_Men_s_Boston_Bruins_New_Era_Olive_Tonal_Florals_59FIFTY_Fitted_Hat.jpg?url";
import bruinsHat76 from "../../imports/1148_-_Men_s_Boston_Bruins_American_Needle_Black_Valin_Camo_Super_Tech_Vented_Adjustable_Hat.jpg?url";
import bruinsHat77 from "../../imports/1149_-_Men_s_Boston_Bruins_New_Era_Black_Injection_Dog_Ear_Classic_Fitted_Hat.jpg?url";
import bruinsHat78 from "../../imports/1153_-_Men_s_Boston_Bruins_Fanatics_Black_Front_Office_Ripstop_Adjustable_Hat.jpg?url";
import bruinsHat79 from "../../imports/1154_-_Men_s_Boston_Bruins_New_Era_Charcoal_Throwback_Washed_Pre-Curved_A-Frame_9FIFTY_Snapback_Hat.jpg?url";
import bruinsHat80 from "../../imports/1158_-_Men_s_Boston_Bruins_Fanatics_Charcoal_Authentic_Pro_Military_Appreciation_Cuffed_Knit_Hat_with_Pom.jpg?url";

interface MerchItemsScreenProps {
  teamName: string;
  teamLogo: string | null;
  category: string;
  demographic?: string;
  onComplete: (itemId: string, itemName: string, itemImage: string) => void;
  onAddToCart: (itemId: string, itemName: string, itemImage: string) => void;
  onHome: () => void;
  onBack: () => void;
  onContinueShopping: () => void;
}

export function MerchItemsScreen({ teamName, teamLogo, category, demographic, onComplete, onAddToCart, onHome, onBack, onContinueShopping }: MerchItemsScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Force video to be muted
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  // Get items based on team, category, and demographic
  const getItems = () => {
    if (teamName === "Anaheim Ducks" && category === "jerseys") {
      if (demographic === "men") {
        return [
          { id: "item1", name: "Lukas Dostal Orange Home Breakaway Jersey", image: ducksJersey1 },
          { id: "item2", name: "Chris Kreider Orange Home Breakaway Jersey", image: ducksJersey2 },
          { id: "item3", name: "Orange Home Breakaway Jersey", image: ducksJersey3 },
          { id: "item4", name: "Alex Killorn Orange Home Breakaway Jersey", image: ducksJersey4 },
          { id: "item5", name: "Mikael Granlund Orange Home Breakaway Jersey", image: ducksJersey5 },
          { id: "item6", name: "Orange Home Authentic Pro Jersey", image: ducksJersey6 },
          { id: "item7", name: "Orange Home Authentic Pro Custom Jersey", image: ducksJersey7 },
          { id: "item8", name: "White Breakaway Away Jersey", image: ducksJersey8 },
          { id: "item9", name: "Orange Home Premium Custom Jersey", image: ducksJersey9 },
          { id: "item10", name: "Jacob Trouba Orange Home Breakaway Player Jersey", image: ducksJersey10 },
          { id: "item11", name: "Black Breakaway Home Jersey", image: ducksJersey11 },
          { id: "item12", name: "Orange Home Premium Jersey", image: ducksJersey12 },
          { id: "item13", name: "John Carlson Orange Home Breakaway Jersey", image: ducksJersey13 },
          { id: "item14", name: "Beckett Sennecke Orange Home Premium Jersey", image: ducksJersey14 },
        ];
      } else if (demographic === "women") {
        return [
          { id: "item1", name: "Beckett Sennecke Orange Home Breakaway Jersey", image: ducksWomenJersey1 },
          { id: "item2", name: "Orange Home Breakaway Jersey", image: ducksWomenJersey2 },
          { id: "item3", name: "Leo Carlsson Orange Home Breakaway Jersey", image: ducksWomenJersey3 },
          { id: "item4", name: "Black Home Breakaway Jersey", image: ducksWomenJersey4 },
          { id: "item5", name: "Cutter Gauthier Orange Home Breakaway Jersey", image: ducksWomenJersey5 },
          { id: "item6", name: "Troy Terry Black Home Team Breakaway Player Jersey", image: ducksWomenJersey6 },
          { id: "item7", name: "Mikael Granlund Orange Home Breakaway Jersey", image: ducksWomenJersey7 },
          { id: "item8", name: "Chris Kreider Orange Home Breakaway Player Jersey", image: ducksWomenJersey8 },
          { id: "item9", name: "White Away Breakaway Jersey", image: ducksWomenJersey9 },
          { id: "item10", name: "Ryan Poehling Orange Home Breakaway Jersey", image: ducksWomenJersey10 },
          { id: "item11", name: "Petr Mrazek Orange Home Breakaway Jersey", image: ducksWomenJersey11 },
          { id: "item12", name: "Jakob Silfverberg Black Breakaway Jersey", image: ducksWomenJersey12 },
          { id: "item13", name: "John Carlson Orange Home Breakaway Jersey", image: ducksWomenJersey13 },
          { id: "item14", name: "Lukas Dostal Orange Home Breakaway Jersey", image: ducksWomenJersey14 },
        ];
      } else if (demographic === "kids") {
        return [
          { id: "item1", name: "Chris Kreider Orange Home Replica Jersey", image: ducksKidsJersey1 },
          { id: "item2", name: "Black Home Replica Jersey", image: ducksKidsJersey2 },
          { id: "item3", name: "Black Home Replica Custom Jersey", image: ducksKidsJersey3 },
          { id: "item4", name: "Orange Home Replica Jersey", image: ducksKidsJersey4 },
        ];
      }
    } else if (teamName === "Boston Bruins" && category === "jerseys") {
      if (demographic === "men") {
        return [
          { id: "item1", name: "Charlie McAvoy Black Home Breakaway Player Jersey", image: bruinsJersey1 },
          { id: "item2", name: "David Pastrnak Black Home Breakaway Jersey", image: bruinsJersey2 },
          { id: "item3", name: "Charlie McAvoy Black Home Premium Player Jersey", image: bruinsJersey3 },
          { id: "item4", name: "Jeremy Swayman Black Home Breakaway Player Jersey", image: bruinsJersey4 },
          { id: "item5", name: "Black Breakaway Home Jersey", image: bruinsJersey5 },
          { id: "item6", name: "Nikita Zadorov Black Home Breakaway Player Jersey", image: bruinsJersey6 },
          { id: "item7", name: "Black Home Breakaway Custom Jersey", image: bruinsJersey7 },
          { id: "item8", name: "Black Home Authentic Pro Custom Jersey", image: bruinsJersey8 },
          { id: "item9", name: "David Pastrnak Black Home Premium Player Jersey", image: bruinsJersey9 },
          { id: "item10", name: "Black Home Premium Custom Jersey", image: bruinsJersey10 },
          { id: "item11", name: "Jeremy Swayman Black Home Breakaway Jersey", image: bruinsJersey11 },
          { id: "item12", name: "Gold 2026 NHL Stadium Series Premium Jersey", image: bruinsJersey12 },
          { id: "item13", name: "White Away Breakaway Custom Jersey", image: bruinsJersey13 },
          { id: "item14", name: "David Pastrnak Mitchell & Ness Black 2015 Power Play Jersey", image: bruinsJersey14 },
          { id: "item15", name: "Black Home Premium Jersey", image: bruinsJersey15 },
          { id: "item16", name: "Pavel Zacha Black Home Breakaway Player Jersey", image: bruinsJersey16 },
          { id: "item17", name: "White Away Breakaway Jersey", image: bruinsJersey17 },
          { id: "item18", name: "David Pastrnak White Away Premium Player Jersey", image: bruinsJersey18 },
          { id: "item19", name: "Ray Bourque Mitchell & Ness Gold Big & Tall 1996-97 Blue Line 2.0 Jersey", image: bruinsJersey19 },
          { id: "item20", name: "Bobby Orr Black 1971-72 Power Play Jersey", image: bruinsJersey20 },
          { id: "item21", name: "Black Home Authentic Pro Jersey", image: bruinsJersey21 },
          { id: "item22", name: "White Away Premium Custom Jersey", image: bruinsJersey22 },
          { id: "item23", name: "Black 100th Anniversary Authentic Pro Jersey", image: bruinsJersey23 },
          { id: "item24", name: "Black Practice Jersey", image: bruinsJersey24 },
          { id: "item25", name: "Ray Bourque Mitchell & Ness Gold 1996-97 Power Play Jersey", image: bruinsJersey25 },
          { id: "item26", name: "Gold 2026 NHL Stadium Series Authentic Pro Jersey", image: bruinsJersey26 },
          { id: "item27", name: "White Away Premium Jersey", image: bruinsJersey27 },
          { id: "item28", name: "White Breakaway Away Jersey", image: bruinsJersey28 },
          { id: "item29", name: "Hampus Lindholm Black Home Breakaway Player Jersey", image: bruinsJersey29 },
          { id: "item30", name: "Bobby Orr Mitchell & Ness Black Big & Tall 197172 Blue Line 2.0 Jersey", image: bruinsJersey30 },
          { id: "item31", name: "White Hockey Fights Cancer Survivor Practice Jersey", image: bruinsJersey31 },
          { id: "item32", name: "Elias Lindholm Black Home Breakaway Player Jersey", image: bruinsJersey32 },
          { id: "item33", name: "Patrick Brown Black Home Breakaway Player Jersey", image: bruinsJersey33 },
          { id: "item34", name: "Ray Bourque Mitchell & Ness White Big & Tall Captain Patch Blue Line Player Jersey", image: bruinsJersey34 },
          { id: "item35", name: "Sean Kuraly Black Home Breakaway Player Jersey", image: bruinsJersey35 },
          { id: "item36", name: "Brad Marchand Black 2014-15 Power Play Jersey", image: bruinsJersey36 },
          { id: "item37", name: "Black Anniversary Home Breakaway Jersey", image: bruinsJersey37 },
          { id: "item38", name: "David Pastrnak Black 2014-15 Power Play Jersey", image: bruinsJersey38 },
          { id: "item39", name: "White Away Premium Jersey", image: bruinsJersey39 },
          { id: "item40", name: "Gold 2026 NHL Stadium Series Premium Custom Jersey", image: bruinsJersey40 },
          { id: "item41", name: "Black Home Authentic Pro Jersey", image: bruinsJersey41 },
          { id: "item42", name: "White Away Authentic Pro Jersey", image: bruinsJersey42 },
          { id: "item43", name: "David Pastrnak White Away Breakaway Player Jersey", image: bruinsJersey43 },
          { id: "item44", name: "David Pastrnak Black Home Breakaway Player Jersey", image: bruinsJersey44 },
          { id: "item45", name: "John Bucyk Black Premier Breakaway Retired Player Jersey", image: bruinsJersey45 },
          { id: "item46", name: "White Away Authentic Pro Custom Jersey", image: bruinsJersey46 },
          { id: "item47", name: "Jeremy Swayman White Away Breakaway Player Jersey", image: bruinsJersey47 },
        ];
      } else if (demographic === "women") {
        return [
          { id: "item1", name: "Black Home Breakaway Jersey", image: bruinsWomenJersey1 },
          { id: "item2", name: "David Pastrnak Black Home Breakaway Player Jersey", image: bruinsWomenJersey2 },
          { id: "item3", name: "Morgan Geekie Black Home Breakaway Player Jersey", image: bruinsWomenJersey3 },
          { id: "item4", name: "Black Alternate 100th Anniversary Breakaway Jersey", image: bruinsWomenJersey4 },
          { id: "item5", name: "Black Home Breakaway Custom Jersey", image: bruinsWomenJersey5 },
          { id: "item6", name: "James Hagens Black Breakaway Jersey", image: bruinsWomenJersey6 },
          { id: "item7", name: "Nikita Zadorov Black Home Breakaway Player Jersey", image: bruinsWomenJersey7 },
          { id: "item8", name: "David Pastrnak Black 100th Anniversary Breakaway Jersey", image: bruinsWomenJersey8 },
          { id: "item9", name: "Black Anniversary Home Breakaway Jersey", image: bruinsWomenJersey9 },
          { id: "item10", name: "Black Home Breakaway Custom Jersey", image: bruinsWomenJersey10 },
          { id: "item11", name: "Jeremy Swayman Black Home Breakaway Jersey", image: bruinsWomenJersey11 },
          { id: "item12", name: "David Pastrnak Black Home Breakaway Jersey", image: bruinsWomenJersey12 },
          { id: "item13", name: "David Pastrnak White Away Breakaway Player Jersey", image: bruinsWomenJersey13 },
          { id: "item14", name: "Elias Lindholm Black Home Breakaway Player Jersey", image: bruinsWomenJersey14 },
          { id: "item15", name: "Hampus Lindholm Black Home Breakaway Player Jersey", image: bruinsWomenJersey15 },
          { id: "item16", name: "Pavel Zacha Black Home Breakaway Player Jersey", image: bruinsWomenJersey16 },
          { id: "item17", name: "Sean Kuraly Black Home Breakaway Player Jersey", image: bruinsWomenJersey17 },
          { id: "item18", name: "Patrick Brown Black Home Breakaway Player Jersey", image: bruinsWomenJersey18 },
          { id: "item19", name: "Michael Eyssimont Black Home Breakaway Player Jersey", image: bruinsWomenJersey19 },
          { id: "item20", name: "John Beecher Black Home Breakaway Player Jersey", image: bruinsWomenJersey20 },
          { id: "item21", name: "Hampus Lindholm Black Home Breakaway Player Jersey", image: bruinsWomenJersey21 },
          { id: "item22", name: "Casey Mittelstadt Black Home Breakaway Player Jersey", image: bruinsWomenJersey22 },
          { id: "item23", name: "Andrew Peeke Black Home Breakaway Player Jersey", image: bruinsWomenJersey23 },
          { id: "item24", name: "White Away Breakaway Jersey", image: bruinsWomenJersey24 },
        ];
      } else if (demographic === "kids") {
        return [
          { id: "item1", name: "Jeremy Swayman Outerstuff Black Home Replica Jersey", image: bruinsKidsJersey1 },
          { id: "item2", name: "David Pastrnak White Home Replica Player Jersey", image: bruinsKidsJersey2 },
          { id: "item3", name: "David Pastrnak Black Home Premier Player Jersey", image: bruinsKidsJersey3 },
          { id: "item4", name: "Infant Black Home Replica Jersey", image: bruinsKidsJersey4 },
          { id: "item5", name: "Black Home Custom Premier Jersey", image: bruinsKidsJersey5 },
          { id: "item6", name: "Fanatics White Away Breakaway Jersey", image: bruinsKidsJersey6 },
          { id: "item7", name: "Black Home Replica Jersey", image: bruinsKidsJersey7 },
          { id: "item8", name: "Outerstuff Gold 2026 Stadium Series Premier Jersey", image: bruinsKidsJersey8 },
          { id: "item9", name: "Black Home Replica Blank Jersey", image: bruinsKidsJersey9 },
          { id: "item10", name: "Black Home Replica Custom Jersey", image: bruinsKidsJersey10 },
          { id: "item11", name: "Black Home Custom Replica Jersey", image: bruinsKidsJersey11 },
          { id: "item12", name: "David Pastrnak Mitchell & Ness White 2019 All-Star Game Power Play Jersey", image: bruinsKidsJersey12 },
          { id: "item13", name: "Bobby Orr Mitchell & Ness Black Power Play Player Jersey", image: bruinsKidsJersey13 },
          { id: "item14", name: "Black Home Premier Jersey", image: bruinsKidsJersey14 },
          { id: "item15", name: "David Pastrnak Mitchell & Ness Black 2016 Winter Classic Power Play Jersey", image: bruinsKidsJersey15 },
        ];
      }
    } else if (teamName === "Boston Bruins" && category === "hats") {
      return [
        { id: "item51", name: "'47 Black Primary Hitch Snapback Hat", image: bruinsHat51 },
        { id: "item52", name: "Fanatics Gray/Black Fundamental Adapt Trucker Adjustable Hat", image: bruinsHat52 },
        { id: "item53", name: "Mitchell & Ness Black Tailgate Balaclava", image: bruinsHat53 },
        { id: "item54", name: "Fanatics White Rope A-Frame Adjustable Hat", image: bruinsHat54 },
        { id: "item55", name: "Mitchell & Ness Gold/Black Color Pop Snapback Hat", image: bruinsHat55 },
        { id: "item56", name: "New Era Gray/Black Wool Pin Low Profile 9FIFTY Snapback Hat", image: bruinsHat56 },
        { id: "item57", name: "Mitchell & Ness Black Core Team Script 2.0 Snapback Hat", image: bruinsHat57 },
        { id: "item58", name: "Fanatics Gold Authentic Pro Team Rink Snapback Hat", image: bruinsHat58 },
        { id: "item59", name: "Mitchell & Ness Camo Hidden Camo Pro Crown Adjustable Hat", image: bruinsHat59 },
        { id: "item60", name: "'47 Black Byline Hitch Adjustable Hat", image: bruinsHat60 },
        { id: "item61", name: "American Needle Black/Gold Burnett Adjustable Hat", image: bruinsHat61 },
        { id: "item62", name: "New Era Charcoal Washed Patch 19TWENTY Trucker Adjustable Hat", image: bruinsHat62 },
        { id: "item63", name: "'47 Black Emmett Heavy Twill Trucker Hitch Rope Adjustable Hat", image: bruinsHat63 },
        { id: "item64", name: "Fanatics Gray Captain Rope Adjustable Hat", image: bruinsHat64 },
        { id: "item65", name: "Levelwear Charcoal Rise Copper Insignia Flex Hat", image: bruinsHat65 },
        { id: "item66", name: "Fanatics Black/Gold Fundamentals Thrive Cuffed Knit Hat with Pom", image: bruinsHat66 },
        { id: "item67", name: "'47 Black Bering Cuffed Knit Hat with Pom", image: bruinsHat67 },
        { id: "item68", name: "Fanatics Black Aspyn Cuffed Knit Hat with Pom", image: bruinsHat68 },
        { id: "item69", name: "Fanatics Black/Gray Authentic Pro Home Ice Cuffed Knit Hat with Pom", image: bruinsHat69 },
        { id: "item70", name: "Mitchell & Ness Black Team Snapback Hat", image: bruinsHat70 },
        { id: "item71", name: "Fanatics Black/White Averie Trucker Adjustable Hat", image: bruinsHat71 },
        { id: "item72", name: "Mitchell & Ness Black/Gold May Flowers Pro Crown Adjustable Hat", image: bruinsHat72 },
        { id: "item73", name: "Mitchell & Ness Black Team Ground Pro Adjustable Hat", image: bruinsHat73 },
        { id: "item74", name: "Fanatics White Hockey Fights Cancer Bucket Hat", image: bruinsHat74 },
        { id: "item75", name: "New Era Olive Tonal Florals 59FIFTY Fitted Hat", image: bruinsHat75 },
        { id: "item76", name: "American Needle Black Valin Camo Super Tech Vented Adjustable Hat", image: bruinsHat76 },
        { id: "item77", name: "New Era Black Injection Dog Ear Classic Fitted Hat", image: bruinsHat77 },
        { id: "item78", name: "Fanatics Black Front Office Ripstop Adjustable Hat", image: bruinsHat78 },
        { id: "item79", name: "New Era Charcoal Throwback Washed Pre-Curved A-Frame 9FIFTY Snapback Hat", image: bruinsHat79 },
        { id: "item80", name: "Fanatics Charcoal Authentic Pro Military Appreciation Cuffed Knit Hat with Pom", image: bruinsHat80 },
      ];
    } else if (teamName === "Anaheim Ducks" && category === "hats") {
      return [
        { id: "item1", name: "New Era Black Core Logo Two-Tone 59FIFTY Fitted Hat", image: ducksHat1 },
        { id: "item2", name: "New Era Black Core 59FIFTY Fitted Hat", image: ducksHat2 },
        { id: "item3", name: "Mitchell & Ness Black Team Ground Pro Adjustable Hat", image: ducksHat3 },
        { id: "item4", name: "New Era Orange 9SEVENTY Adjustable Hat", image: ducksHat4 },
        { id: "item5", name: "New Era Black Active Subtle Camo 39THIRTY Flex Hat", image: ducksHat5 },
        { id: "item6", name: "Mitchell & Ness Black Core Top Spot Snapback Hat", image: ducksHat6 },
        { id: "item7", name: "New Era Orange COOLERA 9FORTY M-Crown Adjustable Hat", image: ducksHat7 },
        { id: "item8", name: "New Era Black Core Trucker 9SEVENTY Stretch-Snap Hat", image: ducksHat8 },
        { id: "item9", name: "'47 Teal Core Vintage Logo Clean Up Adjustable Hat", image: ducksHat9 },
        { id: "item10", name: "'47 Khaki Logo Clean Up Adjustable Hat", image: ducksHat10 },
        { id: "item11", name: "Fanatics Black/Orange Authentic Pro Rink Team Code Flex Hat", image: ducksHat11 },
        { id: "item12", name: "New Era Turquoise/Charcoal Two-Tone Color Pack 9FIFTY Snapback Hat", image: ducksHat12 },
        { id: "item13", name: "Fanatics Black/Natural Rival Trucker Adjustable Hat", image: ducksHat13 },
        { id: "item14", name: "New Era Black Quilted Nylon 9SEVENTY Adjustable Trucker Hat", image: ducksHat14 },
        { id: "item15", name: "Fanatics Orange Fundamentals Loden Snapback Hat", image: ducksHat15 },
        { id: "item16", name: "Fanatics Orange Core Primary Logo Adjustable Hat", image: ducksHat16 },
        { id: "item17", name: "Fanatics Black Fundamental Gino Stack Snapback Hat", image: ducksHat17 },
        { id: "item18", name: "Mitchell & Ness Black Tailgate Balaclava", image: ducksHat18 },
        { id: "item19", name: "New Era Light Purple/Purple Lavender Bloom 59FIFTY Fitted Hat", image: ducksHat19 },
        { id: "item20", name: "'47 Orange Clean Up Adjustable Hat", image: ducksHat20 },
        { id: "item21", name: "Levelwear Cream Faux Leather Patch Unstructured Adjustable Hat", image: ducksHat21 },
        { id: "item22", name: "New Era Turquoise/Charcoal Two-Tone Color Pack 59FIFTY Fitted Hat", image: ducksHat22 },
        { id: "item23", name: "New Era Cream/Tan Colorpack Two-Tone 59FIFTY Fitted Hat", image: ducksHat23 },
        { id: "item24", name: "Fanatics Black Core Fitted Hat", image: ducksHat24 },
        { id: "item25", name: "'47 Black Nantasket Captain Adjustable Hat", image: ducksHat25 },
        { id: "item26", name: "American Needle Tan Hepcat Washed Twill Adjustable Hat", image: ducksHat26 },
        { id: "item27", name: "New Era Black/Orange Mascot 2-Tone 9FORTY Adjustable Hat", image: ducksHat27 },
        { id: "item28", name: "'47 Black No Shot Captain Snapback Hat", image: ducksHat28 },
        { id: "item29", name: "New Era Orange Core 59FIFTY Fitted Hat", image: ducksHat29 },
        { id: "item30", name: "'47 Black Core Logo Clean Up Adjustable Hat", image: ducksHat30 },
        { id: "item31", name: "'47 Purple Cold Zone MVP Adjustable Hat", image: ducksHat31 },
        { id: "item32", name: "New Era Olive Tonal Florals 59FIFTY Fitted Hat", image: ducksHat32 },
        { id: "item33", name: "New Era Cream/Orange Vintage Cuffed Knit Hat", image: ducksHat33 },
        { id: "item34", name: "'47 Cream/Black Logo Hitch Adjustable Hat", image: ducksHat34 },
        { id: "item35", name: "New Era Black Script A-Frame 9FIFTY Snapback Hat", image: ducksHat35 },
        { id: "item36", name: "New Era Orange Faded A-Frame 9FIFTY Trucker Snapback Hat", image: ducksHat36 },
        { id: "item37", name: "'47 Black No Shot Captain Snapback Hat", image: ducksHat37 },
        { id: "item38", name: "Fanatics Black Force Adjustable Hat", image: ducksHat38 },
        { id: "item39", name: "New Era Tan/Black Localized City Icon 59FIFTY Fitted Hat", image: ducksHat39 },
        { id: "item40", name: "Mitchell & Ness Teal Head Coach Trucker Adjustable Hat", image: ducksHat40 },
        { id: "item41", name: "New Era Orange/Black 39THIRTY Two-Tone Featherweight M-Crown Flex Hat", image: ducksHat41 },
        { id: "item42", name: "New Era Black Freedom Pre-Curved 59FIFTY Fitted Hat", image: ducksHat42 },
        { id: "item43", name: "New Era Black Throwback Stanley Cup Champions Side Patch 19TWENTY Adjustable Hat", image: ducksHat43 },
        { id: "item44", name: "Fanatics Black Team Logo Pride Adjustable Hat", image: ducksHat44 },
        { id: "item45", name: "Youth New Era Black 9FORTY A-Frame Adjustable Hat", image: ducksHat45 },
        { id: "item46", name: "Youth Mitchell & Ness Orange Mascot Snapback Hat", image: ducksHat46 },
        { id: "item47", name: "Unisex New Era Orange Mascot Patch 9TWENTY Adjustable Hat", image: ducksHat47 },
      ];
    }
    // Default placeholder items
    return [
      { id: "item1", name: "Item 1", image: null },
      { id: "item2", name: "Item 2", image: null },
      { id: "item3", name: "Item 3", image: null },
      { id: "item4", name: "Item 4", image: null },
    ];
  };

  const items = getItems();

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addToCartItem, setAddToCartItem] = useState<{ id: string; name: string; image: string } | null>(null);
  const [cartConfirmed, setCartConfirmed] = useState(false);

  const needsSizeSelection = category === "jerseys" || category === "shirts";

  const jerseySizes = demographic === "kids"
    ? ["XS (4-5)", "S (6-7)", "M (8-9)", "L (10-12)", "XL (14-16)"]
    : ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

  const shirtSizes = demographic === "kids"
    ? ["XS (4-5)", "S (6-7)", "M (8-9)", "L (10-12)", "XL (14-16)"]
    : ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const sizes = category === "jerseys" ? jerseySizes : shirtSizes;

  const handleItemSelect = (itemId: string) => {
    if (needsSizeSelection) {
      setPendingItemId(itemId);
    } else {
      const item = items.find(i => i.id === itemId);
      setAddToCartItem({ id: itemId, name: item?.name ?? "", image: item?.image ?? "" });
    }
  };

  const handleSizeSelect = (size: string) => {
    if (pendingItemId) {
      const item = items.find(i => i.id === pendingItemId);
      const id = `${pendingItemId}__size:${size}`;
      const name = item?.name ?? "";
      const image = item?.image ?? "";
      onAddToCart(id, name, image);
      setAddToCartItem({ id, name, image });
      setCartConfirmed(true);
      setPendingItemId(null);
      setSelectedSize(null);
    }
  };

  return (
    <div className="relative h-full w-full bg-white overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #000000;
          border-radius: 10px;
          border-right: 8px solid transparent;
          border-left: 6px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #333333;
        }
      `}</style>
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
        style={{ top: "12px" }}
      >
        <img src={logoSrc} alt="NHL" style={{ height: 192, width: "auto" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col pt-52 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-col px-6"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-black text-black text-center mb-4"
          >
            {category === "jerseys" && "SELECT YOUR JERSEY"}
            {category === "hats" && "SELECT YOUR HAT"}
            {category === "shirts" && "SELECT YOUR SHIRT"}
            {category === "accessories" && "SELECT YOUR ACCESSORY"}
          </motion.h2>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative mb-4 max-w-md mx-auto w-full"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${category}...`}
                className="w-full pl-10 pr-4 py-3 text-base rounded-xl bg-white border-2 border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* Items Grid - Scrollable */}
          <div
            className="flex-1 overflow-y-auto custom-scrollbar"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#000000 transparent'
            }}
          >
            <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
              {filteredItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                  onClick={() => handleItemSelect(item.id)}
                  className="relative group"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Item Card */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: "#ffffff" }}>
                    <div className="relative p-4" style={{ height: "500px" }}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-bold">
                          {item.name}
                        </div>
                      )}
                    </div>
                    {/* Jersey Name */}
                    <div className="p-3 bg-white">
                      <p className="text-sm font-black text-black text-center leading-tight">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Step 1: Add to Cart popup */}
      {addToCartItem && !cartConfirmed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setAddToCartItem(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl mx-8 w-full"
            style={{ padding: 60 }}
            onClick={(e) => e.stopPropagation()}
          >
            {addToCartItem.image && (
              <img src={addToCartItem.image} alt={addToCartItem.name} className="object-contain mx-auto" style={{ height: 320, marginBottom: 24 }} />
            )}
            <p className="font-black text-black text-center" style={{ fontSize: 36, marginBottom: 40 }}>
              {addToCartItem.name}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { onAddToCart(addToCartItem.id, addToCartItem.name, addToCartItem.image); setCartConfirmed(true); }}
              className="w-full text-white font-black rounded-2xl"
              style={{ paddingTop: 44, paddingBottom: 44, fontSize: 48, background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)" }}
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Step 2: Continue Shopping or Go to Cart */}
      {addToCartItem && cartConfirmed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl mx-8 w-full"
            style={{ padding: 60 }}
          >
            <h3 className="font-black text-black text-center" style={{ fontSize: 56, marginBottom: 12 }}>
              Added to Cart!
            </h3>
            <p className="text-black/50 text-center" style={{ fontSize: 32, marginBottom: 48 }}>
              What would you like to do next?
            </p>
            <div className="flex flex-col" style={{ gap: 24 }}>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setAddToCartItem(null); setCartConfirmed(false); onComplete(addToCartItem.id, addToCartItem.name, addToCartItem.image); }}
                className="w-full text-white font-black rounded-2xl"
                style={{ paddingTop: 44, paddingBottom: 44, fontSize: 48, background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)" }}
              >
                Go to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setAddToCartItem(null); setCartConfirmed(false); onContinueShopping(); }}
                className="w-full font-black rounded-2xl border-2 border-black text-black bg-white"
                style={{ paddingTop: 44, paddingBottom: 44, fontSize: 48 }}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Size Selection Modal */}
      {pendingItemId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => { setPendingItemId(null); setSelectedSize(null); }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl p-8 mx-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-black text-center mb-6 tracking-tight">
              SELECT YOUR SIZE
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-2 rounded-xl border-2 font-black text-sm transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (selectedSize) handleSizeSelect(selectedSize);
              }}
              className={`mt-5 w-full py-3 rounded-xl border-2 font-black text-sm transition-colors ${
                selectedSize
                  ? "border-black bg-black text-white hover:bg-gray-800"
                  : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Navigation buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onBack}
          className="p-3 bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onHome}
          className="p-3 bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Home className="w-5 h-5 text-black" />
        </motion.button>
      </div>
    </div>
  );
}
