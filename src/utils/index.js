export const formatValue = (val) => {
  if (typeof val === "object") {
    if (val.length) {
      const iterVal = val.map((v) => formatValue(v));
      return iterVal.toString();
    } else {
      return JSON.stringify(val);
    }
  }

  return val;
};
