import { useParams, useNavigate } from 'react-router-dom';
import { NewStudent, useCreateStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation } from '../state/api';
import { useEffect, useState } from 'react';
import '../style/StudentForm.css';  // Agrega este archivo para estilos

interface StudentFormProps {
  onSuccess?: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSuccess }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();  // Para redirigir
  const { data: studentToEdit, isLoading } = useGetStudentByIdQuery(id || '');

  const [createStudent] = useCreateStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const [formData, setFormData] = useState<NewStudent>({
    nombre: '',
    apellido: '',
    edad: undefined,
    correo: '',
    telefono: undefined,
    direccion: '',
    fecha_nacimiento: undefined,
    genero: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        nombre: studentToEdit.nombre,
        apellido: studentToEdit.apellido,
        edad: studentToEdit.edad,
        correo: studentToEdit.correo,
        telefono: studentToEdit.telefono,
        direccion: studentToEdit.direccion,
        fecha_nacimiento: studentToEdit.fecha_nacimiento ? new Date(studentToEdit.fecha_nacimiento) : undefined,
        genero: studentToEdit.genero,
      });
    }
  }, [studentToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });  // Limpiar error si el usuario corrige el campo
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellido) newErrors.apellido = 'El apellido es obligatorio';
    if (!formData.correo) newErrors.correo = 'El correo es obligatorio';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (id) {
        await updateStudent({ id, updatedStudent: formData }).unwrap();
        alert('Estudiante actualizado exitosamente');
      } else {
        await createStudent(formData).unwrap();
        alert('Estudiante creado exitosamente');
      }
      if (onSuccess) onSuccess();
      navigate('/');  // Redirigir a la lista de estudiantes
    } catch (err) {
      console.error('Error al procesar estudiante:', err);
    }
  };

  const handleCancel = () => {
    navigate('/');  // Redirigir a la lista de estudiantes sin guardar cambios
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        {errors.nombre && <span className="error">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        {errors.apellido && <span className="error">{errors.apellido}</span>}
      </div>

      <div className="form-group">
        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        {errors.correo && <span className="error">{errors.correo}</span>}
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento ? formData.fecha_nacimiento.toISOString().substring(0, 10) : ''}
          onChange={(e) => setFormData({ ...formData, fecha_nacimiento: new Date(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label>Género:</label>
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={formData.genero}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn submit-btn">{id ? 'Actualizar Estudiante' : 'Crear Estudiante'}</button>
        <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default StudentForm;