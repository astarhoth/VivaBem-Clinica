import express from "express";
import cors from "cors";
import senhaRoutes from "./routes/senhaRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/senhas", senhaRoutes);
app.use("/api/relatorios", relatorioRoutes);

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
