import type { Meta, StoryObj } from "@storybook/react";
import { SettledAuctionChart } from "modules/auction/settled-auction-chart";
import { getSettledBatchAuctionMock } from "../mocks/settled-batch-auction-partial-fill";
import { ToggleProvider } from "@repo/ui";

/*
  TODO: Storybook has a bug where it serializes your args using JSON.stringify - which doesn't support BigInt values.
  LOC which breaks: https://github.com/storybookjs/storybook/blob/3974106634ef30c755aa0700ccfaa74ba40d6a7c/code/ui/blocks/src/controls/Object.tsx#L290
  Issue tracker: https://github.com/storybookjs/storybook/issues/22452
  Workaround below.
*/
// @ts-expect-error BigInt is not serializable
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const meta = {
  title: "Auctions/SettledAuctionChart",
  component: SettledAuctionChart,
  args: {
    auction: getSettledBatchAuctionMock(),
  },
  decorators: [
    (Story) => (
      <div className="w-[800px] bg-white p-4">
        <ToggleProvider initialToggle={true}>
          <Story />
        </ToggleProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof SettledAuctionChart>;

export default meta;

type Story = StoryObj<typeof SettledAuctionChart>;

export const USDQuoteToken: Story = {};

export const KnownNonUSDQuoteToken: Story = {
  args: {
    auction: getSettledBatchAuctionMock({
      quoteToken: {
        ...getSettledBatchAuctionMock().quoteToken,
        name: "WETH",
        symbol: "WETH",
      },
    }),
  },
};

export const UnknownNonUSDQuoteToken: Story = {
  args: {
    auction: getSettledBatchAuctionMock({
      quoteToken: {
        ...getSettledBatchAuctionMock().quoteToken,
        name: "ZFDIJDFJK",
        symbol: "ZFDIJDFJK",
      },
    }),
  },
};
