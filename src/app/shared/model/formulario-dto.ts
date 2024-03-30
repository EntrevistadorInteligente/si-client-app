export class FormularioDto {
    empresa: string;
    perfil: string;
    seniority: string;
    pais: string;
    constructor(
        empresa: string = '',
        perfil: string = '',
        seniority: string = '',
        pais: string = '') {
        this.empresa = empresa;
        this.perfil = perfil;
        this.seniority = seniority;
        this.pais = pais;
    }
}
