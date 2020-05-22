import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Router } from '@angular/router';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { LessonTitleValidator } from '../../validators/lesson-title-validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnDestroy {

  public createLessonForm: FormGroup;

  public get title() { return this.createLessonForm.get('title'); }

  private createLessonSub: Subscription;

  constructor(private lessonService: LessonService,
    private titleValidator : LessonTitleValidator,
    private router : Router,
    fb: FormBuilder) {

      this.createLessonForm = fb.group({          
        title : ["" , {
          validators :  [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
          asyncValidators: [this.titleValidator.validate.bind(this.titleValidator)],
          updateOn: 'blur'
         }],
      });
   }

  ngOnDestroy(): void {
    this.createLessonSub?.unsubscribe();
  }

  createLesson(){
    const lesson = this.createLessonForm.value as Lesson;
    if (lesson){
      this.createLessonSub = this.lessonService.createLesson(lesson).subscribe((lesson : Lesson) =>
        this.router.navigate(['/lessons', lesson.id]));
    }
  }
}
