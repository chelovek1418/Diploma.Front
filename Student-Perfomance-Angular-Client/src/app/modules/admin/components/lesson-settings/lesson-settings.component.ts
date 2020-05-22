import { Component, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonTitleValidator } from '../../validators/lesson-title-validator';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-settings',
  templateUrl: './lesson-settings.component.html',
  styleUrls: ['./lesson-settings.component.css']
})
export class LessonSettingsComponent implements OnChanges, OnDestroy {

  @Input() public lesson: Lesson;
  @Output() settingsChanged = new EventEmitter();
  
  public updateForm: FormGroup;
  public get title() { return this.updateForm.get('title'); }

  private dialogSub: Subscription;
  private deleteLessonSub: Subscription;
  private updateLessonSub: Subscription;

  constructor(private lessonService: LessonService,
    private router: Router,
    private dialog: MatDialog,
    titleValidator: LessonTitleValidator,
    fb: FormBuilder) {
    this.updateForm = fb.group({
      title: ["", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
        asyncValidators: [titleValidator.validate.bind(titleValidator)],
        updateOn: 'blur'
      }],
    });
  }

  ngOnChanges(): void {
    this.updateForm.controls['title'].setValue(this.lesson.title);
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
    this.deleteLessonSub?.unsubscribe();
    this.updateLessonSub?.unsubscribe();
  }

  delete(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: this.lesson.title
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteLessonSub = this.lessonService.deleteLesson(this.lesson.id).subscribe(_ => this.router.navigate(['/lessons']));
      }
    });
  }

  renameLesson() {
    this.lesson.title = this.updateForm.value.title;
    this.updateLessonSub = this.lessonService.updateLesson(this.lesson).subscribe(_ => this.settingsChanged.emit());
  }

}
