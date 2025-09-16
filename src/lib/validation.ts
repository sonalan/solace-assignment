import { ValidationError } from './api-error';

export function validatePositiveInteger(
  value: string | null,
  fieldName: string,
  defaultValue?: number
): number {
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new ValidationError(`${fieldName} is required`);
  }

  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    throw new ValidationError(`${fieldName} must be a valid number`);
  }

  if (parsed <= 0) {
    throw new ValidationError(`${fieldName} must be a positive number`);
  }

  return parsed;
}

export function validatePageSize(pageSize: number): number {
  const maxPageSize = 100;
  const minPageSize = 1;

  if (pageSize > maxPageSize) {
    throw new ValidationError(`Page size cannot exceed ${maxPageSize}`);
  }

  if (pageSize < minPageSize) {
    throw new ValidationError(`Page size must be at least ${minPageSize}`);
  }

  return pageSize;
}

export function validateSearchTerm(searchTerm: string | null): string {
  if (!searchTerm) {
    return '';
  }

  // Basic sanitization - prevent excessively long search terms
  const maxLength = 100;
  if (searchTerm.length > maxLength) {
    throw new ValidationError(`Search term cannot exceed ${maxLength} characters`);
  }

  return searchTerm.trim();
}