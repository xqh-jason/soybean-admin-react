import { $t } from '@/locales';

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    label,
    value
  })) as CommonType.Option<keyof T>[];
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }));
}

/**
 * Toggle html class
 *
 * @param className
 */
export function toggleHtmlClass(className: string) {
  function add() {
    document.documentElement.classList.add(className);
  }

  function remove() {
    document.documentElement.classList.remove(className);
  }

  return {
    add,
    remove
  };
}

export function getKeys(obj: Record<string, any>, parentKeys: string[] = []): string[] {
  let keys: string[] = [];

  for (const key in obj) {
    if (key) {
      const newKeys = [...parentKeys, key];
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getKeys(obj[key], newKeys));
      } else {
        keys = newKeys;
      }
    }
  }

  return keys;
}

/**
 * 从对象数组中递归获取指定字段值
 *
 * @param data 对象数组
 * @param field 要提取的字段名
 * @param options 配置项 { childrenField?: string 子节点字段名（默认'children'） keepEmpty?: boolean 保留空值（默认false） unique?: boolean
 *   去重（默认false） }
 */
export function getFieldValuesByObject<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  field: K,
  options?: {
    childrenField?: string;
    keepEmpty?: boolean;
    transformFn?: (value: T) => any;
    unique?: boolean;
  }
): T[K][] {
  const { childrenField = 'children', keepEmpty = false, transformFn = null, unique = false } = options || {};

  const result: T[K][] = [];

  function dfs(items: T[]) {
    for (const item of items) {
      if (Object.hasOwn(item, field)) {
        const value = transformFn ? transformFn(item) : item[field];
        if (keepEmpty || (value !== null && value !== undefined && value !== '')) {
          result.push(value);
        }
      }

      const children = item[childrenField];
      if (Array.isArray(children) && children.length > 0) {
        dfs(children);
      }
    }
  }

  dfs(data);

  return unique ? Array.from(new Set(result)) : result;
}
