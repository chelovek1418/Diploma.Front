import { Component, OnInit, Input, ViewChild, OnChanges, OnDestroy, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment/moment';
import { default as _rollupMoment } from 'moment/moment';
import { Rating } from 'src/app/modules/common/models/interfaces/rating';
import { MarkService } from 'src/app/services/mark/mark.service';
import { Subscription } from 'rxjs';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-readonly-journal',
  templateUrl: './readonly-journal.component.html',
  styleUrls: ['./readonly-journal.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {
    provide: MAT_DATE_FORMATS, useValue: {
      parse: {
        dateInput: 'LL',
      },
      display: {
        dateInput: 'MMM',
        monthYearLabel: 'MMM YYYY',
      },
    }
  },
  ],
})
export class ReadonlyJournalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() student: Student;
  @Output() selectedLesson = new EventEmitter<Lesson>();

  public selectedDate = new FormControl({ value: moment(1, "DD"), disabled: true });
  public minDate: Date;
  public maxDate: Date;
  public rating: Rating[];
  public lessons: Lesson[];
  public daysInMonth: Date[];

  private ratingSub: Subscription;
  private lessonsSub: Subscription;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Lesson>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private markService: MarkService, private lessonService: LessonService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0);
    this.maxDate = new Date(currentYear, 11);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.ratingSub = this.markService.getStudentRating(this.student.id).subscribe((rat: Rating[]) => {
      this.rating = rat;
      this.updateTable();
    });
  }

  ngOnDestroy(): void {
    this.ratingSub?.unsubscribe();
    this.lessonsSub?.unsubscribe();
  }

  getMark(lesson: Lesson, day: number): number {
    let mark = lesson.marks.find(m => new Date(m.markDate).getDate() === day)?.mark;
    return mark === null ? -1 : mark;
  }

  isOutlet(day: number): boolean {
    const month = this.selectedDate.value.toDate().getMonth();
    if (month > 5 && month < 9) {
      return true;
    }
    const dayOfWeek = this.daysInMonth[day].getDay();
    return dayOfWeek === 6 || dayOfWeek === 0;
  }

  isFuture(day: number): boolean {
    if (this.selectedDate.value.endOf('month').toDate() < new Date()) {
      return false;
    }
    else {
      let curSelectedDate: Date = this.selectedDate.value.toDate();
      return new Date(curSelectedDate.getFullYear(), curSelectedDate.getMonth(), day) > new Date;
    }
  }

  chosenMonthHandler(selectedDate: Date, datepicker: MatDatepicker<Date>): void {
    this.selectedDate.setValue(moment(selectedDate));
    datepicker.close();
    this.updateTable();
  }

  getTotalBySubject(subjectId: number): number {
    return this.rating?.find(x => x.lessonId === subjectId)?.rating || 0;
  }

  selectLesson(less: Lesson) {
    this.selectedLesson.emit(less);
  }

  updateValues(): void {
    this.dataSource.data = [];
    if (this.student && this.selectedDate.value) {
      this.lessonsSub = this.lessonService.getLessonsWithMarksForTimeByStudentId(this.student.id, this.selectedDate.value.toDate(), this.selectedDate.value.endOf('month').toDate())
        .subscribe((les: Lesson[]) => {
          // for (const iterator of les) {
          //   console.log(`${iterator.title} = ${iterator.id}`);
          // }
          this.lessons = les;
          this.dataSource.data = les;
        });
    }
  }

  updateTable(): void {
    const chosenDate: Date = this.selectedDate.value.toDate();
    const chosenMoth = chosenDate.getMonth();
    if (chosenDate) {
      let days: Date[] = [];
      let date = new Date(chosenDate.getFullYear(), chosenMoth, 1);
      while (date.getMonth() === chosenMoth) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      this.displayedColumns = days.map(x => x.getDate().toString());
      this.daysInMonth = days;
      this.displayedColumns.unshift('subject');
      this.displayedColumns.push('total');
      this.updateValues();
    }
  }

}