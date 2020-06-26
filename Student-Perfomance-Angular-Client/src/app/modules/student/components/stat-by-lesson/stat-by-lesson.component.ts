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
  public missings : number;

  private studentAvgSub : Subscription;
  private missingsSub : Subscription;

  constructor(private markService : MarkService) { }

  ngOnChanges(): void {
    if (this.student && this.lesson){
      this.getStudentAvgarkByLesson();
      this.getMissings();
    }
  }

  ngOnDestroy(): void {
    this.studentAvgSub?.unsubscribe();
    this.missingsSub?.unsubscribe();
  }

  getStudentAvgarkByLesson(): void {
    this.studentAvgSub = this.markService.getAverageForStudentByLesson(this.student.id, this.lesson.id).subscribe((mark : number) => this.studentAvg = mark);
  }

  getMissings(): void {
    this.missingsSub = this.markService.getMissingsForStudentByLesson(this.student.id, this.lesson.id).subscribe((mis : number) => this.missings = mis);
  }

}
