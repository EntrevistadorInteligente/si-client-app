import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout/layout.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss']
})
export class ModeComponent implements OnInit {

  public dark: boolean = this.layout.config.settings.layout_version == 'dark-only' ? true : false;

  constructor(public layout: LayoutService) { }

  ngOnInit(): void {
  }

}
