import { HttpErrorResponse } from '@angular/common/http';

export const getMessageFromError = (e: HttpErrorResponse): string => {
  const message =
    e.error && typeof e.error === 'object' ? e.error.message : e.message;
  if (Array.isArray(message)) return message.join(',\n');
  return message;
};
