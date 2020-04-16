import { HttpErrorResponse } from '@angular/common/http';

export default function getMessageFromError(e: HttpErrorResponse) {
  const message = e.error && typeof e.error === 'object' ? e.error.message : e.message;
  if (Array.isArray(message)) {
    const errorList: string[] = [];
    for (const fieldError of message) {
      let errMessage = `${fieldError.property} = ${fieldError.value}: `;
      for (const key of Object.keys(fieldError.constraints)) {
        errMessage += fieldError.constraints[key];
      }

      errorList.push(errMessage);
    }

    return errorList.join(',\n');
  }

  return message;
}
