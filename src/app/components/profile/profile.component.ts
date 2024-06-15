import { Component, OnInit } from "@angular/core";
import { HojaDeVidaDto } from "src/app/shared/model/hoja-de-vida-dto";
import { IntegradorService } from "src/app/shared/services/domain/integrador.service";
declare var require: any;
const Swal = require("sweetalert2");

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
  hojaDeVida: HojaDeVidaDto;

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: { onmouseenter: any; onmouseleave: any }) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  constructor(private integradorService: IntegradorService) {}

  ngOnInit() {
    this.obtenerHojaDeVida();
  }

  obtenerHojaDeVida(): void {
    this.integradorService.obtenerHojaDeVida().subscribe({
      next: (hojaDeVidaResponse) => {
        if (hojaDeVidaResponse != null) {
          this.hojaDeVida = hojaDeVidaResponse;
        }
      },
      error: (error) => console.error(error),
    });
  }

  corregitHojaDeVida(hojaDeVida: HojaDeVidaDto) {
    this.integradorService.corregirHojaDeVida(hojaDeVida).subscribe({
      next: (event) => {
        console.log(event);
        this.alertSucces(event.message);
      },
      error: (error) => console.error(error),
    });
  }

  handleCargarFile(file: File): void {
    console.log(file);
    this.integradorService.cargarHojaDeVida(file).subscribe({
      next: (event) => {
        console.log(event);
        this.alertSucces(event.message);
      },
      error: (error) => console.error(error),
    });
  }

  alertSucces(mensaje: String): void {
    this.Toast.fire({
      icon: "success",
      title: mensaje,
    });
  }
}
