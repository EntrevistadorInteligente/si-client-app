import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private integradorService: IntegradorService, private router: Router) {}

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

  corregirHojaDeVida(hojaDeVida: HojaDeVidaDto) {
    this.integradorService.corregirHojaDeVida(hojaDeVida).subscribe({
      next: (event) => {
        this.alertSucces(event.message);
      },
      error: (error) => console.error(error),
    });
  }

  handleCargarFile(file: File): void {
    console.log(file);
    this.integradorService.cargarHojaDeVida(file).subscribe({
      next: (hojaDeVidaResponse) => {
        if (hojaDeVidaResponse != null) {
          this.hojaDeVida = hojaDeVidaResponse;
          this.alertSucces("Archivo cargado correctamente");
          this.mostrarConfirmacion();
        }
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
  
  mostrarConfirmacion(): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¡Felicitaciones! Ahora puedes generar tu primera entrevista.",
      text: "¿Quieres que te redireccionemos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      reverseButtons: true
    }).then((result: { isConfirmed: any; dismiss: any; }) => {
      if (result.isConfirmed) {
        this.router.navigate(['/es/entrevistas/zona-entrevista']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Operación cancelada",
          text: "Podrás generar entrevistas en Zona entrevistas",
          icon: "info"
        });
      }
    });
  }

}
