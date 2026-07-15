import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { findNhlTeamCatalog, type NhlCatalogProduct } from "../data/nhlCatalog";
import { getNhlProductPrice, type NhlProductPrice } from "../data/nhlPrices";

const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";

type CartItemInput = {
  id: string;
  name: string;
  image: string;
  size?: string;
  productUrl?: string;
  productId?: string;
  shopCategory?: string;
  categoryUrl?: string;
  price: number;
  regularPrice?: number;
  currency: "USD";
};

type PricedCatalogItem = NhlCatalogProduct & NhlProductPrice;

interface MerchItemsScreenProps {
  teamName: string;
  teamLogo: string | null;
  category: string;
  demographic?: string;
  onComplete: () => void;
  onAddToCart: (item: CartItemInput) => void;
  onHome: () => void;
  onBack: () => void;
  onContinueShopping: () => void;
}

const isKidsItem = (name: string) => /(youth|kids|kid's|toddler|infant|preschool|boys|girls)/i.test(name);
const isWomenItem = (name: string) => /(women|women's|womens|ladies|girls)/i.test(name);
const isMenItem = (name: string) => /(men|men's|mens|unisex|adult)/i.test(name) && !isWomenItem(name) && !isKidsItem(name);
const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

const getFilteredCatalogItems = (teamName: string, category: string, demographic?: string) => {
  const teamCatalog = findNhlTeamCatalog(teamName);
  const catalogCategory = category as "jerseys" | "hats" | "shirts" | "accessories";
  const items = teamCatalog?.categories[catalogCategory] ?? [];

  if (category !== "jerseys") return { items, categoryUrl: teamCatalog?.urls[catalogCategory] ?? "" };

  const filteredItems = items.filter((item) => {
    if (demographic === "women") return isWomenItem(item.name);
    if (demographic === "kids") return isKidsItem(item.name);
    return isMenItem(item.name) || (!isWomenItem(item.name) && !isKidsItem(item.name));
  });

  return {
    items: filteredItems.length ? filteredItems : items,
    categoryUrl: teamCatalog?.urls[catalogCategory] ?? "",
  };
};

export function MerchItemsScreen({ teamName, category, demographic, onComplete, onAddToCart, onHome, onBack, onContinueShopping }: MerchItemsScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingItem, setPendingItem] = useState<PricedCatalogItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addToCartItem, setAddToCartItem] = useState<CartItemInput | null>(null);
  const [cartConfirmed, setCartConfirmed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  const { items, categoryUrl } = getFilteredCatalogItems(teamName, category, demographic);
  const pricedItems = items.flatMap((item) => {
    const productPrice = getNhlProductPrice(item.productId);
    return productPrice ? [{ ...item, ...productPrice }] : [];
  });
  const filteredItems = pricedItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const needsSizeSelection = category === "jerseys" || category === "shirts";
  const jerseySizes = demographic === "kids"
    ? ["XS (4-5)", "S (6-7)", "M (8-9)", "L (10-12)", "XL (14-16)"]
    : ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
  const shirtSizes = demographic === "kids"
    ? ["XS (4-5)", "S (6-7)", "M (8-9)", "L (10-12)", "XL (14-16)"]
    : ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
  const sizes = category === "jerseys" ? jerseySizes : shirtSizes;

  const toCartItem = (item: PricedCatalogItem, size?: string): CartItemInput => ({
    id: size ? `${item.id}__size:${size}` : item.id,
    name: item.name,
    image: item.image,
    size,
    productUrl: item.productUrl,
    productId: item.productId,
    shopCategory: item.shopCategory,
    categoryUrl,
    price: item.price,
    regularPrice: item.regularPrice,
    currency: item.currency,
  });

  const handleItemSelect = (item: PricedCatalogItem) => {
    if (needsSizeSelection) {
      setPendingItem(item);
      return;
    }

    setAddToCartItem(toCartItem(item));
  };

  const handleSizeSelect = (size: string) => {
    if (!pendingItem) return;

    const sizedItem = toCartItem(pendingItem, size);
    onAddToCart(sizedItem);
    setAddToCartItem(sizedItem);
    setCartConfirmed(true);
    setPendingItem(null);
    setSelectedSize(null);
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
        style={{ top: "12px" }}
      >
        <img src={logoSrc} alt="NHL" style={{ height: 192, width: "auto" }} />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col pt-52 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex flex-col px-6"
        >
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

          <div
            className="flex-1 overflow-y-auto custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#000000 transparent",
            }}
          >
            <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
              {filteredItems.map((item, index) => (
                <motion.button
                  key={`${item.id}-${item.productUrl}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.03, duration: 0.3 }}
                  onClick={() => handleItemSelect(item)}
                  className="relative group"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                >
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
                    <div className="p-3 bg-white min-h-24 flex flex-col justify-between gap-2">
                      <p className="text-sm font-black text-black text-center leading-tight">
                        {item.name}
                      </p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-xl font-black text-black">
                          {formatPrice(item.price)}
                        </span>
                        {item.regularPrice > item.price && (
                          <span className="text-sm font-bold text-gray-500 line-through">
                            {formatPrice(item.regularPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

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
            <div className="flex items-baseline justify-center" style={{ gap: 14, marginTop: -20, marginBottom: 40 }}>
              <span className="font-black text-black" style={{ fontSize: 42 }}>
                {formatPrice(addToCartItem.price)}
              </span>
              {addToCartItem.regularPrice && addToCartItem.regularPrice > addToCartItem.price && (
                <span className="font-bold text-black/45 line-through" style={{ fontSize: 28 }}>
                  {formatPrice(addToCartItem.regularPrice)}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { onAddToCart(addToCartItem); setCartConfirmed(true); }}
              className="w-full text-white font-black rounded-2xl"
              style={{ paddingTop: 44, paddingBottom: 44, fontSize: 48, background: "linear-gradient(135deg, #000000 0%, #404040 50%, #c0c0c0 100%)" }}
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}

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
                onClick={() => { setAddToCartItem(null); setCartConfirmed(false); onComplete(); }}
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

      {pendingItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => { setPendingItem(null); setSelectedSize(null); }}
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
            <p className="text-xl font-black text-black text-center mb-5">
              {formatPrice(pendingItem.price)}
            </p>
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
