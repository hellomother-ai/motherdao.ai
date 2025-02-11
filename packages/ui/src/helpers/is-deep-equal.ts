export default function isDeepEqual(obj1: unknown, obj2: unknown): boolean {
  // compare by equality
  if (obj1 === obj2) {
    return true;
  }

  // compare by primitive type
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    // If they are not objects or one is null, they are not equal
    return false;
  }

  //compare by isArray
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    // If one is an array and the other is not, they are not equal
    return false;
  }

  const keys1: string[] = Object.keys(obj1);
  const keys2: string[] = Object.keys(obj2);

  // compare by number of properties
  if (keys1.length !== keys2.length) {
    // If the objects have different numbers of properties, they are not equal
    return false;
  }

  //compare by keys
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    // @ts-expect-error ts cant check
    if (!isDeepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
