import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Student } from 'src/app/modules/common/models/interfaces/student';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { Subscription } from 'rxjs';
import { MarkService } from 'src/app/services/mark/mark.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnChanges, OnDestroy {

  @Input() student : Student;

  public avgMark : number;

  private avgMarkSub : Subscription;

  constructor(private groupService : GroupService, private markService: MarkService) { }

  ngOnChanges(): void {
    if (this.student){
      this.avgMarkSub = this.markService.getAverageMarkByStudentId(this.student.id).subscribe((avg : number) => this.avgMark = avg);
    }
  }

  ngOnDestroy(): void {
    this.avgMarkSub?.unsubscribe();
  }

}
