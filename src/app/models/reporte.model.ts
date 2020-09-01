export class Reporte {

    constructor(
        public anio?: number,
        public cedula?: string,
        public clave?: string,
        public nombre?: string,
        public ruc?: string,
        public totalEg?: number,
        public totalIng?: number,
        public totalRet?: number,
        public cliente?: string,
        public sueldos?: number,
        public actEmpresariales?: number,
        public actRelDep?: number,
        public apPersonal?: number,
        public ingRendimientos?: number,
        public subBImponible?: number,
        public gPersonales?: number,
        public gPersonalesPro?: number,
        public educacion?: number,
        public salud?: number,
        public alimentacion?: number,
        public vivienda?: number,
        public vestimenta?: number,
        public bimponibleGeneral?: number,

        public fExcedente?: number,
        public fBasica?: number,
        public iRentaC?: number,
        public retRelacionD?: number,
        public retRendimiento?: number,
        public creditoT?: number,
        public iRentaFavor?: number,
        
        public _id?: string
        
    ) { }
}
