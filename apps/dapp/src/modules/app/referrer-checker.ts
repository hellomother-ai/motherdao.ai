import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useInitializeLoadingState, useReferrerAtom } from "state/referral";
import { Address, isAddress, zeroAddress } from "viem";

function undoUrlSafe(safeB64Str: string) {
  return safeB64Str.replace(/-/g, "+").replace(/_/g, "/").replace(/~/g, "=");
}

function binaryToHex(bin: string) {
  let hex = "";
  for (let i = 0; i < bin.length; i++) {
    // Get the UTF-16 code unit of the character
    const code = bin.charCodeAt(i);
    // Convert the code to hex and pad with zeros if needed
    hex += code.toString(16).padStart(2, "0");
  }
  return hex;
}

/** Checks if exists and returns a URL param named referrer*/
export function ReferrerChecker() {
  // Get search params from the URL
  const [searchParams] = useSearchParams();
  //const setReferrer = useSetReferrer();
  const [{ referrer: currentReferrer, isLoading }, setReferrer] =
    useReferrerAtom();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the referrer from the search params, if it exists
  const encodedReferrer: string = searchParams.get("ref") ?? "";

  // Undo safe URL conversions
  const encoded = undoUrlSafe(encodedReferrer);

  // Decode the encoding to binary
  const bin = atob(encoded);

  // Convert the binary to a hex string and prefix with 0x
  const referrer: string = "0x" + binaryToHex(bin);

  // TODO convert to checksummed address?

  // Parse the referrer into an address, otherwise the referrer is the zero address
  // TODO support address lookup from ENS name in referral?
  const referrerAddress: Address | null = isAddress(referrer) ? referrer : null;

  useInitializeLoadingState();

  React.useEffect(() => {
    if (
      !isLoading &&
      currentReferrer === zeroAddress &&
      referrerAddress !== null
    ) {
      setReferrer(referrerAddress);
      //Remove the referrer code from the URL
      navigate(location.pathname, { replace: true });
    }

    if (!isLoading && currentReferrer !== zeroAddress) {
      navigate(location.pathname, { replace: true });
    }
  }, [isLoading, currentReferrer, setReferrer]);

  return null;
}
