// eslint-disable-next-line import/prefer-default-export
export const truncate = (str?: string, charAmount = 30): string =>
  str && str.length > charAmount ? `${str.slice(0, charAmount - 3)}...` : str ?? 'product';
