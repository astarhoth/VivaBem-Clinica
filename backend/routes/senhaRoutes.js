import express from "express";
import {
  gerarSenha,
  atualizarStatus,
  chamarSenha
} from "../controllers/senhaController.js";

const router = express.Router();

router.post("/gerar", gerarSenha);
router.put("/status", atualizarStatus);
router.get("/chamar", chamarSenha);

export default router;
