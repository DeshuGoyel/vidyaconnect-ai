"use client";

import { useState } from "react";
import { Mic, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";

interface VoiceSearchButtonProps {
  onResult: (text: string) => void;
  className?: string;
}

export function VoiceSearchButton({ onResult, className = "" }: VoiceSearchButtonProps) {
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "done">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResult = (text: string) => {
    setStatus("processing");
    // Simulate thinking/processing state brief delay
    setTimeout(() => {
      onResult(text);
      setStatus("done");
      // Haptic feedback vibration
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      setTimeout(() => setStatus("idle"), 1500);
    }, 800);
  };

  const { listening, start } = useVoiceSearch(handleResult);

  const handleClick = () => {
    if (status !== "idle") return;
    try {
      setErrorMessage("");
      start();
      setStatus("listening");
    } catch (e) {
      console.error(e);
      setErrorMessage("Speech not supported on this browser.");
      setStatus("idle");
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        {/* Waveform / Pulsing Ring Rings during listening state */}
        {status === "listening" && (
          <>
            <motion.div
              className="absolute h-12 w-12 rounded-full bg-red-500/20"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute h-12 w-12 rounded-full bg-red-500/30"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, ease: "easeOut" }}
            />
            {/* Visual Waveform bars */}
            <div className="absolute -bottom-8 flex items-center justify-center gap-1">
              {[0.5, 1.2, 0.8, 1.4, 0.6].map((multiplier, idx) => (
                <motion.span
                  key={idx}
                  className="h-3 w-1 rounded-full bg-red-500"
                  animate={{ height: [6, 16 * multiplier, 6] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: idx * 0.1, ease: "easeInOut" }}
                />
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        disabled={status !== "idle"}
        whileHover={status === "idle" ? { scale: 1.1 } : {}}
        whileTap={status === "idle" ? { scale: 0.95 } : {}}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 shadow-md ${
          status === "idle"
            ? "border-saffron-100 bg-saffron-50 text-saffron-500 hover:bg-saffron-100"
            : status === "listening"
            ? "border-red-200 bg-red-500 text-white"
            : status === "processing"
            ? "border-saffron-200 bg-saffron-500 text-white"
            : "border-success bg-success text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="mic"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <Mic className="h-5 w-5" />
            </motion.div>
          )}

          {status === "listening" && (
            <motion.div
              key="listening-mic"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="flex items-center justify-center"
            >
              <Mic className="h-5 w-5 animate-pulse" />
            </motion.div>
          )}

          {status === "processing" && (
            <motion.div
              key="spinner"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.div>
          )}

          {status === "done" && (
            <motion.div
              key="done"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <Check className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {errorMessage && (
        <span className="absolute -bottom-8 whitespace-nowrap text-xs font-bold text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
