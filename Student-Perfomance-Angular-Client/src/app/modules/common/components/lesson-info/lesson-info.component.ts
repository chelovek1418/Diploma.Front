import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from '../../models/interfaces/lesson';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-info',
  templateUrl: './lesson-info.component.html',
  styleUrls: ['./lesson-info.component.css']
})
export class LessonInfoComponent implements OnInit, OnDestroy {

  public lesson : Lesson;

  private lessonSub: Subscription;

  constructor(private lessonService: LessonService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getLesson();
  }

  ngOnDestroy(): void {
    this.lessonSub?.unsubscribe();
  }

  getLesson(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.lessonSub = this.lessonService.getLesson(id).subscribe((data:Lesson) => this.lesson = data);
  }

}
