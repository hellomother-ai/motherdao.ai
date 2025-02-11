/**
 * Transforms an object array into headers and rows */
export function arrayToCSV(data: object[]) {
  const headers = Object.keys(data[0] ?? {});
  const body = data.map(Object.values) ?? [];
  return [headers, body] as [string[], string[][]];
}
