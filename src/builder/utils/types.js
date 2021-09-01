export const isBoolean = (value) => {
  return typeof value === "boolean";
};

export const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

export const isNumber = (value) => {
  return typeof value === "number";
};

export const isUndefined = (value) => {
  return typeof value === "undefined";
};

export const isArray = (value) => {
  return Array.isArray(value);
};

export const isStringArray = (value) => {
  return isArray(value) && value.every((item) => isString(item));
};

export const isOptionList = (value) => {
  return (
    isArray(value) &&
    value.every((item) => isString(item.value) && isString(item.label))
  );
};

export const isOperator = (value) => {
  return !!value;
};
