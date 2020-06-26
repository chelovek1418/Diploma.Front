import { Component, OnInit, Output, Input, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Teacher } from 'src/app/modules/common/models/interfaces/teacher';
import { DayPair } from '../../models/interfaces/dayPair';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { Lesson } from 'src/app/modules/common/models/interfaces/lesson';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/group/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { DetailService } from 'src/app/services/detail/detail.service';
import { Detail } from 'src/app/modules/common/models/interfaces/details';

@Component({
  selector: 'app-add-detail',
  templateUrl: './add-detail.component.html',
  styleUrls: ['./add-detail.component.css']
})
export class AddDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Output()
  public operationEnded = new EventEmitter();
  @Input()
  public teacher: Teacher;
  @Input()
  public dayPair: DayPair;
  public lessons: Lesson[];
  public detailForm: FormGroup;
  public groups: Group[];
  public options = [{value: null, view: 'Every week'}, {value: true, view: 'Numerical weeks only'}, {value: false, view: 'Denominator weeks only'} ];
  public selectedPeriod = this.options[0];

  private createDetailSub: Subscription;
  private lessonsSub: Subscription;
  private groupsSub: Subscription;
  private semestr: number = new Date().getMonth() >= 8 ? 0 : 1;

  constructor(private lessonService: LessonService, 
    private groupService: GroupService, 
    private detailService: DetailService, 
    fb: FormBuilder) {
    this.detailForm = fb.group({
      subject: ["", Validators.required],
      group: ["", Validators.required],
      isNumerator: [""]
    });
   }

  ngOnInit(): void {
    if (this.teacher){
      this.getLessons();
    }
  }

  ngOnChanges(): void {
    this.selectedPeriod = this.options[0];
    this.detailForm.reset();
  }

  ngOnDestroy(): void {
    this.lessonsSub?.unsubscribe();
    this.groupsSub?.unsubscribe();
    this.createDetailSub?.unsubscribe();
  }

  submit(): void {
    const detail: Detail = { 
      semestr: this.semestr, 
      teacher: this.teacher, 
      subject: this.detailForm.controls['subject'].value, 
      isNumerator: this.detailForm.controls['isNumerator'].value,
      group: this.detailForm.controls['group'].value,
      dayOfWeek: this.dayPair.day,
      pair: this.dayPair.pair };
    this.createDetailSub = this.detailService.create(detail).subscribe(_ => this.operationEnded.emit());
  }

  selectLesson(lesson: Lesson): void {
    if (lesson){
      this.groupsSub = this.groupService.getGroupsByLesson(lesson.id).subscribe((data: Group[]) => this.groups = data);
    }
  }

  private getLessons(): void {
    this.lessonsSub = this.lessonService.getLessonsByTeacher(this.teacher.id).subscribe((data: Lesson[]) => this.lessons = data);
  }

}
