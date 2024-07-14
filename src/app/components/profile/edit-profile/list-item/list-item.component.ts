import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrl: "./list-item.component.scss",
})
export class ListItemComponent implements AfterViewInit {
  @Input() title: string = "Lista de Items";
  @Input() items: any[] = [];
  @Input() fieldName: string;
  @Output() itemsChange = new EventEmitter<{ field: string; items: any[] }>();
  @ViewChild("cardContainer", { static: true }) cardContainer: ElementRef;
  public text: string = "";
  public red_border: boolean = false;
  public visible: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        this.applyStylesBasedOnWidth(width);
      }
    });

    resizeObserver.observe(this.cardContainer.nativeElement);
  }

  applyStylesBasedOnWidth(width: number) {
    const headerElement =
      this.cardContainer.nativeElement.querySelector(".card-header");
    if (width < 343) {
      headerElement.classList.remove("header-flex");
      headerElement.classList.add("non-flex");
    } else {
      headerElement.classList.remove("non-flex");
      headerElement.classList.add("header-flex");
    }
  }

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
