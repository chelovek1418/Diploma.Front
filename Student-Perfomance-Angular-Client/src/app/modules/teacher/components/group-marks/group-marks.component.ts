import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { GroupService } from 'src/app/services/group/group.service';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { MarkService } from 'src/app/services/mark/mark.service';
import { Mark } from 'src/app/modules/common/models/interfaces/mark';

@Component({
  selector: 'app-group-marks',
  templateUrl: './group-marks.component.html',
  styleUrls: ['./group-marks.component.css']
})
export class GroupMarksComponent implements OnInit, OnChanges {

  private markToSet: Mark;
  private totalMarks: Mark[];

  public daysInMonth: Date[];
  public displayedColumns: string[];
  public dataSource = new MatTableDataSource<Student>();
  public group: Group;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() groupId: number;
  @Input() lessonId: number;
  @Input() month: Date;
  @Output() selectedStudent = new EventEmitter<Student>();

  constructor(private groupService: GroupService, private markService: MarkService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.updateData();
  }

  updateData(): void {
    this.dataSource.data = [];
    if (this.month) {
      this.daysInMonth = this.getDaysInMonth(this.month.getMonth(), this.month.getFullYear());
      this.displayedColumns = this.daysInMonth.map(x => x.getDate().toString());
      this.displayedColumns.unshift('fullName');
      this.displayedColumns.push('total');
      if (this.groupId && this.lessonId) {
        this.groupService.getGroupWithMarksByLesson(this.groupId, this.lessonId, this.month).subscribe((data: Group) => {
          this.group = data;
          this.dataSource.data = this.group.students.sort((a, b) => (a.user.lastName > b.user.lastName) ? 1 : ((b.user.lastName > a.user.lastName) ? -1 : 0));
        });
        this.markService.getTotalMarksForGroupByLesson(this.groupId, this.lessonId).subscribe((totals: Mark[]) => this.totalMarks = totals);
      }
    }
  }

  getDaysInMonth(month: number, year: number): Date[] {
    let date = new Date(year, month, 1);
    let days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getMark(student: Student, day: number): number {
    let mark = this.group.students.find(s => s.id === student.id).marks.find(m => new Date(m.markDate).getDate() == day)?.mark;
    return mark === 0 ? -1 : mark;
  }

  getTotal(studentId: number): number {
    return this.totalMarks?.find(x => x.studentId === studentId)?.mark || 0;
  }

  setMark(student: Student, day: number, mark: number): void {
    const dayOfWeek = this.daysInMonth[day - 1].getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6 || mark < -1 || mark > 99 || new Date(this.month.getFullYear(), this.month.getMonth(), day) > new Date() ) {
      this.markToSet = null;
      return;
    }

    this.markToSet = { lessonId: this.lessonId, mark: mark, studentId: student.id, markDate: new Date(this.month.getFullYear(), this.month.getMonth(), day, 12) };
  }

  selectStudent(student: Student) {
    this.selectedStudent.emit(student);
  }

  isOutput(day: number): boolean {
    const dayOfWeek = this.daysInMonth[day].getDay();
    return dayOfWeek === 6 || dayOfWeek === 0;
  }

  updateTable(student: Student, day: number) {
    if (this.markToSet && this.markToSet.markDate.getDate() == day && this.markToSet.studentId === student.id) {
      const editableStudent = this.group.students.find(s => s.id === student.id);
      let totalForStudent = this.totalMarks.find(x => x.studentId == student.id);
      if (this.getMark(student, day)) {
        let perviousMark = editableStudent.marks.find(m => new Date(m.markDate).getDate() == day);
        if (this.markToSet.mark == 0) {
          this.markService.deleteMark(perviousMark.id).subscribe(_ => {
            const index = editableStudent.marks.indexOf(perviousMark, 0);
            if (index > -1) {
              editableStudent.marks.splice(index, 1);
            }
            totalForStudent.mark -= perviousMark.mark;
          });
        }
        else {
          const difference = this.markToSet.mark - perviousMark.mark;
          perviousMark.mark = + this.markToSet.mark;
          this.markService.editMark(perviousMark).subscribe(_ => {
            totalForStudent.mark += difference;
          });
        }
      }
      else {
        if (this.markToSet.mark != 0) {
          this.markToSet.mark =+ this.markToSet.mark;
          this.markService.setMark(this.markToSet).subscribe((x: Mark) => {
            editableStudent.marks.push(x);
            totalForStudent.mark += x.mark;
          });
        }
      } 
    }
    this.markToSet = null;
  }
}
