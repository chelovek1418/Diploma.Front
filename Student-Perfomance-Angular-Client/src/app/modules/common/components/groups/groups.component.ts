import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from '../../models/interfaces/group';
import { GroupService } from '../../../../services/group/group.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {

  public groups: Group[];
  public paginatedGroups: Group[];
  public length: number;
  public pageSize = 10;
  public readonly pageSizeOptions: number[] = [5, 10, 20];

  public get pageEvent(): PageEvent { return this._pageEvent; }

  public set pageEvent(event: PageEvent) {
    this._pageEvent = event;
    this.pageSize = event.pageSize;
    this.paginate(event.pageIndex); 
  }


  private groupsSub: Subscription;
  private _pageEvent: PageEvent;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    this.getGroups();
  }

  ngOnDestroy(): void {
    this.groupsSub?.unsubscribe();
  }

  getGroups(): void {
    this.groupsSub = this.groupService.getGroups()
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.length = groups.length;
        this.paginate(0);
      });
  }

  private paginate(index: number): void {
    const start = index * this.pageSize;
    this.paginatedGroups = this.groups.slice(start, start + this.pageSize);
  }

}
