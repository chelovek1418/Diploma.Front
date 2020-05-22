import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../../../../services/student/student.service';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { GroupService } from 'src/app/services/group/group.service';
import { Subscription } from 'rxjs';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit, OnDestroy {

  public student: Student;
  public selectedLesson : Lesson;

  private studentSub: Subscription;

  constructor(private studentService: StudentService,
    private groupService: GroupService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudent();
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
  }

  onLessonSelecting(lesson : Lesson){
    this.selectedLesson = lesson;
  }

  getStudent(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.studentSub = this.studentService.getStudent(id)
      .subscribe((student: Student) => this.student = student);
  }

}
