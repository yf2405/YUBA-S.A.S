import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  export interface NewStudent {
    nombre: string;
    apellido: string;
    edad?: number; 
    correo: string;
    telefono?: string; 
    direccion?: string; 
    fecha_nacimiento?: Date ;  
    genero?: string; 
  }
  // Configuración del servicio API con tipado
export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:5000' }),
    tagTypes: ['Students'],
    endpoints: (build) => ({
      getAllStudents: build.query<Student[], void>({
        query: () => '/estudiantes',
        providesTags: ['Students'],
      }),
      getStudentById: build.query<Student, string>({
        query: (id) => `/estudiantes/${id}`,
        providesTags: ['Students'],
      }),
      createStudent: build.mutation<Student, NewStudent>({
        query: (newStudent) => ({
          url: '/estudiantes',
          method: 'POST',
          body: newStudent,
        }),
        invalidatesTags: ['Students'],
      }),
      updateStudent: build.mutation<Student, { id: string; updatedStudent: Partial<Student> }>({
        query: ({ id, updatedStudent }) => ({
          url: `/estudiantes/${id}`,
          method: 'PUT',
          body: updatedStudent,
        }),
        invalidatesTags: ['Students'],
      }),
      deleteStudent: build.mutation<void, string>({
        query: (id) => ({
          url: `/estudiantes/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Students'],
      }),
    }),
  });
  
  // Exporta los hooks generados automáticamente con tipado
  export const {
    useGetAllStudentsQuery,
    useGetStudentByIdQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
  } = studentsApi;