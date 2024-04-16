export class HojaDeVidaDto{
    username: string;
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
        username: string = "",
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
        this.username = username;
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