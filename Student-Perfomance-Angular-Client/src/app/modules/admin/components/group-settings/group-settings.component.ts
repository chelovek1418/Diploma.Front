import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/group/group.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GroupTitleValidator } from 'src/app/modules/teacher/group-title-validator/group-title-validator.component';
import { CommonDialogComponent } from 'src/app/modules/common/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnChanges, OnDestroy {

  @Input() public group: Group;
  @Output() settingsChanged = new EventEmitter();

  public updateForm: FormGroup;
  public get title() { return this.updateForm.get('title'); }

  private dialogSub: Subscription;
  private deleteGroupSub: Subscription;
  private updateGroupSub: Subscription;

  constructor(private groupService: GroupService,
    private router: Router,
    private dialog: MatDialog,
    titleValidator: GroupTitleValidator,
    fb: FormBuilder) {
    this.updateForm = fb.group({
      title: ["", {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        // asyncValidators: [titleValidator.validate.bind(titleValidator)],
        updateOn: 'blur'
      }],
      faculty: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
      year: ["", [Validators.required, Validators.max(6), Validators.min(1)]],
      speciality: ["", [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      specialization: ["", Validators.maxLength(30)],
      headmen: [""]
    });
  }

  ngOnChanges(): void {
    this.updateForm.controls['title'].setValue(this.group.title);
    this.updateForm.controls['faculty'].setValue(this.group.faculty);
    this.updateForm.controls['year'].setValue(this.group.year);
    this.updateForm.controls['speciality'].setValue(this.group.speciality);
    this.updateForm.controls['specialization'].setValue(this.group.specialization);
    this.updateForm.controls['headmen'].setValue(this.group.students.find(x => x.id === this.group.headmen?.id));
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
    this.deleteGroupSub?.unsubscribe();
    this.updateGroupSub?.unsubscribe();
  }

  delete(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: 'auto',
      data: this.group.title
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGroupSub = this.groupService.deleteGroup(this.group.id).subscribe(_ => this.router.navigate(['/groups']));
      }
    });
  }

  updateGroup() {
    this.group.title = this.updateForm.controls['title'].value;
    this.group.year = this.updateForm.controls['year'].value;
    this.group.speciality = this.updateForm.controls['speciality'].value;
    this.group.specialization = this.updateForm.controls['specialization'].value;
    this.group.faculty = this.updateForm.controls['faculty'].value;
    this.group.headmen = this.updateForm.controls['headmen'].value;
    this.updateGroupSub = this.groupService.updateGroup(this.group).subscribe(_ => this.settingsChanged.emit());
  }
}
