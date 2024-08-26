"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.createStudent = void 0;
// Simulación de base de datos en memoria
let students = [];
let currentId = 1; // Para simular un autoincremento
// Crear un nuevo estudiante
const createStudent = (req, res) => {
    const { nombre, apellido, edad, correo, telefono, direccion, fecha_nacimiento, genero } = req.body;
    // Crear un nuevo estudiante con un ID único
    const newStudent = {
        id: currentId++,
        nombre,
        apellido,
        edad,
        correo,
        telefono,
        direccion,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
        genero
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
};
exports.createStudent = createStudent;
// Obtener todos los estudiantes
const getAllStudents = (req, res) => {
    res.json(students);
};
exports.getAllStudents = getAllStudents;
// Obtener un estudiante por ID
const getStudentById = (req, res) => {
    const { id } = req.params;
    const student = students.find((s) => s.id === parseInt(id));
    if (!student) {
        res.status(404).json({ message: "Estudiante no encontrado" });
        return;
    }
    res.json(student);
};
exports.getStudentById = getStudentById;
// Actualizar un estudiante por ID
const updateStudent = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, correo, telefono, direccion, fecha_nacimiento, genero } = req.body;
    const studentIndex = students.findIndex((s) => s.id === parseInt(id));
    if (studentIndex === -1) {
        res.status(404).json({ message: "Estudiante no encontrado" });
        return;
    }
    // Actualizar los datos del estudiante
    students[studentIndex] = Object.assign(Object.assign({}, students[studentIndex]), { nombre,
        apellido,
        edad,
        correo,
        telefono,
        direccion, fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : students[studentIndex].fecha_nacimiento, genero });
    res.json(students[studentIndex]);
};
exports.updateStudent = updateStudent;
// Eliminar un estudiante por ID
const deleteStudent = (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex((s) => s.id === parseInt(id));
    if (studentIndex === -1) {
        res.status(404).json({ message: "Estudiante no encontrado" });
        return;
    }
    // Eliminar el estudiante
    students.splice(studentIndex, 1);
    res.status(204).send();
};
exports.deleteStudent = deleteStudent;
