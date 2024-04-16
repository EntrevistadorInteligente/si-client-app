import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioDto } from '@shared/model/formulario-dto';
import { VistaPreviaEntrevistaDto } from '@shared/model/vista-previa-entrevista-dto';
import { IntegradorService } from '@shared/service/integrador.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})

export class HomeLoginComponent implements OnInit {

  preguntas!: VistaPreviaEntrevistaDto[];
  selectedProduct!: any;
  form: FormGroup;
  message: string = 'Bienvenid@ al Entrevistador Inteligente';

  constructor(private integradorService: IntegradorService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      empresa: ['', Validators.required],
      perfil: ['', Validators.required],
      seniority: ['', Validators.required],
      pais: ['', Validators.required],
      descripcionVacante: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formulario: FormularioDto = {
        empresa: this.form.value.empresa,
        perfil: this.form.value.perfil,
        seniority: this.form.value.seniority,
        pais: this.form.value.pais,
        descripcionVacante: this.form.value.descripcionVacante
      };
      this.integradorService.crearSolicitudEntrevista(formulario).subscribe(
          data => {
            this.preguntas = data;
          },
          err => console.log(err)
        );
    } else {
      console.log("MAL")
      console.log(this.form)
    }
  }
}
