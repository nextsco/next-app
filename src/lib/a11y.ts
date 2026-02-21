/**
 * Accessibility helper utilities for EduSaaS.
 * Compliant with WCAG 2.1 AA.
 */

/** Builds an aria-describedby string from an optional error id */
export function ariaDescribedBy(fieldName: string, hasError: boolean): string | undefined {
  return hasError ? `${fieldName}-error` : undefined;
}

/** Returns the id for an error message element */
export function errorId(fieldName: string): string {
  return `${fieldName}-error`;
}

/** Focus trap helper: get all focusable elements within a container */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(elements);
}

/** Screen-reader only text helper class */
export const srOnlyClass = "sr-only";
