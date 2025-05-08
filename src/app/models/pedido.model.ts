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
    codigoSeguimiento: string;
    numeroGuia: string;
    producto: string;
    cantidad: string;
    fechaCreacion: string;
  }

  export interface DocumentoPedido {
    id: number;
    nombreArchivo: string;
    tipoContenido: string;
    contenido?: any; // Opcional en frontend, normalmente no se usa directamente
    tipoDocumento: 'COMPROBANTE' | 'FACTURA' | 'OTRO';
    fechaCreacion: Date | string;
    pedidoId: number;
    tamano?: number; // Opcional: tamaño en bytes
  }
  
  // Opcional: Enum para tipos de documento
  export enum TipoDocumento {
    COMPROBANTE = 'COMPROBANTE',
    FACTURA = 'FACTURA',
    OTRO = 'OTRO'
  }