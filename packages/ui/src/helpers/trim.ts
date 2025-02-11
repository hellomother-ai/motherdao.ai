/** Formats address as `0xab...adab`*/
export function trimAddress(address: string, padding = 4) {
  const start = address.substring(0, padding);
  const end = address.substring(address.length - padding);
  return `${start}...${end}`;
}
