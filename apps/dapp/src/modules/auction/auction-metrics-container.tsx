import type { Auction, PropsWithAuction } from "@axis-finance/types";
import React from "react";
import { AuctionMetrics } from "./auction-metrics";

type AuctionLabelChildren = React.ReactElement<PropsWithAuction>;

export function AuctionMetricsContainer(
  props: React.HtmlHTMLAttributes<HTMLDivElement> &
    PropsWithAuction & {
      children?:
        | AuctionLabelChildren
        | AuctionLabelChildren[]
        | React.ReactNode;
    },
) {
  if (!props.children) {
    throw new Error("No children provided");
  }

  const children = Array.isArray(props.children)
    ? props.children.map((c, idx) => cloneWithAuction(c, props.auction, idx))
    : cloneWithAuction(
        props.children as AuctionLabelChildren,
        props.auction,
        0,
      );

  return (
    <AuctionMetrics className={props.className}>{children}</AuctionMetrics>
  );
}

function cloneWithAuction(
  children: AuctionLabelChildren,
  auction: Auction,
  key: number,
) {
  return React.isValidElement(children)
    ? React.cloneElement(children, { auction, key })
    : children;
}
