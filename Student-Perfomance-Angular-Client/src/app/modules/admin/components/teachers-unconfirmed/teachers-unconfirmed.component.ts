import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-teachers-unconfirmed',
  templateUrl: './teachers-unconfirmed.component.html',
  styleUrls: ['./teachers-unconfirmed.component.css']
})
export class TeachersUnconfirmedComponent implements OnInit {

  public teachers: Teacher[];
  public paginatedTeachers: Teacher[];
  public length: number;
  public pageSize = 10;
  public readonly pageSizeOptions: number[] = [5, 10, 20];

  public get pageEvent(): PageEvent { return this._pageEvent; }

  public set pageEvent(event: PageEvent) {
    this._pageEvent = event;
    this.pageSize = event.pageSize;
    this.paginate(event.pageIndex);
  }

  private _pageEvent: PageEvent;
  private teachersSub: Subscription;
  private confirmTeacherSub: Subscription;
  private denyTeacherSub: Subscription;

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  ngOnDestroy(): void {
    this.teachersSub?.unsubscribe();
    this.confirmTeacherSub?.unsubscribe();
    this.denyTeacherSub?.unsubscribe();
  }

  getTeachers(): void {
    this.teachersSub = this.teacherService.getUnconfirmed()
      .subscribe((data: Teacher[]) => {
        this.teachers = data;
        this.length = data.length;
        this.paginate(0);
      });
  }

  public confirm(teacher: Teacher): void {
    this.confirmTeacherSub = this.teacherService.confirmTeacher(teacher.id).subscribe(_ => {
      const index = this.teachers.indexOf(teacher, 0);
      if (index > -1) {
        this.teachers.splice(index, 1);
      }
    });
  }

  public deny(teacher: Teacher): void {
    this.denyTeacherSub = this.teacherService.delete(teacher.id).subscribe(_ => {
      const index = this.teachers.indexOf(teacher, 0);
      if (index > -1) {
        this.teachers.splice(index, 1);
      }
    });
  }

  private paginate(index: number): void {
    const start = index * this.pageSize;
    this.paginatedTeachers = this.teachers.slice(start, start + this.pageSize);
  }

}
