export class Usuario{
    idPequeñoProductor?:number;
    nombre2?: string;
    apellido2?: string;
    nombre1: string;
    apellido1: string;
    correo: string;
    contraseña:any;
    
    constructor(
        idPequeñoProductor:number,
        nombre2: string,
        apellido2: string,
        nombre1: string,
        correo: string,
        apellido1: string,
        contraseña:any,
    ){
        this.nombre1=nombre1;
        this.apellido1=apellido1;
        this.apellido2=apellido2;
        this.correo=correo;
        this.contraseña=contraseña;
        this.nombre2=nombre2;
        this.idPequeñoProductor=idPequeñoProductor;
    }
}