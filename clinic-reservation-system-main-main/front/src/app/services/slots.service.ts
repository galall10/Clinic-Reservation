import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ISlot } from '../interfaces/slot.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {
  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);

  getAllSlots(): Observable<ISlot[]> {
    const doctorId = this.jwtHelper.decodeToken(localStorage.getItem("token")!).userId;
    const apiUrl = environment.apiUrl + `slots/doctor/${doctorId}`;

    return this.http.get<{slots: ISlot[]}>(apiUrl).pipe(map(res => res.slots));
  }

  createSlot(slot: {hour: string, date: string}): Observable<any> {
    const apiUrl = environment.apiUrl + `slots`
    return this.http.post(apiUrl, {
      hour: slot.hour,
      date: slot.date
    });
  }

  deleteSlot(slotId: string): Observable<any> {
    const apiUrl = environment.apiUrl + `slots/${slotId}`
    return this.http.delete(apiUrl);
  }
}
