export class FormularioDto {
    empresa: string;
    perfil: string;
    seniority: string;
    pais: string;
    descripcionVacante:string
    constructor(
        empresa: string = '',
        perfil: string = '',
        seniority: string = '',
        pais: string = '',
        descripcionVacante: string = '') {
        this.empresa = empresa;
        this.perfil = perfil;
        this.seniority = seniority;
        this.pais = pais;
        this.descripcionVacante = descripcionVacante;
    }
}
