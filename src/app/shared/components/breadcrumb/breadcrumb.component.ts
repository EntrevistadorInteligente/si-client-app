import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
 
  @Input() title: any;
  @Input() items!: any[];
  @Input() active_item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
