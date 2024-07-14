import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { HojaDeVidaDto } from "src/app/shared/model/hoja-de-vida-dto";
import {
  Certificaciones,
  ExperienciasLaborales,
  HabilidadesTecnicas,
  OtrasHabilidades,
  Proyectos,
  TecnologiasPrincipales,
} from "src/app/shared/model/interfaces-perfil";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.scss",
})
export class EditProfileComponent {
  @Input() hojaDeVida: HojaDeVidaDto;
  @Output() EnviarhojaDeVida = new EventEmitter<HojaDeVidaDto>();
  hojaDeVidaDto = new HojaDeVidaDto();
  hojaDeVidaExist: boolean = false;
  perfilForm: FormGroup = new FormGroup({});
  private subscriptions: Subscription[] = [];
  estaEditado: boolean = false;

  ngOnInit() {
    this.inicializarHojaDeVida();
    this.subscriptions.push(
      this.perfilForm.valueChanges.subscribe((val) => {
        this.estaEditado = true;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hojaDeVida"] && changes["hojaDeVida"].currentValue) {
      this.normalizarHojaDeVida();
    } else {
      console.log("HojaDeVidaDto no recibido o vacío.");
    }
  }

  private normalizarHojaDeVida() {
    this.hojaDeVidaDto.uuid = this.hojaDeVida.uuid ?? "";
    this.hojaDeVidaDto.nombre = this.hojaDeVida.nombre ?? "";
    this.hojaDeVidaDto.perfil = this.hojaDeVida.perfil ?? "";
    this.hojaDeVidaDto.seniority = this.hojaDeVida.seniority ?? "";
    this.hojaDeVidaDto.tecnologiasPrincipales =
      this.hojaDeVida.tecnologiasPrincipales ?? [];
    this.hojaDeVidaDto.experienciasLaborales =
      this.hojaDeVida.experienciasLaborales ?? [];
    this.hojaDeVidaDto.habilidadesTecnicas =
      this.hojaDeVida.habilidadesTecnicas ?? [];
    this.hojaDeVidaDto.certificaciones = this.hojaDeVida.certificaciones ?? [];
    this.hojaDeVidaDto.proyectos = this.hojaDeVida.proyectos ?? [];
    this.hojaDeVidaDto.nivelIngles = this.hojaDeVida.nivelIngles ?? "";
    this.hojaDeVidaDto.otrasHabilidades =
      this.hojaDeVida.otrasHabilidades ?? [];
    this.inicializarHojaDeVida();
  }

  private inicializarHojaDeVida() {
    this.perfilForm = new FormGroup({
      nombre: new FormControl<string | null>(this.hojaDeVidaDto.nombre),
      perfil: new FormControl<string | null>(this.hojaDeVidaDto.perfil),
      seniority: new FormControl<string | null>(this.hojaDeVidaDto.seniority),
      tecnologiaAgregar: new FormControl<string | null>(""),
      tecnologiasPrincipales: new FormControl<TecnologiasPrincipales[] | null>(
        this.hojaDeVidaDto.tecnologiasPrincipales.map((value) => {
          return { name: value };
        })
      ),
      experienciaLaboralAgregar: new FormControl<string | null>(""),
      experienciasLaborales: new FormControl<ExperienciasLaborales[] | null>(
        this.hojaDeVidaDto.experienciasLaborales.map((value) => {
          return { name: value };
        })
      ),
      habilidadAgregar: new FormControl<string | null>(""),
      habilidadesTecnicas: new FormControl<HabilidadesTecnicas[] | null>(
        this.hojaDeVidaDto.habilidadesTecnicas.map((value) => {
          return { name: value };
        })
      ),
      certificacionAgregar: new FormControl<string | null>(""),
      certificaciones: new FormControl<Certificaciones[] | null>(
        this.hojaDeVidaDto.certificaciones.map((value) => {
          return { name: value };
        })
      ),
      proyectoAgregar: new FormControl<string | null>(""),
      proyectos: new FormControl<Proyectos[] | null>(
        this.hojaDeVidaDto.proyectos.map((value) => {
          return { name: value };
        })
      ),
      nivelIngles: new FormControl<string | null>(
        this.hojaDeVidaDto.nivelIngles
      ),
      otraHabilidadAgregar: new FormControl<string | null>(""),
      otrasHabilidades: new FormControl<OtrasHabilidades[] | null>(
        this.hojaDeVidaDto.otrasHabilidades.map((value) => {
          return { name: value };
        })
      ),
    });
    this.hojaDeVidaExist = true;
  }

  handleClickCorregir(): void {
    if (this.estaEditado) {
      this.hojaDeVidaDto.nombre = this.perfilForm?.get("nombre")?.value || "";
      this.hojaDeVidaDto.perfil = this.perfilForm?.get("perfil")?.value || "";
      this.hojaDeVidaDto.seniority =
        this.perfilForm?.get("seniority")?.value || "";
      this.hojaDeVidaDto.tecnologiasPrincipales =
        this.perfilForm
          ?.get("tecnologiasPrincipales")
          ?.value.map((value: any) => value.name) || [];
      this.hojaDeVidaDto.experienciasLaborales =
        this.perfilForm
          ?.get("experienciasLaborales")
          ?.value.map((value: any) => value.name) || [];
      this.hojaDeVidaDto.habilidadesTecnicas =
        this.perfilForm
          ?.get("habilidadesTecnicas")
          ?.value.map((value: any) => value.name) || [];
      this.hojaDeVidaDto.certificaciones =
        this.perfilForm
          ?.get("certificaciones")
          ?.value.map((value: any) => value.name) || [];
      this.hojaDeVidaDto.proyectos =
        this.perfilForm
          ?.get("proyectos")
          ?.value.map((value: any) => value.name) || [];
      this.hojaDeVidaDto.nivelIngles =
        this.perfilForm?.get("nivelIngles")?.value || "";
      this.hojaDeVidaDto.otrasHabilidades =
        this.perfilForm
          ?.get("otrasHabilidades")
          ?.value.map((value: any) => value.name) || [];

      this.EnviarhojaDeVida.emit(this.hojaDeVidaDto);
      this.estaEditado = false;
    }
  }

  onItemsChange(event: { field: string; items: any[] }) {
    this.perfilForm.get(event.field)?.setValue(event.items);
    console.log(
      "itemsform: " + JSON.stringify(this.perfilForm.get(event.field)?.value)
    );
  }
}
