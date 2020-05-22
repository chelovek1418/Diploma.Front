import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from '../../models/interfaces/lesson';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, OnDestroy {

  public lessons : Lesson[];
  public paginatedLessons: Lesson[];
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
  private lessonSub: Subscription

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.getLessons();
  }

  ngOnDestroy(): void {
    this.lessonSub?.unsubscribe();
  }

  getLessons() : void {
    this.lessonSub = this.lessonService.getLessons().subscribe((data : Lesson[]) => {
      this.lessons = data;
      this.length = data.length;
      this.paginate(0);
    });
  }

  private paginate(index: number): void {
    const start = index * this.pageSize;
    this.paginatedLessons = this.lessons.slice(start, start + this.pageSize);
  }

}
