import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith("login") || req.url.endsWith("register"))
    return next(req);
  const authToken = localStorage.getItem("token");
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq);
};
