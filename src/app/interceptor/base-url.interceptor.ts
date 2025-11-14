import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const baseUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  
  if (req.url.startsWith('/')) {
    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
    return next(apiReq);
  }
  
  return next(req);
};