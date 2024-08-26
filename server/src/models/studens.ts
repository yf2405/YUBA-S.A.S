export interface Student {
    id: number;
    nombre: string;
    apellido: string;
    edad?: number; 
    correo: string;
    telefono?: string; 
    direccion?: string; 
    fecha_nacimiento?: Date; 
    genero?: string; 
  }