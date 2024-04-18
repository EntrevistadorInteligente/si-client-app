export class HojaDeVidaDto{
    nombre: string;
    perfil: string;
    seniority: string;
    tecnologiasPrincipales: Array<string>;
    experienciasLaborales: Array<string>;
    habilidadesTecnicas: Array<string>;
    certificaciones: Array<string>;
    proyectos: Array<string>;
    nivelIngles: string;
    otrasHabilidades: Array<string>;

    constructor(
        nombre: string = "",
        perfil: string = "",
        seniority: string = "",
        tecnologiasPrincipales: Array<string> = [],
        experienciasLaborales: Array<string> = [],
        habilidadesTecnicas: Array<string> = [],
        certificaciones: Array<string> = [],
        proyectos: Array<string> = [],
        nivelIngles: string = "",
        otrasHabilidades: Array<string> = []
    ){
        this.nombre = nombre;
        this.perfil = perfil;
        this.seniority = seniority;
        this.tecnologiasPrincipales = tecnologiasPrincipales;
        this.experienciasLaborales = experienciasLaborales;
        this.habilidadesTecnicas = habilidadesTecnicas;
        this.certificaciones = certificaciones;
        this.proyectos = proyectos;
        this.nivelIngles = nivelIngles;
        this.otrasHabilidades = otrasHabilidades;
    }
}