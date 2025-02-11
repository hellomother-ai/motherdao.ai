import { atomWithReducer } from "jotai/utils";

/**
 * The stored user settings for Auction List Page*/
type AuctionListSettings = {
  /** The page from the auction list the user was last on*/
  lastPage?: number;
  /** Which, if any, sort filter is applied */
  activeSort?: string;
  /** Whether is grid or list view*/
  gridView?: boolean;
  /** Only show user created or bidded auctions*/
  onlyUserAuctions?: boolean;
};

export enum AuctionListSettingsActions {
  UPDATE_PAGE,
  UPDATE_SORT,
  UPDATE_VIEW,
  ONLY_USER_AUCTIONS,
}

type AuctionListSettingOptions =
  | { type: AuctionListSettingsActions.UPDATE_PAGE; value?: number }
  | { type: AuctionListSettingsActions.UPDATE_SORT; value?: string }
  | { type: AuctionListSettingsActions.UPDATE_VIEW; value?: boolean }
  | { type: AuctionListSettingsActions.ONLY_USER_AUCTIONS; value?: boolean };

function auctionListSettingsReducer(
  state: AuctionListSettings,
  { type, value }: AuctionListSettingOptions,
): AuctionListSettings {
  switch (type) {
    case AuctionListSettingsActions.UPDATE_PAGE: {
      return {
        ...state,
        lastPage: value,
      };
    }

    case AuctionListSettingsActions.UPDATE_SORT: {
      return {
        ...state,
        activeSort: value,
      };
    }
    case AuctionListSettingsActions.UPDATE_VIEW: {
      return {
        ...state,
        gridView: value,
      };
    }
    case AuctionListSettingsActions.ONLY_USER_AUCTIONS: {
      return {
        ...state,
        onlyUserAuctions: value,
      };
    }

    default:
      throw new Error("Null or invalid Auction List Setting type");
  }
}

export const auctionListSettingsAtom = atomWithReducer(
  {},
  auctionListSettingsReducer,
);
