"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentControllers_1 = require("../controllers/studentControllers");
const router = (0, express_1.Router)();
// Definir las rutas y asignarlas a los controladores correspondientes
router.post("/estudiantes", studentControllers_1.createStudent);
router.get("/estudiantes", studentControllers_1.getAllStudents);
router.get("/estudiantes/:id", studentControllers_1.getStudentById);
router.put("/estudiantes/:id", studentControllers_1.updateStudent);
router.delete("/estudiantes/:id", studentControllers_1.deleteStudent);
exports.default = router;
