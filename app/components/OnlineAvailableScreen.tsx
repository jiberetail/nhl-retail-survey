import { useRef, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { ScanLine } from "lucide-react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
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

interface OnlineAvailableScreenProps {
  onComplete: () => void;
  onContinueShopping: () => void;
  cartItems: CartItem[];
}

const NHL_SHOP_URL = "https://shop.nhl.com";
const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

const getItemSize = (item: CartItem) => {
  if (item.size) return item.size;
  const sizeMarker = "__size:";
  const markerIndex = item.id.indexOf(sizeMarker);
  return markerIndex >= 0 ? item.id.slice(markerIndex + sizeMarker.length) : undefined;
};

const buildNhlShopUrl = (cartItems: CartItem[]) => {
  const firstProductUrl = cartItems[0]?.productUrl;
  if (!firstProductUrl) return `${NHL_SHOP_URL}/cart`;

  try {
    const productUrl = new URL(firstProductUrl);
    return productUrl.protocol === "https:" && productUrl.hostname === "shop.nhl.com"
      ? productUrl.href
      : `${NHL_SHOP_URL}/cart`;
  } catch {
    return `${NHL_SHOP_URL}/cart`;
  }
};

export function OnlineAvailableScreen({ onComplete, onContinueShopping, cartItems }: OnlineAvailableScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nhlShopProductUrl = useMemo(() => buildNhlShopUrl(cartItems), [cartItems]);
  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price, 0),
    [cartItems],
  );
  const isSingleItem = cartItems.length === 1;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

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
        <img src={logoSrc} alt="NHL" style={{ height: 200, width: "auto" }} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col" style={{ paddingTop: 240, paddingBottom: 40, paddingLeft: 48, paddingRight: 48 }}>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-black text-black text-center flex-shrink-0"
          style={{ fontSize: 64, marginBottom: 8 }}
        >
          Your Cart
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-black/60 text-center flex-shrink-0"
          style={{ fontSize: 34, marginBottom: 32 }}
        >
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} added
        </motion.p>

        {/* Cart items list — scrollable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 overflow-y-auto flex flex-col"
          style={{ marginBottom: 32, minHeight: 0 }}
        >
          <div
            className={`grid grid-cols-2 w-full ${cartItems.length <= 2 ? "my-auto" : ""}`}
            style={{ gap: 20 }}
          >
            {cartItems.map((item, i) => {
              const imgSize = isSingleItem ? 300 : 175;
              const fontSize = isSingleItem ? 32 : 24;
              const padding = isSingleItem ? "24px 32px" : "18px 20px";
              const cardHeight = isSingleItem ? 500 : 420;
              const itemSize = getItemSize(item);
              return (
                <div
                  key={`${item.id}-${i}`}
                  className={`flex flex-col items-center bg-white rounded-2xl shadow-lg ${isSingleItem ? "col-span-2" : ""}`}
                  style={{ padding, height: cardHeight }}
                >
                  {item.image && (
                    <img src={item.image} alt={item.name} className="object-contain" style={{ width: imgSize, height: imgSize }} />
                  )}
                  <p
                    className="font-black text-black leading-tight text-center overflow-hidden"
                    style={{
                      fontSize,
                      marginTop: 12,
                      display: "-webkit-box",
                      WebkitLineClamp: isSingleItem ? 3 : 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.name}
                  </p>
                  {itemSize && (
                    <p className="font-bold text-black/50 text-center" style={{ fontSize: isSingleItem ? 26 : 22, marginTop: 6 }}>
                      Size {itemSize}
                    </p>
                  )}
                  <p className="font-black text-black text-center" style={{ fontSize: isSingleItem ? 36 : 30, marginTop: 10 }}>
                    {formatPrice(item.price)}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex items-center justify-between bg-black text-white rounded-2xl flex-shrink-0"
          style={{ padding: "24px 32px", marginBottom: 28 }}
        >
          <span className="font-black uppercase" style={{ fontSize: 34 }}>Total</span>
          <span className="font-black" style={{ fontSize: 44 }}>{formatPrice(cartTotal)}</span>
        </motion.div>

        {/* QR code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex-shrink-0"
          style={{ marginBottom: 28 }}
        >
          <a
            href={nhlShopProductUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the first cart item on NHL Shop"
            className="relative block overflow-hidden rounded-3xl"
            style={{
              padding: "26px 30px",
              background: "linear-gradient(135deg, #050505 0%, #151515 54%, #d71920 100%)",
              boxShadow: "0 22px 46px rgba(0,0,0,0.28), 0 0 0 7px rgba(215,25,32,0.18)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ border: "3px solid rgba(255,255,255,0.22)", borderRadius: 24 }} />
            <div className="relative z-10 flex items-center justify-center" style={{ gap: 30 }}>
              <div className="bg-white shadow-2xl" style={{ padding: 18, borderRadius: 18 }}>
                <QRCodeSVG
                  value={nhlShopProductUrl}
                  size={238}
                  level="L"
                  includeMargin={false}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center" style={{ marginBottom: 12 }}>
                  <span className="inline-flex items-center justify-center rounded-full" style={{ width: 54, height: 54, background: "#d71920" }}>
                    <ScanLine className="text-white" size={32} strokeWidth={3} />
                  </span>
                </div>
                <p className="font-black uppercase text-white leading-none" style={{ fontSize: 54 }}>
                  Scan to complete your purchase
                </p>
                <p className="font-black text-white leading-tight" style={{ fontSize: 36, marginTop: 10 }}>
                  and have your items shipped home.
                </p>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-shrink-0" style={{ gap: 20 }}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={onContinueShopping}
            className="flex-1 font-black rounded-2xl border-2 border-black text-black bg-white"
            style={{ paddingTop: 36, paddingBottom: 36, fontSize: 38 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue Shopping
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onClick={onComplete}
            className="flex-1 rounded-2xl flex flex-col items-center justify-center"
            style={{ paddingTop: 28, paddingBottom: 28, background: "#000000" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="font-black" style={{ fontSize: 48, color: "#ff2222", lineHeight: 1.1 }}>GET 15% OFF</span>
            <span className="font-semibold text-white" style={{ fontSize: 28, opacity: 0.9 }}>your next in store purchase</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
