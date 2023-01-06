export const fisherYateShuffle = <T>(arr: T[]) => {
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    const swap = getRandomInt(i, newArr.length - 1);
    [newArr[i], newArr[swap]] = [newArr[swap], newArr[i]];
  }
  return newArr;
};
