export const environment = {
    production: true,
    //apiUrl: 'http://161.97.160.167:3215/api/', // Ajusta el puerto según tu backend .NET
    apiUrl: 'https://localhost:7140/api/', // Ajusta el puerto según tu backend .NET
    // Configuraciones adicionales    
    maxFileSize: 20971520, // 20MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    Pedidos: 'Pedidos',
    documentos:'documentos',
    subircomprobante:'subircomprobante',
    descargar:'descargar',
    actualizarguia:'actualizarguia',
    actualizarfactura:'actualizarfactura',
    porcodigo: 'por-codigo/',
    porguia: 'por-guia/',
    porcliente: 'por-cliente/',
    condocumentos: 'con-documentos',
  };