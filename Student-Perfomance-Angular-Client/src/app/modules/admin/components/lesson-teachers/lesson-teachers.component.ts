import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { Observable, Subject, Subscription } from 'rxjs';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';
import { TeacherLesson } from 'src/app/modules/teacher/models/interfaces/TeacherLesson';

@Component({
  selector: 'app-lesson-teachers',
  templateUrl: './lesson-teachers.component.html',
  styleUrls: ['./lesson-teachers.component.css']
})
export class LessonTeachersComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public lesson: Lesson;
  public lessonTeachers: Teacher[];

  public search: boolean = false;
  public foundTeachers$: Observable<Teacher[]>;
  public term: string = '';

  private searchTerms = new Subject<string>();
  private dialogSub: Subscription;
  private teacherLessonsSub: Subscription;
  private dropTeacherSub: Subscription;
  private addTeacherSub: Subscription;

  constructor(private lessonService: LessonService, private teacherService: TeacherService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.foundTeachers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.teacherService.search(term)),
      map((teachers: Teacher[]) => teachers.filter(item => this.lessonTeachers?.find(x => x.id == item.id) == null)));
  }

  ngOnChanges(): void {
    if (this.lesson) {
      this.getLessonTeachers();
    }
  }

  ngOnDestroy(): void {
    this.teacherLessonsSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.addTeacherSub?.unsubscribe();
    this.dropTeacherSub?.unsubscribe();
  }

  dropTeacher(teacher: Teacher): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: teacher.user.lastName + ' ' + teacher.user.firstName
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const teacherLesson: TeacherLesson = { teacherId: teacher.id, lessonId: this.lesson.id };
        this.dropTeacherSub = this.teacherService.dropLessonForTeacher(teacherLesson).subscribe(_ => {
          const index = this.lessonTeachers.indexOf(teacher, 0);
          if (index > -1) {
            this.lessonTeachers.splice(index, 1);
          }
          this.searchTeachers('');
          this.term = '';
        });
      }
    });
  }

  searchTeachers(term: string): void {
    this.searchTerms.next(term);
  }

  addTeacher(teacher: Teacher): void {
    const teacherLesson: TeacherLesson = { lessonId: this.lesson.id, teacherId: teacher.id };
    this.addTeacherSub = this.teacherService.addLessonForTeacher(teacherLesson).subscribe(_ => {
      this.lessonTeachers.push(teacher);
      this.term = ''
    });
  }

  getLessonTeachers(): void {
    this.teacherLessonsSub = this.teacherService.getTeachersByLesson(this.lesson.id).subscribe((data: Teacher[]) => this.lessonTeachers = data);
  }


}
