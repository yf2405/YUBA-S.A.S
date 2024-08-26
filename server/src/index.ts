import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.use("/", studentRoutes);

const PORT = Number(process.env.PORT)|| 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});