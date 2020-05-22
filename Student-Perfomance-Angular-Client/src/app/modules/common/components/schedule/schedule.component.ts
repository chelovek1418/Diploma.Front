import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/interfaces/group';
import { DetailService } from 'src/app/services/detail/detail.service';
import { Detail } from '../../models/interfaces/details';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnChanges, OnDestroy {

  @Output() 
  public selectedDetail = new EventEmitter<Detail[]>();
  @Input()
  public group: Group;
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
    if (this.group) {
      this.getSchedule();
    }
  }

  ngOnDestroy(): void {
    this.detailsSub?.unsubscribe();
  }

  getSchedule(): void {
    this.detailsSub = this.detailService.getForGroup(this.group.id, this.semestr).subscribe((data: Detail[]) => this.details = data);
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
    this.selectedDetail.emit(this.filterDetails(pair, dayOfWeek));
  }

  private filterDetails(pair: number, dayOfWeek: number): Detail[] {
    return this.details.filter(x => x.dayOfWeek == dayOfWeek && x.pair == pair);
  }

}