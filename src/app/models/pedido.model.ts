export interface Pedido {
    id: number;
    cliente: string;
    email: string;
    telefono: string;
    fecha: Date;
    estado: string;
    metodoPago: string;
    monto: number;
    tipoRetiro: string;
  }