"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import Image from "next/image";

interface TiltedCardProps {
  imageSrc: string;
  altText: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = "500px",
  containerWidth = "100%",
  rotateAmplitude = 8,
  scaleOnHover = 1.03,
  overlayContent,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * rotateAmplitude);
    rotateY.set(dx * rotateAmplitude);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div style={{ perspective: "1000px", width: containerWidth }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          height: containerHeight,
          width: "100%",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "pointer",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {displayOverlayContent && overlayContent && (
          <div className="absolute inset-0 z-10">{overlayContent}</div>
        )}

        {captionText && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/70 text-xs whitespace-nowrap">
            {captionText}
          </div>
        )}
      </motion.div>
    </div>
  );
}