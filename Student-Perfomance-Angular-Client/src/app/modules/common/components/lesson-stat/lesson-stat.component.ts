import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Lesson } from '../../models/interfaces/lesson';
import { MarkService } from 'src/app/services/mark/mark.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-stat',
  templateUrl: './lesson-stat.component.html',
  styleUrls: ['./lesson-stat.component.css']
})
export class LessonStatComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public lesson: Lesson;
  public averageMark: number;

  private avgMarkSub: Subscription;

  constructor(private markService: MarkService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.lesson){
      this.avgMarkSub = this.markService.getAverageForLesson(this.lesson.id).subscribe((avg: number) => this.averageMark = avg);
    }
  }

  ngOnDestroy(): void {
    this.avgMarkSub?.unsubscribe();
  }

}
