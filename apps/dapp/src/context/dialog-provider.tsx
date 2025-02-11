import type { PropsWithChildren } from "react";
import { Routes, Route } from "react-router-dom";
import { ReferralLinkDialog } from "modules/referral/referral-link-dialog";

export function DialogProvider({
  children,
  disabled,
}: PropsWithChildren & { disabled?: boolean }) {
  if (disabled) return children;

  return (
    <>
      {children}
      <Routes>
        <Route path="/profile/refer" element={<ReferralLinkDialog />} />
        <Route path="/points/refer" element={<ReferralLinkDialog />} />
      </Routes>
    </>
  );
}
