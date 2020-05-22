import { Component, OnChanges, Input, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from '../../models/interfaces/group';
import { Lesson } from '../../models/interfaces/lesson';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { GroupLesson } from '../../models/interfaces/groupLesson';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-groups',
  templateUrl: './lesson-groups.component.html',
  styleUrls: ['./lesson-groups.component.css']
})
export class LessonGroupsComponent implements OnChanges, OnInit, OnDestroy {

  private searchTerms = new Subject<string>();
  private dialogSub: Subscription;
  private dropLessonSub: Subscription;

  @Input()
  public lesson: Lesson;
  public groups: Group[];
  public search: boolean = false;
  public foundGroups$: Observable<Group[]>;
  public term: string = '';

  constructor(private groupService: GroupService, private dialog: MatDialog) { }

  ngOnChanges(): void {
    this.groupService.getGroupsByLesson(this.lesson.id).subscribe((data: Group[]) => this.groups = data);
  }

  ngOnInit(): void {
    this.foundGroups$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.groupService.searchGroups(term)),
      map(groups => groups.filter(item => this.groups.find(x => x.id == item.id) == null)));
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
    this.dropLessonSub?.unsubscribe();
  }

  searchGroup(term: string): void {
    this.searchTerms.next(term);
  }

  addGroup(group: Group): void {
    const groupLesson: GroupLesson = {
      groupId: group.id,
      lessonId: this.lesson.id
    };
    this.groupService.addLessonForGroup(groupLesson).subscribe(_ => {
      this.searchGroup('');
      this.term = '';
      this.groups.push(group);
    });
  }

  dropGroup(group: Group): void {

    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: group.title
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const groupLesson: GroupLesson = {
          groupId: group.id,
          lessonId: this.lesson.id
        };
        this.dropLessonSub = this.groupService.dropLessonFromGroup(groupLesson).subscribe(_ => {
          const index = this.groups.indexOf(group, 0);
          if (index > -1) {
            this.groups.splice(index, 1);
          }
          this.searchGroup('');
          this.term = '';
        });
      }
    });
  }
  
}