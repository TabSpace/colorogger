import $type from './type';
import { PlainObject } from '../types';

const mod = {
  cloneArr(arr: unknown[]): unknown[] {
    const carr: unknown[] = [];
    arr.forEach((item: unknown, index) => {
      carr[index] = mod.cloneDeep(item);
    });
    return carr;
  },
  cloneObj(obj: PlainObject): PlainObject {
    const cobj: PlainObject = {};
    Object.keys(obj).forEach((key) => {
      const item = obj[key];
      cobj[key] = mod.cloneDeep(item);
    });
    return cobj;
  },
  cloneDeep <T>(item: T): T {
    if (Array.isArray(item)) {
      return mod.cloneArr(item) as any;
    }
    const type = $type(item);
    if (type === 'object') {
      return mod.cloneObj(item as any) as any;
    }
    return item;
  },
};

/**
 * 深度克隆对象，会保留函数引用
 * @method cloneDeep
 * @param {Object} item 要克隆的对象
 * @returns {Object} 克隆后的对象
 * @example
 * var obj = {a: 1, b: 2, c: function () {}};
 * console.info(cloneDeep(obj)); //{a: 1, b: 2, c: function () {}}
 */
export function cloneDeep <T>(item: T | T[]): T | T[] {
  return mod.cloneDeep(item);
}

export default cloneDeep;
