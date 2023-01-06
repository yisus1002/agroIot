export interface CultivoResponse {
  idCultivo:     number;
  hectareas:     number;
  descripcion:   string;
  fecha_siembre: Date;
  creteadAt:     Date;
  updatedAt:     Date;
  deletedAt:     null;
  vereda:        Vereda;
  iots:          Iot[];
  informes:      Informe[];
}

export interface Informe {
  idInforme?:           number;
  humedadPromedio?:     number;
  temperaturaPromedio?: number;
  phPromedio?:          number;
  temperaturaMinima:   number;
  temperaturaMaxima:   number;
  humedadMinima:       number;
  humedadMaxima:       number;
  phMinimo:            number;
  phMaximo:            number;
  createdAt?:           Date;
  updatedAt?:           Date;
  deletedAt?:           null;
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

export interface Vereda {
  idVereda:  number;
  nombre:    string;
  creteadAt: Date;
  updatedAt: Date;
  municipio: Municipio;
}

export interface Municipio {
  idMunicipio:  number;
  nombre:       string;
  creteadAt:    Date;
  updatedAt:    Date;
  departamento: Departamento;
}

export interface Departamento {
  idDepartamento: number;
  nombre:         string;
  creteadAt:      Date;
  updatedAt:      Date;
}

// ---------------------------------------------

export interface Cultivo {
  idCultivo:         number;
  hectareas:         number;
  descripcion:       string;
  fecha_siembre:     Date;
  creteadAt:         Date;
  updatedAt:         Date;
  deletedAt:         null;
  pequeño_productor: PequeñoProductor;
  vereda:            Vereda;
  gastos:            Gasto[];
  iots:              Iot[];
  informes:          InformeActualResponse[];
}

export interface InformeActualResponse {
  temperaturaMinima:   number;
  temperaturaPromedio: number;
  temperaturaMaxima:   number;
  humedadMinima:       number;
  humedadPromedio:     number;
  humedadMaxima:       number;
  phMinimo:            number;
  phPromedio:          number;
  phMaximo:            number;
  cultivo?:            Cultivo;
  deletedAt:           null;
  idInforme:           number;
  createdAt:           Date;
  updatedAt:           Date;
}

export interface Gasto {
  idGasto:     number;
  tipo:        string;
  cantidad:    number;
  descripcion: string;
  costo:       number;
  creteadAt:   Date;
  updatedAt:   Date;
  deletedAt:   null;
}



export interface PequeñoProductor {
  idPequeñoProductor: number;
  nombre1:            string;
  nombre2:            string;
  apellido1:          string;
  apellido2:          string;
  correo:             string;
  contraseña:         string;
  creteadAt:          Date;
  updatedAt:          Date;
  deletedAt:          null;
}
