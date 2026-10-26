"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ScAccountSelector } from "@/components/sc/sc-account-selector";
import { ScFlyoutMenu } from "@/components/sc/sc-flyout-menu";
import {
  IconChevronDown,
  IconClose,
  IconGear,
  IconGlobe,
  IconMail,
  IconMenu,
  IconSearch,
} from "@/components/sc/sc-icons";
import { ScLogo } from "@/components/sc/sc-logo";
import { routes } from "@/config/routes";

function ScSearchBar() {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 0, maxWidth: 640 }}>
      <input
        readOnly
        placeholder="Search"
        style={{
          width: "100%",
          height: 36,
          paddingLeft: 12,
          paddingRight: 44,
          borderRadius: 4,
          border: "1px solid #008296",
          background: "#004b54",
          color: "#fff",
          fontSize: 13,
          outline: "none",
        }}
      />
      <button
        type="button"
        aria-label="Search"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 44,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#008296",
          border: "none",
          borderRadius: "0 4px 4px 0",
          cursor: "pointer",
        }}
      >
        <IconSearch />
      </button>
    </div>
  );
}

function ScToggle() {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0 8px 0 4px",
      }}
    >
      <span style={{ fontSize: 12, color: "#fff", whiteSpace: "nowrap", lineHeight: 1 }}>New Seller Central</span>
      <span
        style={{
          position: "relative",
          width: 38,
          height: 20,
          borderRadius: 10,
          background: on ? "#879596" : "#565959",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 20 : 2,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.15s",
          }}
        />
      </span>
    </button>
  );
}

function IconHomeWhite() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff" aria-hidden="true">
      <path d="M8 1.2L1.5 7v7.8h4.8V10h3.4v4.8H14.5V7L8 1.2zm0 2l4.8 4.3V13.3h-1.8V9.2H5V13.3H3.2V7.5L8 3.2z" />
    </svg>
  );
}

export function ScHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "#002f36" }}>
        <div
          style={{
            height: "var(--sc-nav-h)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "0 18px",
          }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
            Menu
          </button>

          {!menuOpen ? <ScLogo /> : null}

          <ScAccountSelector menuOpen={menuOpen} />

          <ScSearchBar />

          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", flexShrink: 0 }}>
            <ScToggle />
            <button type="button" aria-label="Messages" style={navIconBtn}>
              <IconMail />
            </button>
            <button type="button" aria-label="Settings" style={navIconBtn} onClick={() => router.push(routes.seller.settings)}>
              <IconGear />
            </button>
            <button
              type="button"
              aria-label="Language"
              style={{ ...navIconBtn, gap: 4, width: "auto", padding: "0 8px" }}
            >
              <IconGlobe />
              <span style={{ fontSize: 12 }}>EN</span>
              <IconChevronDown size={10} color="rgba(255,255,255,0.8)" />
            </button>
            <button
              type="button"
              style={{ ...navIconBtn, width: "auto", padding: "0 8px", fontSize: 12, gap: 3 }}
            >
              Help
              <IconChevronDown size={10} color="rgba(255,255,255,0.8)" />
            </button>
          </div>
        </div>

        <div
          style={{
            height: "var(--sc-subnav-h)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 18px",
            background: "#004b54",
          }}
        >
          <Link href={routes.seller.dashboard} aria-label="Home" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0, display: "inline-flex" }}>
            <IconHomeWhite />
          </Link>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 28,
              padding: "0 12px",
              background: "#fff",
              border: "1px solid #d5d9d9",
              borderRadius: 4,
              fontSize: 13,
              color: "#0f1111",
              cursor: "pointer",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.4" aria-hidden="true">
              <path d="M11.2 1.8l3 3-9.7 9.7H2v-3.7L11.2 1.8z" />
            </svg>
            Edit
          </button>
        </div>
      </header>

      <ScFlyoutMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

const navIconBtn: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 38,
  height: 38,
  background: "none",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};
