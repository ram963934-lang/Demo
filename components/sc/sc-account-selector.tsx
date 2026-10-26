"use client";

import { IconChevronDown } from "@/components/sc/sc-icons";

type ScAccountSelectorProps = {
  menuOpen?: boolean;
};

export function ScAccountSelector({ menuOpen = false }: ScAccountSelectorProps) {
  return (
    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        height: 36,
        minWidth: menuOpen ? 168 : 176,
        padding: "0 10px",
        borderRadius: 4,
        border: menuOpen ? "1px solid #879596" : "1px solid #d5d9d9",
        background: menuOpen ? "#37475a" : "#fff",
        color: menuOpen ? "#fff" : "#0f1111",
        fontSize: 13,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        Look Creation
        <span style={{ color: menuOpen ? "rgba(255,255,255,0.82)" : "#565959" }}> | India</span>
      </span>
      <IconChevronDown size={11} color={menuOpen ? "rgba(255,255,255,0.8)" : "#565959"} />
    </button>
  );
}
