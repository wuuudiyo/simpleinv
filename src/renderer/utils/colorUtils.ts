/**
 * Calculate relative luminance of a hex color
 * Based on WCAG 2.0 formula
 */
export function getLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Determine if text should be light or dark based on background color
 */
export function getContrastColor(bgColor: string): 'light' | 'dark' {
  const luminance = getLuminance(bgColor);
  // Use 0.179 as threshold (WCAG recommendation)
  return luminance > 0.179 ? 'dark' : 'light';
}

/**
 * Check if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}
