import { Component, OnInit, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { GroupService } from 'src/app/services/group/group.service';
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
export class StudentSettingsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() student: Student;
  @Output() settingsChanged = new EventEmitter();

  public updateForm: FormGroup;
  public groups: Group[];

  public get userGroup(): FormGroup {
    return this.updateForm.get('user') as FormGroup;
  }

  private groupSub: Subscription;
  private studentUpdateSub: Subscription;
  private dialogSub: Subscription;
  private deleteStudSub: Subscription;

  constructor(fb: FormBuilder,
    private dialog: MatDialog,
    private groupService: GroupService,
    private studentService: StudentService,
    private router: Router) {

    this.updateForm = fb.group({
      firstName: ["", [Validators.required, Validators.maxLength(20)]],
      lastName: ["", [Validators.required, Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.getGroups();
  }

  ngOnChanges(): void {
    if (this.student) {
      this.updateForm.setValue({
        firstName: this.student.user.firstName,
        lastName: this.student.user.lastName,
        email: this.student.user.email
      });
    }
  }

  ngOnDestroy(): void {
    this.groupSub?.unsubscribe();
    this.studentUpdateSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.deleteStudSub?.unsubscribe();
  }

  getGroups(): void {
    this.groupSub = this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  submit(): void {
    this.student.user.firstName = this.updateForm.controls['firstName'].value;
    this.student.user.lastName = this.updateForm.controls['lastName'].value;
    this.student.user.email = this.updateForm.controls['email'].value;
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
