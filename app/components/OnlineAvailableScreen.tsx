import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
const logoSrc = "/imports/NHL-Logo.png";
const backgroundVideo = "/imports/grok-video-78e27f5f-b034-4dcd-9cb7-31c80a96f41b.mp4";
interface OnlineAvailableScreenProps {
  onComplete: () => void;
  onContinueShopping: () => void;
  cartItems: { id: string; name: string; image: string }[];
}

export function OnlineAvailableScreen({ onComplete, onContinueShopping, cartItems }: OnlineAvailableScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
          className="flex-1 overflow-y-auto"
          style={{ marginBottom: 32, minHeight: 0 }}
        >
          <div className="flex flex-col" style={{ gap: cartItems.length === 1 ? 0 : 20 }}>
            {cartItems.map((item, i) => {
              const imgSize = cartItems.length === 1 ? 500 : cartItems.length === 2 ? 260 : 160;
              const fontSize = cartItems.length === 1 ? 40 : cartItems.length === 2 ? 34 : 28;
              const padding = cartItems.length === 1 ? "32px 40px" : "20px 32px";
              return (
                <div key={i} className="flex flex-col items-center bg-white rounded-2xl shadow-lg" style={{ padding }}>
                  {item.image && (
                    <img src={item.image} alt={item.name} className="object-contain" style={{ width: imgSize, height: imgSize }} />
                  )}
                  <p className="font-black text-black leading-tight text-center" style={{ fontSize, marginTop: 16 }}>{item.name}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* QR code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center flex-shrink-0"
          style={{ marginBottom: 32 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200" style={{ padding: 24 }}>
            <QRCodeSVG
              value="https://shop.nhl.com"
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>
          <p className="font-black text-black text-center" style={{ fontSize: 44, marginTop: 20 }}>
            Scan to complete your purchase & have your items shipped home.
          </p>
          <p className="font-semibold text-black/50 text-center" style={{ fontSize: 38, marginTop: 12 }}>
            Then get back to the game! 🏒
          </p>
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
