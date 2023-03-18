export function transformToDotNotation(obj, prefix = "") {
  let result = {};
  for (let key in obj) {
    let val = obj[key];
    let newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === "object" && !Array.isArray(val)) {
      if (val.hasOwnProperty("$gte") || val.hasOwnProperty("$lte")) {
        result[newKey] = val;
      } else {
        let nested = transformToDotNotation(val, newKey);
        result = { ...result, ...nested };
      }
    } else {
      result[newKey] = val;
    }
  }
  return result;
}
