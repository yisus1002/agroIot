export class gasto{
    idGasto?:number;
    costo: number;
    cantidad: number;
    descripcion: string;
    tipo: string;

    constructor(
        idGasto:number,
        costo: number,
        cantidad: number,
        descripcion: string,
        tipo: string,
    ){ 
        this.idGasto=idGasto;
        this.costo=costo;
        this.cantidad=cantidad;
        this.descripcion=descripcion;
        this.tipo=tipo;
    } 
}
