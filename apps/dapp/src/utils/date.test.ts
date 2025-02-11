import { describe, it, expect } from "vitest";
import { getCountdown } from "./date";

describe("getCountdown()", () => {
  it("returns '00:00:00:00' if the end date is in the past", () => {
    const endDate = new Date(1679014400000);
    const startDate = new Date(1679014500000);

    const countdown = getCountdown(endDate, startDate);
    expect(countdown).toMatchInlineSnapshot(`"00:00:00:00"`);
  });

  it("handles 0s in all possible places", () => {
    const endDate = new Date(1679014400000);
    const startDate = new Date(1679014400000);

    const countdown = getCountdown(endDate, startDate);
    expect(countdown).toMatchInlineSnapshot(`"00:00:00:00"`);
  });

  it("returns the correct countdown for a future date", () => {
    const endDate = new Date(1679215500000);
    const startDate = new Date(1679014400000);

    const countdown = getCountdown(endDate, startDate);
    expect(countdown).toMatchInlineSnapshot(`"02:07:51:40"`);
  });
});
