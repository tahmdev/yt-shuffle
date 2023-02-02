/**
 * Adds a value to set if the value is not already in the set. Removes the value from the set if the value is already in the set.
 */
export const setToggle = <T>(set: Set<T>, value: T): void => {
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
};
