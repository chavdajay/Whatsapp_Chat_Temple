/**
 * Converts various input types to boolean
 * @param value - The value to convert to boolean
 * @returns boolean - true for "yes", "true", "1", or actual boolean true; false otherwise
 */
export function stringToBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase().trim();
    return lowerValue === 'yes' || lowerValue === 'true' || lowerValue === '1';
  }
  return false;
}
