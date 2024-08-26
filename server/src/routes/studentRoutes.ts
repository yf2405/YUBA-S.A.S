import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from "../controllers/studentControllers";

const router = Router();

// Definir las rutas y asignarlas a los controladores correspondientes
router.post("/estudiantes", createStudent);
router.get("/estudiantes", getAllStudents);
router.get("/estudiantes/:id", getStudentById);
router.put("/estudiantes/:id", updateStudent);
router.delete("/estudiantes/:id", deleteStudent);

export default router;