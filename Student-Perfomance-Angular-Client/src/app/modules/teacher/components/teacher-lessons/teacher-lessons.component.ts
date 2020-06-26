import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { Subscription, Observable, Subject } from 'rxjs';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';
import { TeacherLesson } from '../../models/interfaces/TeacherLesson';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-lessons',
  templateUrl: './teacher-lessons.component.html',
  styleUrls: ['./teacher-lessons.component.css']
})
export class TeacherLessonsComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public teacher: Teacher;
  public teacherLessons: Lesson[];

  public search: boolean = false;
  public foundLessons$: Observable<Lesson[]>;
  public term: string = '';

  private searchTerms = new Subject<string>();
  private dialogSub: Subscription;
  private teacherLessonsSub: Subscription;
  private dropLessonSub: Subscription;
  private addLessonSub: Subscription;

  constructor(private lessonService: LessonService, private teacherService: TeacherService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.foundLessons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.lessonService.searchLessons(term)),
      map((lessons: Lesson[]) => lessons.filter(item => this.teacherLessons.find(x => x.id == item.id) == null)));
  }

  ngOnChanges(): void {
    if (this.teacher){
      this.getTeacherLessons();
    }
  }

  ngOnDestroy(): void {
    this.teacherLessonsSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.addLessonSub?.unsubscribe();
    this.dropLessonSub?.unsubscribe();
  }

  dropLesson(lesson: Lesson): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: lesson.title
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const teacherLesson: TeacherLesson = { teacherId: this.teacher.id, lessonId: lesson.id };
        this.dropLessonSub = this.teacherService.dropLessonForTeacher(teacherLesson).subscribe(_ => {
          const index = this.teacherLessons.indexOf(lesson, 0);
          if (index > -1) {
            this.teacherLessons.splice(index, 1);
          }
          this.searchLessons('');
          this.term = '';
        });
      }
    });
  }

  searchLessons(term: string): void {
    this.searchTerms.next(term);
  }

  addLesson(lesson: Lesson) : void {
    const teacherLesson: TeacherLesson = { teacherId: this.teacher.id, lessonId: lesson.id };
    this.addLessonSub = this.teacherService.addLessonForTeacher(teacherLesson).subscribe(_ => {
      this.teacherLessons.push(lesson);
      this.term = ''});
  }

  getTeacherLessons(): void {
    this.teacherLessonsSub = this.lessonService.getLessonsByTeacher(this.teacher.id).subscribe((data: Lesson[]) => this.teacherLessons = data);
  }

}
