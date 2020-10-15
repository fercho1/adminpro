export class Factura {

    constructor(
        public tipo?: string,
        public numFactura?: string,
        public fecha?: string,
        public concepto?: string,
        public bImponible0?: number,
        public bImponible?: number,
        public liquidacion?: number,
        public varIr?: number,
        public varIva?: number,
        public iva?: number,
        public total?: number,
        
        public cbte?: string,
        public agnt?: string,
        public retIr?: number,
        public retIva?: number,
        public total2?: number,
        public img?: string,
        public usuario?: string,
        public cliente?: string,
        public _id?: string,
        
    ) { }
}
