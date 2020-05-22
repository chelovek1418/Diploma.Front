import { Component, OnInit, Input } from '@angular/core';
import { Detail } from '../../models/interfaces/details';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {

  @Input()
  public detail: Detail;

  constructor() { }

  ngOnInit(): void {
  }

}
