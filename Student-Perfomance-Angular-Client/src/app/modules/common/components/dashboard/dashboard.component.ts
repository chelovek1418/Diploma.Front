import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../../../../services/student/student.service';
import { Student } from '../../models/interfaces/student';
import { Subscription } from 'rxjs';
import { Group } from '../../models/interfaces/group';
import { GroupService } from 'src/app/services/group/group.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public students: Student[];
  public groups: Group[];
  public studentCount: number;
  public teacherCount: number;
  public lessonCount: number;
  public groupCount: number;

  private studentsSub: Subscription;
  private groupsSub: Subscription;
  private teacherCountSub: Subscription;
  private studentCountSub: Subscription;
  private groupCountSub: Subscription;
  private lessonCountSub: Subscription;

  constructor(private studentService: StudentService, 
    private groupService: GroupService, 
    private lessonService: LessonService,
    private teacherService: TeacherService) { }

  ngOnInit() {
    this.getBestStudents();
    this.getBestGroups();
    this.getCount();
  }

  ngOnDestroy(): void {
    this.studentsSub?.unsubscribe();
    this.groupsSub?.unsubscribe();
    this.studentCountSub?.unsubscribe();
    this.teacherCountSub?.unsubscribe();
    this.groupCountSub?.unsubscribe();
    this.lessonCountSub?.unsubscribe();
  }

  getBestStudents(): void {
    this.studentsSub = this.studentService.getBestStudents(new Date())
      .subscribe((data: Student[]) => this.students = data.slice(0, 3));
  }

  getBestGroups(): void {
    this.groupsSub = this.groupService.getGroups()
      .subscribe((data: Group[]) => this.groups = data);
  }

  getCount(): void {
    this.studentCountSub = this.studentService.getCount().subscribe((c: number) => this.studentCount = c);
    this.teacherCountSub = this.teacherService.getCount().subscribe((c: number) => this.teacherCount = c);
    this.groupCountSub = this.groupService.getCount().subscribe((c: number) => this.groupCount = c);
    this.lessonCountSub = this.lessonService.getCount().subscribe((c: number) => this.lessonCount = c);
  }

}