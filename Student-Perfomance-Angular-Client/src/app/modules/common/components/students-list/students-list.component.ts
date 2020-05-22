import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/interfaces/student';
import { StudentService } from 'src/app/services/student/student.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public students: Student[];
  public paginatedStudents: Student[];
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
  private studentsSub: Subscription;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  ngOnDestroy(): void {
    this.studentsSub?.unsubscribe();
  }

  getStudents(): void {
    this.studentsSub = this.studentService.getStudents()
      .subscribe((data: Student[]) => {
        this.students = data;
        this.length = data.length;
        this.paginate(0);
      });
  }

  private paginate(index: number): void {
    const start = index * this.pageSize;
    this.paginatedStudents = this.students.slice(start, start + this.pageSize);
  }

}
