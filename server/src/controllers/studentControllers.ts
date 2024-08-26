// src/controllers/studentsController.ts
import { Request, Response } from "express";
import { Student } from "../models/studens";

// Simulación de base de datos en memoria
let students: Student[] = [];
let currentId = 1; // Para simular un autoincremento

// Crear un nuevo estudiante
export const createStudent = (req: Request, res: Response): void => {
  const { nombre, apellido, edad, correo, telefono, direccion, fecha_nacimiento, genero } = req.body;

  // Crear un nuevo estudiante con un ID único
  const newStudent: Student = {
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

// Obtener todos los estudiantes
export const getAllStudents = (req: Request, res: Response): void => {
  res.json(students);
};

// Obtener un estudiante por ID
export const getStudentById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const student = students.find((s) => s.id === parseInt(id));

  if (!student) {
    res.status(404).json({ message: "Estudiante no encontrado" });
    return;
  }

  res.json(student);
};

// Actualizar un estudiante por ID
export const updateStudent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { nombre, apellido, edad, correo, telefono, direccion, fecha_nacimiento, genero } = req.body;

  const studentIndex = students.findIndex((s) => s.id === parseInt(id));

  if (studentIndex === -1) {
    res.status(404).json({ message: "Estudiante no encontrado" });
    return;
  }

  // Actualizar los datos del estudiante
  students[studentIndex] = {
    ...students[studentIndex],
    nombre,
    apellido,
    edad,
    correo,
    telefono,
    direccion,
    fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : students[studentIndex].fecha_nacimiento,
    genero
  };

  res.json(students[studentIndex]);
};

// Eliminar un estudiante por ID
export const deleteStudent = (req: Request, res: Response): void => {
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