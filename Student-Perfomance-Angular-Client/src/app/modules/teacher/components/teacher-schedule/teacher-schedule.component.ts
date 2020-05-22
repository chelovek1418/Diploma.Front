import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { Detail } from 'src/app/modules/common/models/interfaces/details';
import { Subscription } from 'rxjs';
import { DetailService } from 'src/app/services/detail/detail.service';
import { DayPair } from '../../models/interfaces/dayPair';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent implements OnInit, OnChanges, OnDestroy {

  @Output() 
  public selectedDayPair = new EventEmitter<DayPair>();
  @Input()
  public teacher: Teacher;
  public details: Detail[];
  public readonly pairs: number[] = [ 0, 1, 2, 3, 4 ];
  public readonly displayedColumns: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  public selectedDetails: Detail[];

  private semestr: number = new Date().getMonth() >= 8 ? 0 : 1;
  private detailsSub: Subscription;

  constructor(private detailService: DetailService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.teacher) {
      this.getSchedule();
    }
  }

  ngOnDestroy(): void {
    this.detailsSub?.unsubscribe();
  }

  getSchedule(): void {
    this.detailsSub = this.detailService.getForTeacher(this.teacher.id, this.semestr).subscribe((data: Detail[]) => this.details = data);
  }
  
  havePair(pair: number, dayOfWeek: number): boolean {
    const filtered = this.filterDetails(pair, dayOfWeek);
    if (filtered.length > 0){
      this.selectedDetails = filtered;
      if (filtered[1]?.isNumerator === true){
        const numerator = filtered[1];
        filtered[1] = filtered[0];
        filtered[0] = numerator; 
      }
      return true;
    } return false;
  }

  selectDetail(pair: number, dayOfWeek: number): void {
    this.selectedDayPair.emit({day: dayOfWeek, pair: pair});
  }

  private filterDetails(pair: number, dayOfWeek: number): Detail[] {
    return this.details.filter(x => x.dayOfWeek == dayOfWeek && x.pair == pair);
  }
}
