import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Group } from '../../models/interfaces/group';
import { Observable, Subject, Subscription } from 'rxjs';
import { Lesson } from '../../models/interfaces/lesson';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { GroupLesson } from '../../models/interfaces/groupLesson';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-lessons',
  templateUrl: './group-lessons.component.html',
  styleUrls: ['./group-lessons.component.css']
})
export class GroupLessonsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() group: Group;

  public search: boolean = false;
  public foundLessons$: Observable<Lesson[]>;
  public term: string = '';
  public lessons: Lesson[];

  private searchTerms = new Subject<string>();
  private dialogSub: Subscription;
  private lessonsSub: Subscription;
  private dropLessonSub: Subscription;

  constructor(private dialog: MatDialog, private lessonService: LessonService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.foundLessons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.lessonService.searchLessons(term)),
      map((lessons: Lesson[]) => lessons.filter(item => this.lessons.find(x => x.id == item.id) == null)));
  }

  ngOnChanges(): void {
    if (this.group){
      this.lessonsSub = this.lessonService.getLessonsByGroup(this.group.id).subscribe((data: Lesson[]) => this.lessons = data);
    }
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
    this.lessonsSub?.unsubscribe();
    this.dropLessonSub?.unsubscribe();
  }

  dropLesson(lesson: Lesson): void {

    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: lesson.title
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const groupLesson: GroupLesson = {
          groupId: this.group.id,
          lessonId: lesson.id
        };
        this.dropLessonSub = this.groupService.dropLessonFromGroup(groupLesson).subscribe(_ => {
          const index = this.lessons.indexOf(lesson, 0);
          if (index > -1) {
            this.lessons.splice(index, 1);
          }
          this.searchLesson('');
          this.term = '';
        });
      }
    });
  }

  searchLesson(term: string): void {
    this.searchTerms.next(term);
  }

  addLesson(lesson: Lesson) : void {
    const groupLesson: GroupLesson = {
      groupId: this.group.id,
      lessonId: lesson.id
    };
    this.groupService.addLessonForGroup(groupLesson).subscribe(_ => {
      this.searchLesson('');
      this.term = '';
      this.lessons.push(lesson);
    });
  }

}
