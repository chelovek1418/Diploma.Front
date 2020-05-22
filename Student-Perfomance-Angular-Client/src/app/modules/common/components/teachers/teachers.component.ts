import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { Teacher } from '../../models/interfaces/teacher';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

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

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  ngOnDestroy(): void {
    this.teachersSub?.unsubscribe();
  }

  getTeachers(): void {
    this.teachersSub = this.teacherService.getAll()
      .subscribe((data: Teacher[]) => {
        this.teachers = data;
        this.length = data.length;
        this.paginate(0);
      });
  }

  private paginate(index: number): void {
    const start = index * this.pageSize;
    this.paginatedTeachers = this.teachers.slice(start, start + this.pageSize);
  }

}
