import { Popover } from "@repo/ui";
import { TokenWrapper } from "./token-wrapper";
import { Auction, PropsWithAuction } from "@axis-finance/types";
import { getChainById } from "utils/chain";

export function PopupTokenWrapper({ auction }: PropsWithAuction) {
  const { nativeCurrency } = getChainById(auction.chainId);
  const isQuoteAGasToken = isQuoteAWrappedGasToken(auction);

  if (isQuoteAGasToken && nativeCurrency.wrapperContract) {
    return (
      <Popover label="Wrap" className="w-[340px]">
        <TokenWrapper />
      </Popover>
    );
  }

  return null;
}

export function isQuoteAWrappedGasToken(auction: Auction) {
  const quoteSymbol = auction.quoteToken.symbol.toLowerCase();
  const { nativeCurrency } = getChainById(auction.chainId);
  return `w${nativeCurrency.symbol}`.toLowerCase() === quoteSymbol;
}
