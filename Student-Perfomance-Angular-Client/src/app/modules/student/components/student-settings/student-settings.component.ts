import { Component, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnChanges, OnDestroy {

  @Input() student: Student;
  @Output() settingsChanged = new EventEmitter();

  public updateForm: FormGroup;

  private studentUpdateSub: Subscription;
  private dialogSub: Subscription;
  private deleteStudSub: Subscription;

  constructor(fb: FormBuilder,
    private dialog: MatDialog,
    private studentService: StudentService,
    private router: Router) {

    this.updateForm = fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      patronymic: ["", Validators.maxLength(30)],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(30)]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(15)]],
      department: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  ngOnChanges(): void {
    if (this.student) {
      this.updateForm.setValue({
        firstName: this.student.user.firstName,
        lastName: this.student.user.lastName,
        email: this.student.user.email,
        patronymic: this.student.user.patronymic,
        phoneNumber: this.student.user.phoneNumber,
        department: this.student.user.department
      });
    }
  }

  ngOnDestroy(): void {
    this.studentUpdateSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.deleteStudSub?.unsubscribe();
  }

  submit(): void {
    this.student.user.firstName = this.updateForm.controls['firstName'].value;
    this.student.user.lastName = this.updateForm.controls['lastName'].value;
    this.student.user.email = this.updateForm.controls['email'].value;
    this.student.user.patronymic = this.updateForm.controls['patronymic'].value;
    this.student.user.phoneNumber = this.updateForm.controls['phoneNumber'].value;
    this.student.user.department = this.updateForm.controls['department'].value;

    this.studentUpdateSub = this.studentService.updateStudent(this.student).subscribe(_ => this.settingsChanged.emit());
  }

  delete(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: 'this account'
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteStudSub = this.studentService.delete(this.student.id).subscribe(_ => this.router.navigate(['/students']));
      }
    });
  }

}
