import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Injectable({ providedIn: 'root' })
export class LessonTitleValidator implements AsyncValidator {
  constructor(private lessonService: LessonService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.lessonService.isUniqueTitle(ctrl.value as string).pipe(
      map(isUnique => (isUnique ? null : { uniqueTitle: true })),
      catchError(() => of(null))
    );
  }
}