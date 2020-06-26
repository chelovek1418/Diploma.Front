import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { GroupService } from 'src/app/services/group/group.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  @Input()
  public teacher: Teacher;

  private _selectedLesson : Lesson;

  public selectedStudent : Student;
  public selectedGroup : Group;
  public selectedMonth : Date;
  public groups : Group[] = [];
  public monthes : Date[] = [];
  public lessons : Lesson[] = [];
  public panelOpenState : boolean = false;

  public set selectedLesson (value : Lesson) {
    this._selectedLesson = value;
    this.selectedGroup = null;
    this.selectedStudent = null;
    this.getMyGroups(value.id);
  }

  public get selectedLesson() { return this._selectedLesson; }

  constructor(private groupService : GroupService, 
    private lessonService : LessonService) { }

  ngOnInit(): void {
    this.getMyLessons();
    this.getMonthes();
  }

  onStudentSelecting(student : Student){
    this.selectedStudent = student;
  }

  getMyGroups(lessonId : number):void {
    this.groupService.getGroupsByLesson(lessonId).subscribe((data : Group[]) => this.groups = data);
  }

  getMyLessons():void {
    this.lessonService.getLessonsByTeacher(this.teacher.id).subscribe((data : Lesson[]) => this.lessons = data);
  }

  getMonthes():void {
    let current = new Date();
    let iteratorDate = current.getMonth() < 9 ? new Date(current.getFullYear(), 0) : new Date(current.getFullYear(), 9);
    while(iteratorDate.getMonth() <= current.getMonth()){
      this.monthes.push(new Date(iteratorDate.getFullYear(), iteratorDate.getMonth()));
      iteratorDate.setMonth(iteratorDate.getMonth() + 1);
    }
    this.selectedMonth = this.monthes[this.monthes.length - 1];
  }

}
