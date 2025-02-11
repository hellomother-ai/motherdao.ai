import { describe, it, expect } from "vitest";
import { getScaledCapacityWithCuratorFee } from "./number";

describe("getScaledCapacityWithCuratorFee()", () => {
  it("returns the capacity with the curator fee applied", () => {
    const capacity = "5000000";
    const fee = 750;
    const decimals = 18;

    const result = getScaledCapacityWithCuratorFee(capacity, fee, decimals);

    expect(result).toMatchInlineSnapshot(`5375000000000000000000000n`);
  });

  it("returns the capacity if no fee is provided", () => {
    const capacity = "5000000";
    const fee = undefined;
    const decimals = 18;

    const result = getScaledCapacityWithCuratorFee(capacity, fee, decimals);

    expect(result).toMatchInlineSnapshot(`5000000000000000000000000n`);
  });

  it("handles basis points precision (a maximum of 2 decimal places)", () => {
    const capacity = "5000000";
    const fee = 559;
    const decimals = 18;

    const result = getScaledCapacityWithCuratorFee(capacity, fee, decimals);

    expect(result).toMatchInlineSnapshot(`5279500000000000000000000n`);
  });
});
