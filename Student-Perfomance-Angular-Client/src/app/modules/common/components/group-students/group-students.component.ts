import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Group } from '../../models/interfaces/group';
import { Subscription, Subject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../models/interfaces/student';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-group-students',
  templateUrl: './group-students.component.html',
  styleUrls: ['./group-students.component.css']
})
export class GroupStudentsComponent implements OnInit, OnDestroy {

  @Input() group: Group;

  public search: boolean = false;
  public foundStudents$: Observable<Student[]>;
  public term: string = '';

  private searchTerms = new Subject<string>();
  private dialogSub: Subscription;
  private editStudentSub: Subscription;

  constructor(private dialog: MatDialog, private studentService: StudentService) { }

  ngOnInit(): void {
    this.foundStudents$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.studentService.searchStudents(term)),
      map(students => students.filter(item => this.group.students.find(x => x.id == item.id) == null)));
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
    this.editStudentSub?.unsubscribe();
  }

  dropStudent(student: Student): void {

    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: student.user.firstName + ' ' + student.user.lastName
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const groupLesson: GroupLesson = {
        //   groupId: group.id,
        //   lessonId: this.lesson.id
        // };
        // this.dropLessonSub = this.groupService.dropLessonFromGroup(groupLesson).subscribe(_ => {
        //   const index = this.groups.indexOf(group, 0);
        //   if (index > -1) {
        //     this.groups.splice(index, 1);
        //   }
        //   this.searchGroup('');
        //   this.term = '';
        // });
      }
    });
  }

  searchStudent(term: string): void {
    this.searchTerms.next(term);
  }

  addStudent(student: Student) : void {
    student.group = this.group;
    this.editStudentSub = this.studentService.updateStudent(student).subscribe(_ => {
      this.group.students.push(student);
      this.term = ''});
  }

}
