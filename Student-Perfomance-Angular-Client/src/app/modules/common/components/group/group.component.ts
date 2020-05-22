import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '../../../../services/group/group.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../models/interfaces/group';
import { Subscription } from 'rxjs';
import { Detail } from '../../models/interfaces/details';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  public group : Group;
  public selectedDetails: Detail[];

  private groupSub: Subscription;

  constructor(private groupService: GroupService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getGroup();
  }

  ngOnDestroy(): void {
    this.groupSub?.unsubscribe();
  }

  getGroup(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.groupSub = this.groupService.getGroup(id)
      .subscribe((group:Group) => this.group = group);
  }

}
