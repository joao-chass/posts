import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
      
      // Você pode mostrar uma notificação aqui
      return throwError(() => new Error(errorMessage));
    })
  );
};