"use client";

import React, { useRef, useEffect } from "react";

export interface LogoItem {
  src?: string;
  alt?: string;
  href?: string;
  node?: React.ReactNode;
  title?: string;
  width?: number;
  height?: number;
  srcSet?: string;
  sizes?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // Duration in seconds
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos = [],
  speed = 30,
  direction = "left",
  logoHeight = 56,
  gap = 72,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#000000",
  ariaLabel = "Partner logos",
  className = "",
  style = {},
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the list items to create a seamless loop
    const items = Array.from(scrollContainer.children) as HTMLElement[];
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scrollContainer.appendChild(clone);
    });
  }, [logos]);

  const isVertical = direction === "up" || direction === "down";
  const animationDirection = direction === "left" || direction === "up" ? "normal" : "reverse";

  const itemClasses = `flex-shrink-0 ${
    isVertical ? "mb-[var(--gap)]" : "mr-[var(--gap)]"
  } ${scaleOnHover ? "transition-transform duration-300 hover:scale-110" : ""}`;

  const fadeClasses = fadeOut
    ? isVertical
      ? "before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-gradient-to-b before:from-[var(--fade-color)] before:to-transparent before:z-10 after:absolute after:inset-x-0 after:bottom-0 after:h-24 after:bg-gradient-to-t after:from-[var(--fade-color)] after:to-transparent after:z-10"
      : "before:absolute before:inset-y-0 before:left-0 before:w-24 before:bg-gradient-to-r before:from-[var(--fade-color)] before:to-transparent before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-24 after:bg-gradient-to-l after:from-[var(--fade-color)] after:to-transparent after:z-10"
    : "";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--gap": `${gap}px`,
          "--logo-height": `${logoHeight}px`,
          "--fade-color": fadeOutColor,
          ...style,
        } as React.CSSProperties
      }
      role="region"
      aria-label={ariaLabel}
    >
      <style>
        {`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-50% - var(--gap) / 2)); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll ${speed}s linear infinite;
            animation-direction: ${animationDirection};
          }
          .pause-on-hover:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div
        ref={scrollRef}
        className={`flex ${isVertical ? "flex-col" : "flex-row"} ${
          pauseOnHover ? "pause-on-hover" : ""
        } animate-infinite-scroll w-max`}
      >
        {logos.map((item, idx) => (
          <div key={idx} className={itemClasses} style={{ height: logoHeight }}>
            <LogoItem item={item} logoHeight={logoHeight} />
          </div>
        ))}
      </div>
      {fadeOut && <div className={fadeClasses} aria-hidden="true" />}
    </div>
  );
};

const LogoItem: React.FC<{ item: LogoItem; logoHeight: number }> = ({ item }) => {
  const content = item.node ? (
    <span className="flex items-center justify-center h-full text-[length:var(--logo-height)]" title={item.title}>
      {item.node}
    </span>
  ) : item.src ? (
    <img
      src={item.src}
      srcSet={item.srcSet}
      sizes={item.sizes}
      width={item.width}
      height={item.height}
      alt={item.alt ?? ""}
      className="h-full w-auto object-contain"
      loading="lazy"
      draggable={false}
    />
  ) : null;

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block h-full"
        aria-label={item.alt || item.title}
      >
        {content}
      </a>
    );
  }

  return <>{content}</>;
};

export default LogoLoop;