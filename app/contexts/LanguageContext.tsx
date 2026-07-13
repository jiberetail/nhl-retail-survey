import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "sv" | "fi" | "ru" | "cs" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultContextValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Welcome Screen
    "welcome.cta": "COULDN'T FIND WHAT YOU WANTED? LET US HELP!",
    "welcome.discount": "10% off",
    "welcome.startSurvey": "GET STARTED",
    "welcome.duration": "Takes less than 2 minutes",

    // Language & Location Screen
    "lang.selectLanguage": "SELECT LANGUAGE",
    "lang.chooseLanguage": "Choose your preferred language",
    "lang.selectLocation": "SELECT LOCATION",
    "lang.chooseCountry": "Which country are you from?",
    "lang.selectState": "Select your state",
    "lang.continue": "Continue",

    // Survey Questions
    "survey.question1": "Did you shop for merch in the NYC store?",
    "survey.question2": "Did you find the merch you were looking for?",
    "survey.question3": "Did a store associate assist you today?",
    "survey.yes": "Yes",
    "survey.no": "No",
    "survey.submit": "Submit",

    // Organization Selection
    "org.selectSport": "SELECT A SPORT",
    "org.basketball": "Basketball",
    "org.football": "Football",
    "org.baseball": "Baseball",
    "org.f1": "Formula 1",

    // Team Selection
    "team.selectTeam": "SELECT A TEAM",

    // Merch Category Selection
    "merch.whatLookingFor": "What {team} merch are you looking for?",
    "merch.selectAllThatApply": "Select all that apply",
    "merch.jerseys": "Jerseys",
    "merch.caps": "Caps",
    "merch.shirts": "Shirts",
    "merch.accessories": "Accessories",

    // Feedback Screen
    "feedback.title": "What Affected Your Shopping Experience?",
    "feedback.subtitle": "Please let us know what we can improve.",
    "feedback.option1": "I could not find the item I wanted",
    "feedback.option2": "The checkout process was difficult",
    "feedback.option3": "The wait time was too long",
    "feedback.option4": "I needed assistance and did not get any",
    "feedback.option5": "The associate was unfriendly",
    "feedback.option6": "Other",
    "feedback.submit": "Submit",
    "feedback.modalTitle": "Please tell us more",
    "feedback.modalPlaceholder": "Type your feedback here...",

    // Rating Screen
    "rating.title": "How Would You Rate Your Associate Interaction?",
    "rating.subtitle": "Your feedback helps us improve.",
    "rating.satisfied": "Satisfied",
    "rating.neutral": "Neutral",
    "rating.dissatisfied": "Dissatisfied",
    "rating.submit": "Submit",

    // Thank You Screen
    "thankyou.title": "Thank You!",
    "thankyou.message": "Scan the QR code below to claim your free gift with your purchase.",
    "thankyou.countdown": "Survey will close in",
    "thankyou.seconds": "seconds",

    // Completion Screen
    "completion.title": "Thanks for letting us know!",
    "completion.message": "The merchandise you wanted is currently out of stock. We're working to have availability again soon.",

    // Online Available Screen
    "online.title": "The item you are looking for is available online.",
    "online.productName": "Men's Boston Bruins Charlie McAvoy Fanatics Black Home Breakaway Player Jersey",
    "online.scanMessage": "Scan to complete your purchase online",
    "online.continue": "Continue",

    // Merch Items Screen
    "items.searchPlaceholder": "Search for gear by name...",
    "items.selectOptions": "Select Options",
    "items.size": "Size",
    "items.category": "Category",
    "items.color": "Color",
    "items.select": "Select",
    "items.mens": "Men's",
    "items.womens": "Women's",
    "items.kids": "Kids",
    "items.black": "Black",
    "items.white": "White",
    "items.red": "Red",
    "items.blue": "Blue",
    "items.gray": "Gray",
  },
  ru: {
    // Welcome Screen
    "welcome.cta": "НЕ НАШЛИ ТО, ЧТО ИСКАЛИ? МЫ ПОМОЖЕМ!",
    "welcome.discount": "10% скидка",
    "welcome.startSurvey": "НАЧАТЬ",
    "welcome.duration": "Займёт менее 2 минут",
    "lang.selectLanguage": "ВЫБЕРИТЕ ЯЗЫК",
    "lang.chooseLanguage": "Выберите предпочитаемый язык",
    "lang.selectLocation": "ВЫБЕРИТЕ МЕСТОПОЛОЖЕНИЕ",
    "lang.chooseCountry": "Из какой вы страны?",
    "lang.selectState": "Выберите штат",
    "lang.continue": "Продолжить",
    "survey.question1": "Нашли ли вы всё, что искали?",
    "survey.question2": "Довольны ли вы своим визитом?",
    "survey.question3": "Помог ли вам сотрудник магазина сегодня?",
    "survey.yes": "Да",
    "survey.no": "Нет",
    "survey.submit": "Отправить",
    "org.selectSport": "ВЫБЕРИТЕ ВИД СПОРТА",
    "org.basketball": "Баскетбол",
    "org.football": "Американский футбол",
    "org.baseball": "Бейсбол",
    "org.f1": "Формула 1",
    "team.selectTeam": "ВЫБЕРИТЕ КОМАНДУ",
    "merch.whatLookingFor": "Какую атрибутику {team} вы ищете?",
    "merch.selectAllThatApply": "Выберите всё подходящее",
    "merch.jerseys": "Джерси",
    "merch.caps": "Кепки",
    "merch.shirts": "Футболки",
    "merch.accessories": "Аксессуары",
    "feedback.title": "Что повлияло на ваш опыт покупок?",
    "feedback.subtitle": "Пожалуйста, расскажите нам, что мы можем улучшить.",
    "feedback.option1": "Я не смог найти нужный товар",
    "feedback.option2": "Процесс оплаты был сложным",
    "feedback.option3": "Время ожидания было слишком долгим",
    "feedback.option4": "Мне нужна была помощь, но я её не получил",
    "feedback.option5": "Сотрудник был недружелюбен",
    "feedback.option6": "Другое",
    "feedback.submit": "Отправить",
    "feedback.modalTitle": "Расскажите нам больше",
    "feedback.modalPlaceholder": "Введите ваш отзыв здесь...",
    "rating.title": "Как вы оцените взаимодействие с сотрудником?",
    "rating.subtitle": "Ваш отзыв помогает нам улучшаться.",
    "rating.satisfied": "Доволен",
    "rating.neutral": "Нейтрально",
    "rating.dissatisfied": "Недоволен",
    "rating.submit": "Отправить",
    "thankyou.title": "Спасибо!",
    "thankyou.message": "Отсканируйте QR-код ниже, чтобы получить бесплатный подарок к покупке.",
    "thankyou.countdown": "Опрос закроется через",
    "thankyou.seconds": "секунд",
    "completion.title": "Спасибо, что сообщили нам!",
    "completion.message": "Нужный вам товар временно отсутствует. Мы работаем над тем, чтобы скоро он снова появился.",
    "online.title": "Нужный вам товар доступен онлайн.",
    "online.productName": "Men's Boston Bruins Charlie McAvoy Fanatics Black Home Breakaway Player Jersey",
    "online.scanMessage": "Отсканируйте, чтобы завершить покупку онлайн",
    "online.continue": "Продолжить",
    "items.searchPlaceholder": "Поиск товаров по названию...",
    "items.selectOptions": "Выбрать параметры",
    "items.size": "Размер",
    "items.category": "Категория",
    "items.color": "Цвет",
    "items.select": "Выбрать",
    "items.mens": "Мужские",
    "items.womens": "Женские",
    "items.kids": "Детские",
    "items.black": "Чёрный",
    "items.white": "Белый",
    "items.red": "Красный",
    "items.blue": "Синий",
    "items.gray": "Серый",
  },
  sv: {
    // Welcome Screen
    "welcome.cta": "KUNDE INTE HITTA VAD DU VILLE HA? LÅT OSS HJÄLPA!",
    "welcome.discount": "10% rabatt",
    "welcome.startSurvey": "KOMMA IGÅNG",
    "welcome.duration": "Tar mindre än 2 minuter",

    // Language & Location Screen
    "lang.selectLanguage": "VÄLJ SPRÅK",
    "lang.chooseLanguage": "Välj ditt föredragna språk",
    "lang.selectLocation": "VÄLJ PLATS",
    "lang.chooseCountry": "Vilket land kommer du från?",
    "lang.selectState": "Välj din stat",
    "lang.continue": "Fortsätta",

    // Survey Questions
    "survey.question1": "Hittade du allt du letade efter?",
    "survey.question2": "Är du nöjd med ditt besök?",
    "survey.question3": "Hjälpte en butiksassistent dig idag?",
    "survey.yes": "Ja",
    "survey.no": "Nej",
    "survey.submit": "Skicka",

    // Organization Selection
    "org.selectSport": "VÄLJ EN SPORT",
    "org.basketball": "Basket",
    "org.football": "Amerikansk fotboll",
    "org.baseball": "Baseboll",
    "org.f1": "Formel 1",

    // Team Selection
    "team.selectTeam": "VÄLJ ETT LAG",

    // Merch Category Selection
    "merch.whatLookingFor": "Vilken {team} merchandise letar du efter?",
    "merch.selectAllThatApply": "Välj alla som gäller",
    "merch.jerseys": "Tröjor",
    "merch.caps": "Kepsar",
    "merch.shirts": "Skjortor",
    "merch.accessories": "Tillbehör",

    // Feedback Screen
    "feedback.title": "Vad påverkade din shoppingupplevelse?",
    "feedback.subtitle": "Låt oss veta vad vi kan förbättra.",
    "feedback.option1": "Jag kunde inte hitta artikeln jag ville ha",
    "feedback.option2": "Kassaprocessen var svår",
    "feedback.option3": "Väntetiden var för lång",
    "feedback.option4": "Jag behövde hjälp och fick ingen",
    "feedback.option5": "Assistenten var ovänlig",
    "feedback.option6": "Annat",
    "feedback.submit": "Skicka",
    "feedback.modalTitle": "Berätta mer",
    "feedback.modalPlaceholder": "Skriv din feedback här...",

    // Rating Screen
    "rating.title": "Hur skulle du betygsätta din interaktion med assistenten?",
    "rating.subtitle": "Din feedback hjälper oss att förbättra.",
    "rating.satisfied": "Nöjd",
    "rating.neutral": "Neutral",
    "rating.dissatisfied": "Missnöjd",
    "rating.submit": "Skicka",

    // Thank You Screen
    "thankyou.title": "Tack!",
    "thankyou.message": "Skanna QR-koden nedan för att ta emot din gratis gåva med ditt köp.",
    "thankyou.countdown": "Enkäten stängs om",
    "thankyou.seconds": "sekunder",

    // Completion Screen
    "completion.title": "Tack för att du låter oss veta!",
    "completion.message": "Varorna du ville ha är för närvarande slut i lager. Vi arbetar för att ha tillgänglighet igen snart.",

    // Online Available Screen
    "online.title": "Artikeln du letar efter finns tillgänglig online.",
    "online.productName": "Men's Boston Bruins Charlie McAvoy Fanatics Black Home Breakaway Player Jersey",
    "online.scanMessage": "Skanna för att slutföra ditt köp online",
    "online.continue": "Fortsätta",

    // Merch Items Screen
    "items.searchPlaceholder": "Sök efter utrustning efter namn...",
    "items.selectOptions": "Välj alternativ",
    "items.size": "Storlek",
    "items.category": "Kategori",
    "items.color": "Färg",
    "items.select": "Välj",
    "items.mens": "Herr",
    "items.womens": "Dam",
    "items.kids": "Barn",
    "items.black": "Svart",
    "items.white": "Vit",
    "items.red": "Röd",
    "items.blue": "Blå",
    "items.gray": "Grå",
  },
  fi: {
    // Welcome Screen
    "welcome.cta": "ETKÖ LÖYTÄNYT HALUAMAASI? ANNA MEIDÄN AUTTAA!",
    "welcome.discount": "10% alennus",
    "welcome.startSurvey": "ALOITA",
    "welcome.duration": "Kestää alle 2 minuuttia",

    // Language & Location Screen
    "lang.selectLanguage": "VALITSE KIELI",
    "lang.chooseLanguage": "Valitse haluamasi kieli",
    "lang.selectLocation": "VALITSE SIJAINTI",
    "lang.chooseCountry": "Mistä maasta olet?",
    "lang.selectState": "Valitse osavaltiosi",
    "lang.continue": "Jatkaa",

    // Survey Questions
    "survey.question1": "Löysitkö kaiken mitä etsit?",
    "survey.question2": "Oletko tyytyväinen vierailuusi?",
    "survey.question3": "Auttoiko myymälän työntekijä sinua tänään?",
    "survey.yes": "Kyllä",
    "survey.no": "Ei",
    "survey.submit": "Lähetä",

    // Organization Selection
    "org.selectSport": "VALITSE LAJI",
    "org.basketball": "Koripallo",
    "org.football": "Amerikkalainen jalkapallo",
    "org.baseball": "Baseball",
    "org.f1": "Formula 1",

    // Team Selection
    "team.selectTeam": "VALITSE JOUKKUE",

    // Merch Category Selection
    "merch.whatLookingFor": "Mitä {team} tuotteita etsit?",
    "merch.selectAllThatApply": "Valitse kaikki sopivat",
    "merch.jerseys": "Pelipaidat",
    "merch.caps": "Lippikset",
    "merch.shirts": "Paidat",
    "merch.accessories": "Tarvikkeet",

    // Feedback Screen
    "feedback.title": "Mikä vaikutti ostokokemukseesi?",
    "feedback.subtitle": "Kerro meille, mitä voimme parantaa.",
    "feedback.option1": "En löytänyt haluamaani tuotetta",
    "feedback.option2": "Kassaprosessi oli vaikea",
    "feedback.option3": "Odotusaika oli liian pitkä",
    "feedback.option4": "Tarvitsin apua enkä saanut sitä",
    "feedback.option5": "Myyjä oli epäystävällinen",
    "feedback.option6": "Muu",
    "feedback.submit": "Lähetä",
    "feedback.modalTitle": "Kerro meille lisää",
    "feedback.modalPlaceholder": "Kirjoita palautteesi tähän...",

    // Rating Screen
    "rating.title": "Kuinka arvioisit vuorovaikutustasi myyjän kanssa?",
    "rating.subtitle": "Palautteesi auttaa meitä parantamaan.",
    "rating.satisfied": "Tyytyväinen",
    "rating.neutral": "Neutraali",
    "rating.dissatisfied": "Tyytymätön",
    "rating.submit": "Lähetä",

    // Thank You Screen
    "thankyou.title": "Kiitos!",
    "thankyou.message": "Skannaa alla oleva QR-koodi lunastaaksesi ilmaisen lahjan ostoksesi yhteydessä.",
    "thankyou.countdown": "Kysely sulkeutuu",
    "thankyou.seconds": "sekunnissa",

    // Completion Screen
    "completion.title": "Kiitos kun kerroit meille!",
    "completion.message": "Haluamasi tuote on tällä hetkellä loppuunmyyty. Työskentelemme saadaksemme sen takaisin saataville pian.",

    // Online Available Screen
    "online.title": "Etsimäsi tuote on saatavilla verkossa.",
    "online.productName": "Men's Boston Bruins Charlie McAvoy Fanatics Black Home Breakaway Player Jersey",
    "online.scanMessage": "Skannaa viimeistelläksesi ostoksesi verkossa",
    "online.continue": "Jatkaa",

    // Merch Items Screen
    "items.searchPlaceholder": "Etsi tuotetta nimellä...",
    "items.selectOptions": "Valitse vaihtoehdot",
    "items.size": "Koko",
    "items.category": "Kategoria",
    "items.color": "Väri",
    "items.select": "Valitse",
    "items.mens": "Miesten",
    "items.womens": "Naisten",
    "items.kids": "Lasten",
    "items.black": "Musta",
    "items.white": "Valkoinen",
    "items.red": "Punainen",
    "items.blue": "Sininen",
    "items.gray": "Harmaa",
  },
  cs: {
    "welcome.cta": "NENAŠLI JSTE, CO JSTE HLEDALI? NECHTE NÁS POMOCI!",
    "welcome.discount": "10% sleva",
    "welcome.startSurvey": "ZAČÍT",
    "welcome.duration": "Trvá méně než 2 minuty",
    "lang.selectLanguage": "VYBERTE JAZYK",
    "lang.chooseLanguage": "Vyberte svůj preferovaný jazyk",
    "lang.selectLocation": "VYBERTE LOKALITU",
    "lang.chooseCountry": "Ze které země jste?",
    "lang.selectState": "Vyberte svůj stát",
    "lang.continue": "Pokračovat",
    "survey.question1": "Našli jste vše, co jste hledali?",
    "survey.question2": "Jste spokojeni se svou návštěvou?",
    "survey.question3": "Pomohl vám dnes obchodní asistent?",
    "survey.yes": "Ano",
    "survey.no": "Ne",
    "survey.submit": "Odeslat",
    "org.selectSport": "VYBERTE SPORT",
    "org.basketball": "Basketbal",
    "org.football": "Americký fotbal",
    "org.baseball": "Baseball",
    "org.f1": "Formule 1",
    "team.selectTeam": "VYBERTE TÝM",
    "merch.whatLookingFor": "Jaký merchandise {team} hledáte?",
    "merch.selectAllThatApply": "Vyberte vše, co platí",
    "merch.jerseys": "Dresy",
    "merch.caps": "Kšiltovky",
    "merch.shirts": "Trička",
    "merch.accessories": "Doplňky",
    "feedback.title": "Co ovlivnilo váš nákupní zážitek?",
    "feedback.subtitle": "Dejte nám vědět, co můžeme zlepšit.",
    "feedback.option1": "Nemohl jsem najít požadované zboží",
    "feedback.option2": "Proces platby byl obtížný",
    "feedback.option3": "Čekací doba byla příliš dlouhá",
    "feedback.option4": "Potřeboval jsem pomoc a nedostal ji",
    "feedback.option5": "Asistent byl nepříjemný",
    "feedback.option6": "Jiné",
    "feedback.submit": "Odeslat",
    "feedback.modalTitle": "Řekněte nám více",
    "feedback.modalPlaceholder": "Napište svůj komentář zde...",
    "rating.title": "Jak hodnotíte interakci s asistentem?",
    "rating.subtitle": "Vaše zpětná vazba nám pomáhá zlepšovat se.",
    "rating.satisfied": "Spokojený",
    "rating.neutral": "Neutrální",
    "rating.dissatisfied": "Nespokojený",
    "rating.submit": "Odeslat",
    "thankyou.title": "Děkujeme!",
    "thankyou.message": "Naskenujte QR kód níže a získejte dárek zdarma k nákupu.",
    "thankyou.countdown": "Průzkum se zavře za",
    "thankyou.seconds": "sekund",
    "completion.title": "Děkujeme, že jste nám dali vědět!",
    "completion.message": "Zboží, které jste chtěli, je momentálně vyprodané. Pracujeme na tom, aby bylo brzy dostupné.",
    "online.title": "Hledané zboží je dostupné online.",
    "online.productName": "Men's Boston Bruins Charlie McAvoy Fanatics Black Home Breakaway Player Jersey",
    "online.scanMessage": "Naskenujte pro dokončení nákupu online",
    "online.continue": "Pokračovat",
    "items.searchPlaceholder": "Hledat vybavení podle názvu...",
    "items.selectOptions": "Vybrat možnosti",
    "items.size": "Velikost",
    "items.category": "Kategorie",
    "items.color": "Barva",
    "items.select": "Vybrat",
    "items.mens": "Pánské",
    "items.womens": "Dámské",
    "items.kids": "Dětské",
    "items.black": "Černá",
    "items.white": "Bílá",
    "items.red": "Červená",
    "items.blue": "Modrá",
    "items.gray": "Šedá",
  },
  es: {
    "welcome.cta": "¿NO PUDISTE ENCONTRAR LO QUE QUERÍAS? ¡DÉJANOS AYUDARTE!",
    "welcome.discount": "10% de descuento",
    "welcome.startSurvey": "COMENZAR",
    "welcome.duration": "Toma menos de 2 minutos",
    "lang.selectLanguage": "SELECCIONAR IDIOMA",
    "lang.chooseLanguage": "Elige tu idioma preferido",
    "lang.selectLocation": "SELECCIONAR UBICACIÓN",
    "lang.chooseCountry": "¿De qué país eres?",
    "lang.selectState": "Selecciona tu estado",
    "lang.continue": "Continuar",
    "survey.question1": "¿Encontraste todo lo que buscabas?",
    "survey.question2": "¿Estás satisfecho con tu visita?",
    "survey.question3": "¿Interactuaste con algún vendedor hoy?",
    "survey.yes": "Sí",
    "survey.no": "No",
    "survey.submit": "Enviar",
    "org.selectSport": "SELECCIONA UNA LIGA",
    "org.basketball": "Baloncesto",
    "org.football": "Fútbol Americano",
    "org.baseball": "Béisbol",
    "org.f1": "Fórmula 1",
    "team.selectTeam": "SELECCIONA UN EQUIPO",
    "merch.whatLookingFor": "¿Qué mercancía de {team} estás buscando?",
    "merch.selectAllThatApply": "Selecciona todo lo que aplique",
    "merch.jerseys": "Jerseys",
    "merch.caps": "Gorras",
    "merch.shirts": "Camisetas",
    "merch.accessories": "Accesorios",
    "feedback.title": "¿Qué afectó tu experiencia de compra?",
    "feedback.subtitle": "Por favor déjanos saber qué podemos mejorar.",
    "feedback.option1": "No pude encontrar el artículo que quería",
    "feedback.option2": "El proceso de pago fue difícil",
    "feedback.option3": "El tiempo de espera fue muy largo",
    "feedback.option4": "Necesitaba ayuda y no la recibí",
    "feedback.option5": "La vendedora fue antipática",
    "feedback.option6": "Otro",
    "feedback.submit": "Enviar",
    "feedback.modalTitle": "Por favor cuéntanos más",
    "feedback.modalPlaceholder": "Escribe tu comentario aquí...",
    "rating.title": "¿Cómo Calificarías Tu Interacción con el vendedor?",
    "rating.subtitle": "Tu opinión nos ayuda a mejorar",
    "rating.satisfied": "Satisfecho",
    "rating.neutral": "Neutral",
    "rating.dissatisfied": "Insatisfecho",
    "rating.submit": "Enviar",
    "thankyou.title": "¡Gracias!",
    "thankyou.message": "Escanea el código QR a continuación para reclamar tu regalo gratis con tu compra.",
    "thankyou.countdown": "La encuesta se cerrará en",
    "thankyou.seconds": "segundos",
    "completion.title": "¡Gracias por hacérnoslo saber!",
    "completion.message": "La mercancía que querías está actualmente agotada. Estamos trabajando para tener disponibilidad nuevamente pronto.",
    "online.title": "El artículo que buscas está disponible en línea.",
    "online.productName": "Men's Boston Bruins Charlie McAvoy Fanatics Black Home Breakaway Player Jersey",
    "online.scanMessage": "Escanea para completar tu compra en línea",
    "online.continue": "Continuar",
    "items.searchPlaceholder": "Buscar equipo por nombre...",
    "items.selectOptions": "Seleccionar Opciones",
    "items.size": "Talla",
    "items.category": "Categoría",
    "items.color": "Color",
    "items.select": "Seleccionar",
    "items.mens": "Hombres",
    "items.womens": "Mujeres",
    "items.kids": "Niños",
    "items.black": "Negro",
    "items.white": "Blanco",
    "items.red": "Rojo",
    "items.blue": "Azul",
    "items.gray": "Gris",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
