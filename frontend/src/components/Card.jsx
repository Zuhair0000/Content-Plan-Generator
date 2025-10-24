import React from "react";
import clsx from "clsx";

export function Card({ className, children }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-[#2A2B33] shadow-md hover:shadow-orange-500/10 transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children }) {
  return <div className={clsx("p-6", className)}>{children}</div>;
}
