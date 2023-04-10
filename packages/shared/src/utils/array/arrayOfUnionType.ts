/**
 * Generic type helper util which returns a function that enforces a given
 * array contains only and all the values in a union type.
 *
 * type Fruit = "apples" | "bananas";
 * const onlyFruitArray = arrayOfUnionType<Fruit>();
 *
 * const myFruit = onlyFruitArray(["apples", "bananas"])  // -> valid
 * const myFruit = onlyFruitArray(["oranges", "bananas"]) // -> invalid
 * const myFruit = onlyFruitArray(["bananas"])            // -> invalid
 *
 * See: https://stackoverflow.com/a/60132060/18777715
 */
const arrayOfUnionType =
  <UnionType>() =>
  <InputArray extends Array<UnionType>>(
    array: InputArray &
      ([UnionType] extends [InputArray[number]] ? unknown : "Invalid")
  ) =>
    array;

export default arrayOfUnionType;
