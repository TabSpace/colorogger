import { PlainObject } from '../types';

/**
 * 简单模板函数
 * @method substitute
 * @param {String} str 要替换模板的字符串
 * @param {Object} obj 模板对应的数据对象
 * @param {RegExp} [reg=/\\?\{\{([^{}]+)\}\}/g] 解析模板的正则表达式
 * @return {String} 替换了模板的字符串
 * @example
 * substitute('{{city}}欢迎您', {city:'北京'}); // '北京欢迎您'
 */

export function substitute(str: string, obj: PlainObject, reg?: RegExp): string {
  return str.replace(reg || /\\?\{\{([^{}]+)\}\}/g, (match, name) => {
    if (match.charAt(0) === '\\') {
      return match.slice(1);
    }
    const rs = obj[name] !== null && obj[name] !== undefined ? obj[name] : '';
    return String(rs);
  });
}
