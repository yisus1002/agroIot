export interface IotResponse {
    idCultivo:     number;
    hectareas:     number;
    descripcion:   string;
    fecha_siembre: Date;
    creteadAt:     Date;
    updatedAt:     Date;
    deletedAt:     null;
    iots:          Iot[];
}

export interface Iot {
    idIot:       number;
    temperatura: number;
    humedad:     number;
    ph:          number;
    creteadAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
}

export interface RegistroResponse {
    idInforme:           number;
    temperaturaMinima:   number;
    temperaturaPromedio: number;
    temperaturaMaxima:   number;
    humedadMinima:       number;
    humedadPromedio:     number;
    humedadMaxima:       number;
    phMinimo:            number;
    phPromedio:          number;
    phMaximo:            number;
    createdAt:           Date;
    updatedAt:           Date;
    deletedAt:           null;
}
