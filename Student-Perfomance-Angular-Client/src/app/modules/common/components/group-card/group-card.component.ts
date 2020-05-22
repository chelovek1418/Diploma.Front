import { Component, OnInit, Input } from '@angular/core';
import { Group } from '../../models/interfaces/group';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {

  @Input()
  public group: Group;

  constructor() { }

  ngOnInit(): void {
  }

}
