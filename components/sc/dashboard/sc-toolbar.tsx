"use client";

import type { CSSProperties } from "react";

import { IconChevronRight } from "@/components/sc/sc-icons";
import { getGreeting } from "@/lib/date";

export function ScToolbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
        minHeight: 40,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4, fontSize: 13, color: "#0f1111" }}>
        <span>{getGreeting()}, your account health is</span>
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            padding: "3px 10px",
            borderRadius: 999,
            background: "#067d62",
            color: "#fff",
            fontSize: 13,
            fontWeight: 400,
            border: "none",
            cursor: "pointer",
            lineHeight: 1.3,
          }}
        >
          Healthy
          <IconChevronRight />
        </button>
      </div>

      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 12px)",
            right: 96,
            background: "#232f3e",
            color: "#fff",
            fontSize: 11,
            lineHeight: 1.35,
            padding: "7px 12px",
            borderRadius: 4,
            whiteSpace: "nowrap",
          }}
        >
          Take a tour of the new dashboard
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "70%",
              transform: "translateX(-50%)",
              border: "6px solid transparent",
              borderTopColor: "#232f3e",
            }}
          />
        </div>

        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#008296",
              border: "1px solid #fff",
              zIndex: 1,
            }}
          />
          <button type="button" style={launchTourBtn}>
            Launch Tour
          </button>
        </div>
        <button type="button" style={learnMoreBtn}>
          Learn More
        </button>
      </div>
    </div>
  );
}

const launchTourBtn: CSSProperties = {
  height: 32,
  padding: "0 16px",
  background: "#fff",
  border: "1px solid #008296",
  borderRadius: 4,
  color: "#007185",
  fontSize: 13,
  cursor: "pointer",
};

const learnMoreBtn: CSSProperties = {
  height: 32,
  padding: "0 16px",
  background: "#fff",
  border: "1px solid #d5d9d9",
  borderRadius: 4,
  color: "#007185",
  fontSize: 13,
  cursor: "pointer",
};
