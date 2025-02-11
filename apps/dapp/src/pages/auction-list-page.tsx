import { Pagination, cn, usePagination, UsdToggle } from "@repo/ui";
import { PageContainer } from "modules/app/page-container";
import { useState } from "react";
import { Element as ScrollTargetElement } from "react-scroll";
import { sortAuction } from "modules/auction/utils/sort-auctions";
import {
  AuctionListSettingsActions,
  auctionListSettingsAtom,
} from "state/user-settings/auction-list-settings";
import { useAtom } from "jotai";
import React from "react";
import { useAuctionsV2 } from "modules/auction/hooks/use-auctionsv2";
import { AuctionParameterCard } from "modules/auction/auction-parameters-card";
const ROW_LIMIT = 9;

export default function AuctionListPage() {
  const [userSettings, dispatch] = useAtom(auctionListSettingsAtom);
  const gridView = true;

  const [sortByStatus, setSortByStatus] = useState<string | undefined>(
    userSettings.activeSort,
  );

  const { data, isLoading } = useAuctionsV2();

  const filteredAuctions = data;

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    if (a.status === sortByStatus && b.status === sortByStatus) {
      //If they're both the same, order by starting date
      return Number(a.start) - Number(b.start);
    }
    if (a.status === sortByStatus) return -1;
    if (b.status === sortByStatus) return 1;

    return sortAuction(a, b);
  });

  const { rows, totalRows, ...pagination } = usePagination(
    sortedAuctions,
    ROW_LIMIT,
  );

  //Load settings
  React.useEffect(() => {
    pagination.handleChangePage(userSettings.lastPage ?? 0);
  }, []);

  //Save current page
  React.useEffect(() => {
    dispatch({
      type: AuctionListSettingsActions.UPDATE_PAGE,
      value: pagination.selectedPage,
    });
  }, [pagination.selectedPage]);

  const isAllUSD = filteredAuctions.every((a) =>
    a.quoteToken.symbol.toLowerCase().includes("usd"),
  );

  return (
    <div id="__AXIS_HOME_PAGE__">
      <ScrollTargetElement name="auctions">
        <PageContainer>
          {!isAllUSD && (
            <div className="flex items-center justify-between">
              <div className="ml-6 flex flex-grow items-center justify-start">
                <UsdToggle currencySymbol="Quote" />
              </div>
            </div>
          )}
          {!isLoading && !filteredAuctions.length && (
            <div className="flex h-[400px] w-full items-center justify-center">
              <h3>There aren&apos;t any auctions in this state</h3>
            </div>
          )}
          <div
            className={cn(
              "lg:mt-4",
              gridView
                ? "grid grid-cols-1 gap-4 px-2 md:grid-cols-2 lg:mx-auto lg:grid-cols-3 lg:px-0"
                : "space-y-4",
              isLoading && rows.length === 0 && "mask",
            )}
          >
            {isLoading && rows.length === 0
              ? Array(3)
                  .fill(0)
                  .map((_e, i) => (
                    <AuctionParameterCard
                      isGrid={gridView}
                      loading={isLoading}
                      key={i}
                    />
                  ))
              : rows.map((auction) => (
                  <AuctionParameterCard
                    isGrid={gridView}
                    auction={auction}
                    className="mx-auto"
                    key={auction.chainId + auction.id + "_" + gridView}
                  />
                ))}
          </div>
          {totalRows > ROW_LIMIT && (
            <Pagination className="mt-6" {...pagination} />
          )}
        </PageContainer>
      </ScrollTargetElement>
    </div>
  );
}
