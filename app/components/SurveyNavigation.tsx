import { ArrowLeft, Home } from "lucide-react";
import { motion } from "motion/react";

interface SurveyNavigationProps {
  onBack?: () => void;
  onHome?: () => void;
}

const buttonClassName =
  "pointer-events-auto bg-white border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all shadow-lg";

export function SurveyNavigation({ onBack, onHome }: SurveyNavigationProps) {
  return (
    <div
      className="absolute left-0 right-0 z-40 flex items-start justify-between pointer-events-none"
      style={{ top: 32, paddingLeft: 32, paddingRight: 32 }}
    >
      {onBack ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onBack}
          aria-label="Go back"
          className={buttonClassName}
          style={{ padding: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft style={{ width: 44, height: 44 }} className="text-black" />
        </motion.button>
      ) : (
        <span aria-hidden="true" style={{ width: 92, height: 92 }} />
      )}

      {onHome ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onHome}
          aria-label="Return home"
          className={buttonClassName}
          style={{ padding: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Home style={{ width: 44, height: 44 }} className="text-black" />
        </motion.button>
      ) : (
        <span aria-hidden="true" style={{ width: 92, height: 92 }} />
      )}
    </div>
  );
}
