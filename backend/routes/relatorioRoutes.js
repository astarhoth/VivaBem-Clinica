import express from "express";
import { relatorioDiario } from "../controllers/relatorioController.js";

const router = express.Router();

router.get("/diario", relatorioDiario);

export default router;
