import { Component, OnInit, OnDestroy } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { Subscription } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { DayPair } from '../../models/interfaces/dayPair';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit, OnDestroy {

  public teacher: Teacher;
  public selectedDayPair: DayPair;

  private teacherSub: Subscription;

  constructor(private teacherService: TeacherService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getTeacher();
  }

  ngOnDestroy(): void {
    this.teacherSub?.unsubscribe();
  }

  getTeacher(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.teacherSub = this.teacherService.get(id).subscribe((data: Teacher) => this.teacher = data);
  }
  
}
