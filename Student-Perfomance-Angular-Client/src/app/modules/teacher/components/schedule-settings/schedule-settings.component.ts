import { Component, OnInit, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { DayPair } from '../../models/interfaces/dayPair';
import { DetailService } from 'src/app/services/detail/detail.service';
import { Subscription } from 'rxjs';
import { Detail } from 'src/app/modules/common/models/interfaces/details';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-schedule-settings',
  templateUrl: './schedule-settings.component.html',
  styleUrls: ['./schedule-settings.component.css']
})
export class ScheduleSettingsComponent implements OnInit, OnChanges, OnDestroy {

  @Output()
  public detailUpdated = new EventEmitter();
  @Input()
  public teacher: Teacher;
  @Input()
  public dayPair: DayPair;
  public details: Detail[];
  public selectedDetails: Detail[] = [];
  public creating: boolean = false;
  public readonly daysOfWeek: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  private semestr: number = new Date().getMonth() >= 8 ? 0 : 1;
  private teacherDetailsSub: Subscription;
  private dialogSub: Subscription;
  private dropDetailSub: Subscription;
  private editDetailSub: Subscription;

  constructor(private detailService: DetailService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.teacher){
      this.getDetails();
    }
  }

  ngOnChanges(): void {
    if(this.teacher){
      this.getDetails();
    }
    if (this.dayPair){
      this.filterDetails();
      this.creating = false;
    }
  }

  ngOnDestroy(): void {
    this.teacherDetailsSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.dropDetailSub?.unsubscribe();
    this.editDetailSub?.unsubscribe();
  }

  delete(detail: Detail): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dropDetailSub = this.detailService.delete(detail.id).subscribe(_ => {
          const index = this.details.indexOf(detail, 0);
          if (index > -1) {
            this.details.splice(index, 1);
          }
        });
        this.ngOnChanges();
      }
    });
  }

  edit(detail: Detail, isNumerical: boolean | null): void {
    if (detail.isNumerator !== isNumerical) {
      detail.isNumerator = isNumerical;
      detail.teacher = this.teacher;
      this.editDetailSub = this.detailService.update(detail).subscribe(_ => this.detailUpdated.emit());
    }
  }

  filterDetails(): void {
    this.selectedDetails = this.details.filter(x => x.dayOfWeek == this.dayPair.day && x.pair == this.dayPair.pair);
  }

  private getDetails(): void {
    this.teacherDetailsSub = this.detailService.getForTeacher(this.teacher.id, this.semestr).subscribe((data: Detail[]) => this.details = data);
  }

}
