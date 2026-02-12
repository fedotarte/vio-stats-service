export const normalizeOptionalString = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized === '' ? undefined : normalized;
  }
  return value;
};

export const normalizeOptionalNumber = ({ value }: { value: unknown }) => {
  if (value === null || value === undefined || value === '') return undefined;
  return value;
};
