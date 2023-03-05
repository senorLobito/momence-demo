export const isADecimal = (value: string): boolean => /^\d*\.?\d*$/.test(value);

export const hasFloatingPoint = (value: string): boolean => value.indexOf(".") !== -1;