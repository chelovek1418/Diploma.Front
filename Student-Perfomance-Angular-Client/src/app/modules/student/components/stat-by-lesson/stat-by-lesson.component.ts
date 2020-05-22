import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { MarkService } from 'src/app/services/mark/mark.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stat-by-lesson',
  templateUrl: './stat-by-lesson.component.html',
  styleUrls: ['./stat-by-lesson.component.css']
})
export class StatByLessonComponent implements OnChanges, OnDestroy {

  @Input() lesson : Lesson;
  @Input() student : Student;

  public studentAvg : number;
  public productivity: number;

  private studentAvgSub : Subscription;
  private productivitySub: Subscription;

  constructor(private markService : MarkService) { }

  ngOnChanges(): void {
    if (this.student && this.lesson){
      this.getStudentAvgarkByLesson();
      this.getStudentProductivity();
    }
  }

  ngOnDestroy(): void {
    this.studentAvgSub?.unsubscribe();
    this.productivitySub?.unsubscribe();
  }

  getStudentAvgarkByLesson(): void {
    this.studentAvgSub = this.markService.getAverageForStudentByLesson(this.student.id, this.lesson.id).subscribe((mark : number) => this.studentAvg = mark);
  }

  getStudentProductivity(): void {
    this.productivitySub = this.markService.getStudentProductivity(this.student.id).subscribe((prod: number) => this.productivity = prod);
  }

}
