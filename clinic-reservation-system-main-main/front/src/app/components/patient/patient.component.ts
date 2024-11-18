import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  protected readonly Date = new Date();

  getTime(): string {
    return `${this.Date.getHours()}:${this.Date.getMinutes()}`;
  }
}
