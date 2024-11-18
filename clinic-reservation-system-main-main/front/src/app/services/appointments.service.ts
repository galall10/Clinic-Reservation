import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  getAppointments(): Observable<any> {
    const patientId = this.jwtHelper.decodeToken(localStorage.getItem("token")!).userId;
    const apiUrl = environment.apiUrl + `appointments/${patientId}`;
    return this.http.get(apiUrl);
  }
}
