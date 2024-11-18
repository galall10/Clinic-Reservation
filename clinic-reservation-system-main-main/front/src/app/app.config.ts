import { authInterceptor } from './interceptors/auth.interceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule, JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
    },
  })),
  provideHttpClient(
    withInterceptors([authInterceptor])
  )
],
};
