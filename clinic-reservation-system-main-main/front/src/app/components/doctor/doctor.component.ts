import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotsService } from '../../services/slots.service';
import { Observable } from 'rxjs';
import { ISlot } from '../../interfaces/slot.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  slotsService = inject(SlotsService);
  protected readonly Date = new Date();
  slots?: ISlot[];
  form!: FormGroup;
  date = new FormControl("");
  hour = new FormControl("");
  isLoading = false;

  ngOnInit(): void {
    this.slots = undefined;
    this.form = new FormGroup({
      date: this.date,
      hour: this.hour
    });
    this.slotsService.getAllSlots().subscribe(slots => this.slots = slots);
  }

  getFormatteUTCDate(utcDate: string) {
    const date = new Date(utcDate);

    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  }

  getFormattedDateFromFormControl(): string {
    const [year, month, day] = this.date.value!.split("-");
    return `${month}/${day}/${year}`
  }

  getFormattedTime(time24: string) {
    const [hours, minutes] = time24.split(':');
    let period = 'AM';
    let hours12 = parseInt(hours, 10);
    if (hours12 >= 12) {
      period = 'PM';
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }
    const formattedTime = `${hours12.toString().padStart(2, '0')}:${minutes} ${period}`;
    return formattedTime;
  }

  deleteSlot(slot: ISlot) {
    this.slotsService.deleteSlot(slot._id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        this.ngOnInit();
      }
    })
  }

  submit(): void {
    this.isLoading = true;
    this.slotsService.createSlot(
      {
      date: this.getFormattedDateFromFormControl(),
      hour: this.hour.value!
    }
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.ngOnInit();
      },
      error: (err) => {
        this.isLoading = false;
        alert("Error: " + err.message);
      }
  });
  }
}
