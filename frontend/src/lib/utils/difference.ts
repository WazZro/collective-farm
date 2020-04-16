import { transform, isEqual, isObject } from "lodash";

/**
 * Deep diff between two object, using lodash
 * @param object Object compared
 * @param base   Object to compare with
 * @return        Return a new object who represent the diff
 */
export function getDifferenceBetweenObjects(object: Object, base: Object) {
  return transform(object, (result: Object, value: any, key: string) => {
    if (Array.isArray(object)) result[key] = value;
    else if (value instanceof Date) {
      if (base[key] && value.getTime() !== base[key].getTime())
        result[key] = value;
      else if (!base[key]) result[key] = value;
    } else if (!isEqual(value, base[key])) {
      result[key] =
        isObject(value) && isObject(base[key])
          ? getDifferenceBetweenObjects(value, base[key])
          : value;
    }
  });
}

/**
 * Deep diff between two arrays
 * @param array Array compared
 * @param comp   Object to compare with
 * @return        Return a new array who represent the diff
 */
export function getDifferenceBetweenArrays<T>(arr: T[], comp: T[]): T[] {
  return arr.filter(el => !comp.includes(el));
}
