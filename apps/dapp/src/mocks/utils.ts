/**
 * Extracts the chain name from a launch ID.
 *
 * @param id - The launch ID
 * @returns - The chain name
 * @remarks
 * Example IDs:
 * blast-sepolia-0xba0000ac450437406583980336fe93ab2752999f-8
 * mantle-0xba0000ac450437406583980336fe93ab2752999f-9
 *
 */
const extractChainName = (id: string): string => {
  const regex = /^(.+)-0x[a-fA-F0-9]+-\d+$/;
  const match = id.match(regex);

  if (!match) {
    throw new Error("Invalid ID format");
  }

  return match[1];
};

export { extractChainName };
