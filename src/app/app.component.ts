import { RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, ViewEncapsulation, computed, inject, input, signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbCalendar, NgbCalendarEthiopian, NgbDatepickerI18n, NgbDatepickerI18nAmharic, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  standalone: true,
 
	imports: [NgbDatepickerModule, FormsModule, JsonPipe,RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule
    ],
	templateUrl: './app.component.html',
	encapsulation: ViewEncapsulation.None,
	styles: `
	  ngbd-datepicker-ethiopian .ngb-dp-weekday {
			font-size: x-small;
			overflow: hidden;
		}
	`,
  styleUrl:'app.component.css',
	providers: [
		{ provide: NgbCalendar, useClass: NgbCalendarEthiopian },
		{ provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nAmharic },
	],
  animations: [
    trigger('calendarAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class AppComponent {
  today = inject(NgbCalendar).getToday();
	model: NgbDateStruct | undefined;
	date: { year: number; month: number; } | undefined;
  @Input() minDate:NgbDateStruct = {year: 1985, month: 1, day: 1}
  isCalendarOpen = false;
  formattedDate: string = '';
  elementRef = inject(ElementRef);
  @Input() placeholder:String = '';
  @Input() weekDays:boolean = true;

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  onDateSelect(date: any) {
    this.model = date;
    this.formattedDate = this.formatDate(date);
    this.isCalendarOpen = false;
  }
 // Detect clicks outside the component to close the calendar
 @HostListener('document:click', ['$event'])
 clickOutside(event: Event) {
  // Check if the click is inside the calendar-container
  if (!this.elementRef.nativeElement.contains(event.target)) {
    this.isCalendarOpen = false; // Close the calendar if clicked outside
  }
 }
  formatDate(date: { year: number, month: number, day: number }): string {
    const day = this.padZero(date.day);
    const month = this.padZero(date.month);
    const year = date.year;
    return `${day}-${month}-${year}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
   // Method to clear the input if user manually types
   onManualInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Validate and clean input to ensure it's in the valid date format (dd-MM-yyyy)
    if (!this.isValidDateFormat(inputValue)) {
      // If invalid, clear the input or restore the previously selected date
      inputElement.value = this.formattedDate ? this.formattedDate : '';  // Restore last valid date or clear
    } else {
      // If valid, update the formattedDate with the new input
      this.formattedDate = inputValue;
    }
  }

  // Validate if the input matches the dd-MM-yyyy format
  isValidDateFormat(value: string): boolean {
    const validDatePattern = /^\d{2}-\d{2}-\d{4}$/;
    return validDatePattern.test(value);
  }
}