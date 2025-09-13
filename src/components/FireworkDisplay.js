import React from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function FireworkDisplay({ show }) {
  if (!show) return null;
  return <Fireworks autorun={{ speed: 0.8 }} />;
}
