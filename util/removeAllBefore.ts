/**
 *
 * @returns A shallow copy of the array without any elements before the first element where the predicate returns true, or an empty array if no such element is found.
 * @param array The array to remove elements from.
 * @param predicate findAndRemoveAllBefore calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findAndRemoveAllBefore immediately returns a shallow copy of the array without any elements that came before the element.


 * @param includeElement If true the first element that returns true will also be removed.
 */
export const findAndRemoveAllBefore = <T>(
  array: T[],
  predicate: (el: T) => boolean,
  includeElement = false
) => {
  const i = array.findIndex(predicate);
  if (i === -1) return [];
  if (includeElement) return array.slice(i + 1);
  return array.slice(i);
};
