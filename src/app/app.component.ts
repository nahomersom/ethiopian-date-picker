import { RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, computed, inject, signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbCalendar, NgbCalendarEthiopian, NgbDatepickerI18n, NgbDatepickerI18nAmharic, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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
})
export class AppComponent {
  today = inject(NgbCalendar).getToday();

	model: NgbDateStruct | undefined;
	date: { year: number; month: number; } | undefined;
  minDate:NgbDateStruct = {year: 1985, month: 1, day: 1}
  isCalendarOpen = false;

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  onDateSelect(date: any) {
    this.model = date;
    this.isCalendarOpen = false;
  }
}