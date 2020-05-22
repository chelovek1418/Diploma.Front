import { Component, OnChanges, Input, OnDestroy } from '@angular/core';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { Subscription } from 'rxjs';
import { MarkService } from 'src/app/services/mark/mark.service';

@Component({
  selector: 'app-stat-by-lesson-group',
  templateUrl: './stat-by-lesson-group.component.html',
  styleUrls: ['./stat-by-lesson-group.component.css']
})
export class StatByLessonGroupComponent implements OnChanges, OnDestroy {

  @Input() group : Group;
  @Input() lesson : Group;

  public bestStudent : Student;
  public worstStudent : Student;
  public avgMark : number;

  private bestStudentSub : Subscription;
  private worstStudentSub : Subscription;
  private avgMarkSub : Subscription;

  constructor(private studentService : StudentService, private markService : MarkService) { }

  ngOnChanges(): void {
    if (this.group.id && this.lesson.id){
      this.bestStudentSub = this.studentService.getTopRatedStudentInGroupByLesson(this.lesson.id, this.group.id).subscribe((topStudent : Student) => this.bestStudent = topStudent);
      this.worstStudentSub = this.studentService.getWorstRatedStudentInGroupByLesson(this.lesson.id, this.group.id).subscribe((worstStudent : Student) => this.worstStudent = worstStudent);
      this.avgMarkSub = this.markService.getAverageMarkInGroupByLesson(this.lesson.id, this.group.id).subscribe((mark : number) => this.avgMark = mark);
    }
  }

  ngOnDestroy(): void {
    this.bestStudentSub?.unsubscribe();
    this.worstStudentSub?.unsubscribe();
    this.avgMarkSub?.unsubscribe();
  }

}
