import React from "react";
import type { Address } from "viem";

/**
 * Exposes a wait to generate a referral link*/
export function useReferralLink(address?: Address) {
  const [link, setLink] = React.useState("");

  function generateAndCopyLink(path?: string) {
    generateLink(path);
    copyLink();
  }

  function generateLink(path?: string) {
    if (address) {
      const l = generateReferrerLink(address.toString(), path);
      setLink(l);
    }
  }

  function copyLink() {
    return navigator.clipboard.writeText(link);
  }

  function getTweetUrl() {
    if (address == null) return;

    const link = generateReferrerLink(address);
    const tweet = encodeURIComponent(
      `I just claimed my Axis points for taking part in a token launch!\n\nSee if you're eligible for points at ${link}`,
    );
    return `https://x.com/intent/tweet?text=${tweet}`;
  }

  return {
    generateAndCopyLink,
    generateLink,
    copyLink,
    getTweetUrl,
    link,
  };
}

export function generateReferrerLink(addr: string, path = "") {
  // Remove the hex string prefix and convert to binary
  const bin = hexToBinary(addr.slice(2));

  // Convert to base64
  const encoded = btoa(bin);

  // Make encoding URL safe
  const urlEncoded = urlSafe(encoded);

  // Create link
  const link = window.location.origin + "/#" + path + "?ref=" + urlEncoded;

  return link;
}

function urlSafe(b64Str: string) {
  return b64Str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function hexToBinary(hex: string) {
  const bin = [];
  let i = 0;
  let d;
  let b;
  while (i < hex.length) {
    d = parseInt(hex.slice(i, i + 2), 16);
    b = String.fromCharCode(d);
    bin.push(b);
    i += 2;
  }

  return bin.join("");
}
