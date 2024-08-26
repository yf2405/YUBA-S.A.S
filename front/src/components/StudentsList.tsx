import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, useGetAllStudentsQuery, useDeleteStudentMutation } from '../state/api';
import '../style/StudentsList.css';

const StudentsList: React.FC = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const { data: students, error, isLoading } = useGetAllStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
      try {
        await deleteStudent(id).unwrap();
        alert("Estudiante eliminado exitosamente");
      } catch (err) {
        console.error("Error al eliminar estudiante:", err);
        alert("Hubo un problema al eliminar el estudiante");
      }
    }
  };

  const handleEdit = (id: number) => {
    // Redirige al usuario al formulario de edición con el ID del estudiante
    navigate(`/students/${id}/edit`); 
  };
  const handleNew =  () => {
    // Redirige al usuario al formulario de edición con el ID del estudiante
    navigate(`/students/new`); 
  };
  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.toString()}</div>;

  return (
    <div>
        <button className='btn' onClick={handleNew}>create </button>
   
    <div className="students-container">
      <h1 className="title">Lista de Estudiantes</h1>
      <table className="students-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Edad</th>
            <th>Fecha de Nacimiento</th>
            <th>Género</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student: Student) => (
            <tr key={student.id}>
              <td>{student.nombre}</td>
              <td>{student.apellido}</td>
              <td>{student.correo}</td>
              <td>{student.direccion}</td>
              <td>{student.edad}</td>
              <td>{student.fecha_nacimiento?.toString().substring(0, 10)}</td>
              <td>{student.genero}</td>
              <td>{student.telefono}</td>
              <td className='btn'>
                <button className="btn edit-btn" onClick={() => handleEdit(student.id)}>Editar</button>
                <button className="btn delete-btn" onClick={() => handleDelete(student.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </div>
  );
};


export default StudentsList;