import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(body: any): Observable<any> {
    const apiUrl = environment.apiUrl + "auth/login";
    return this.http.post(apiUrl, body)
  }

  register(body: any): Observable<{token: string, user: {email: string, userType: string}}> {
    const apiUrl = environment.apiUrl + "auth/register";
    return this.http.post<{token: string, user: {email: string, userType: string}}>(apiUrl, body)
  }
}
