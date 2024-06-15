import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrl: "./list-item.component.scss",
})
export class ListItemComponent implements OnInit {
  @Input() title: string = "Lista de Items";
  @Input() items: any[] = [];
  @Input() fieldName: string;
  @Output() itemsChange = new EventEmitter<{ field: string; items: any[] }>();

  public text: string = "";
  public red_border: boolean = false;
  public visible: boolean = false;

  constructor() {}

  ngOnInit() {}

  public addTask(text: any) {
    if (this.text.trim()) {
      this.items.push({ name: this.text });
      this.text = "";
      this.visible = false;
      this.red_border = false;
      this.itemsChange.emit({ field: this.fieldName, items: this.items });
    } else {
      this.red_border = true;
    }
  }

  public taskDeleted(index: any) {
    this.items.splice(index, 1);
    this.itemsChange.emit({ field: this.fieldName, items: this.items });
  }
}
