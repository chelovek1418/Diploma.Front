import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/interfaces/user';
import { Student } from '../../models/interfaces/student';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from '../../models/interfaces/group';
import { Router } from '@angular/router';
import { Teacher } from '../../models/interfaces/teacher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public isStudent: boolean = null;

  public firstFormGroup: FormGroup;
  public userFormGroup: FormGroup;
  public roleFormGroup: FormGroup;
  public groups: Group[] = [];

  private registerSub: Subscription;
  private groupSub: Subscription;

  constructor(private userService: UserService, 
    private groupService: GroupService,
    private studentService: StudentService, 
    private teacherService: TeacherService, 
    private _formBuilder: FormBuilder,
    private router: Router) {  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.requiredTrue]
    });
    this.userFormGroup = this._formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      patronymic: [""],
      phoneNumber: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      department: ["", Validators.required]
    });
    this.roleFormGroup = this._formBuilder.group({});
    this.getGroups();
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
    this.groupSub?.unsubscribe();
  }

  getGroups(): void {
    this.groupSub = this.groupService.getGroups()
        .subscribe(groups => this.groups = groups);
  }

  chooseRole(isStudent: boolean): void {
    this.isStudent = isStudent;
    this.firstFormGroup.controls['firstCtrl'].setValue(true);
    if (isStudent){
      this.roleFormGroup.addControl('group', new FormControl('', Validators.required));
    } else {
      this.roleFormGroup.addControl('position', new FormControl('', Validators.required));
    }
  }

  submit(): void {
    const user: User = this.userFormGroup.value;
    if (this.isStudent){
      const student: Student = { user: user, group : this.roleFormGroup.controls['group'].value };
      this.registerSub = this.studentService.addStudent(student).subscribe((data: Student) => this.router.navigate(['/students/', data.id]));
    } else {
      const teacher: Teacher = { user: user, position: this.roleFormGroup.value.position };
      this.registerSub = this.teacherService.create(teacher).subscribe((data: Teacher) => this.router.navigate(['/teachers/', data.id]));
    }
  }

}
