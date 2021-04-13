import { Concepto } from '../models/concepto.model';

export interface CargarConcepto {
    total: number;
    conceptos: Concepto[];
}