import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../../../../services/student/student.service';
import { Student } from '../../models/interfaces/student';
import { Subscription } from 'rxjs';
import { Group } from '../../models/interfaces/group';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public students: Student[];
  public groups: Group[];

  private studentsSub: Subscription;
  private groupsSub: Subscription;

  constructor(private studentService: StudentService, private groupService: GroupService) { }

  ngOnInit() {
    this.getBestStudents();
    this.getBestGroups();
  }

  ngOnDestroy(): void {
    this.studentsSub?.unsubscribe();
    this.groupsSub?.unsubscribe();
  }

  getBestStudents(): void {
    this.studentsSub = this.studentService.getBestStudents(new Date())
      .subscribe((data: Student[]) => this.students = data);
  }

  getBestGroups(): void {
    this.groupsSub = this.groupService.getGroups()
      .subscribe((data: Group[]) => this.groups = data);
  }

}