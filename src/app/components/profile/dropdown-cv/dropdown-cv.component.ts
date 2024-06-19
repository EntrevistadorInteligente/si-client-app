import { Component, EventEmitter, OnInit, Output } from "@angular/core";
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-dropdown-cv",
  templateUrl: "./dropdown-cv.component.html",
  styleUrl: "./dropdown-cv.component.scss",
})
export class DropdownCvComponent implements OnInit {
  constructor() {}
  files: File[] = [];

  @Output()
  eventoEnviarFile = new EventEmitter<File>();

  onSelect(event: any) {
    if (this.files && this.files.length >= 1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  handleClickCargar(): void {
    if (this.files.length > 0) {
      this.eventoEnviarFile.emit(this.files[0]);
      this.onRemove(this.files[0]);
    } else {
      this.danger();
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error en la UI
    }
  }

  danger() {
    Swal.fire(
      "Archivo no Encontrado",
      "Verifique y vuelva a intentarlo",
      "error"
    );
  }

  ngOnInit(): void {}
}
