import { Component, OnChanges, Input, OnDestroy } from '@angular/core';
import { MarkService } from 'src/app/services/mark/mark.service';
import { Rating } from 'src/app/modules/common/models/interfaces/rating';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-stat',
  templateUrl: './student-stat.component.html',
  styleUrls: ['./student-stat.component.css']
})
export class StudentStatComponent implements OnChanges, OnDestroy {

  @Input() student : Student;

  public averageMark: number;
  public productivity: number;
  public bestSubjectRating: Rating;
  public worstSubjectRating: Rating;

  private avgMarkSub: Subscription;
  private bestSubjSub: Subscription;
  private worstSubjSub: Subscription;
  private productivitySub: Subscription;

  constructor(private markService : MarkService) { }

  ngOnChanges(): void {
    if (this.student){
      this.getStudentAvgMark();
      this.getStudentBestSubject();
      this.getStudentWorstSubject();
      this.getStudentProductivity();
    }
  }

  ngOnDestroy(): void {
    this.avgMarkSub?.unsubscribe();
    this.bestSubjSub?.unsubscribe();
    this.worstSubjSub?.unsubscribe();
    this.productivitySub?.unsubscribe();
  }

  getStudentAvgMark(): void {
    this.avgMarkSub = this.markService.getAverageMarkByStudentId(this.student.id).subscribe((avg: number) => this.averageMark = avg);
  }

  getStudentBestSubject() : void {
    this.bestSubjSub = this.markService.getStudentBestSubject(this.student.id).subscribe((bestSubj: Rating) => this.bestSubjectRating = bestSubj);
  }

  getStudentWorstSubject() : void {
    this.worstSubjSub = this.markService.getStudentWorstSubject(this.student.id).subscribe((worstSubj: Rating) => this.worstSubjectRating = worstSubj);
  }

  getStudentProductivity(): void {
    this.productivitySub = this.markService.getStudentProductivity(this.student.id).subscribe((prod: number) => this.productivity = prod);
  }

}
