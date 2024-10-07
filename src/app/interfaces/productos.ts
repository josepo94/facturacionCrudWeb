import { Impuesto } from './impuesto';
import { Proveedor } from './proveedorP';
export interface Productos {
nombre: String,
descripcion: string,
precio : number,
proveedor: Proveedor,
impuesto: Impuesto
}

