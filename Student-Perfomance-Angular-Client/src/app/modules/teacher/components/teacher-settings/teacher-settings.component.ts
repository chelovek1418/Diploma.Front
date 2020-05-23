import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { Router } from '@angular/router';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-teacher-settings',
  templateUrl: './teacher-settings.component.html',
  styleUrls: ['./teacher-settings.component.css']
})
export class TeacherSettingsComponent implements OnChanges, OnDestroy {

  @Input() teacher: Teacher;
  @Output() settingsChanged = new EventEmitter();

  public updateForm: FormGroup;
  public userForm: FormGroup;

  public get userGroup(): FormGroup {
    return this.updateForm.get('user') as FormGroup;
  }

  private teacherUpdateSub: Subscription;
  private dialogSub: Subscription;
  private deleteTeacherSub: Subscription;

  constructor(fb: FormBuilder,
    private dialog: MatDialog,
    private teacherService: TeacherService,
    private router: Router) {

    this.userForm = fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      patronymic: ["", Validators.maxLength(30)],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(30)]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(15)]],
      department: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });

    this.updateForm = fb.group({
      user: this.userForm,
      position: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });

  }

  ngOnChanges(): void {
    if (this.teacher) {
      this.userForm.setValue({
        firstName: this.teacher.user.firstName,
        lastName: this.teacher.user.lastName,
        email: this.teacher.user.email,
        patronymic: this.teacher.user.patronymic,
        phoneNumber: this.teacher.user.phoneNumber,
        department: this.teacher.user.department
      });
      this.updateForm.setValue({
        position: this.teacher.position
      });
    }
  }

  ngOnDestroy(): void {
    this.teacherUpdateSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.deleteTeacherSub?.unsubscribe();
  }

  submit(): void {
    
    this.teacher.user.firstName = this.userForm.controls['firstName'].value;
    this.teacher.user.lastName = this.userForm.controls['lastName'].value;
    this.teacher.user.email = this.userForm.controls['email'].value;
    this.teacher.user.patronymic = this.userForm.controls['patronymic'].value;
    this.teacher.user.phoneNumber = this.userForm.controls['phoneNumber'].value;
    this.teacher.user.department = this.userForm.controls['department'].value;
    this.teacher.position = this.updateForm.controls['position'].value;

    this.teacherUpdateSub = this.teacherService.update(this.teacher).subscribe(_ => this.settingsChanged.emit());
  }

  delete(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: 'this account'
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteTeacherSub = this.teacherService.delete(this.teacher.id).subscribe(_ => this.router.navigate(['/teachers']));
      }
    });
  }

}
