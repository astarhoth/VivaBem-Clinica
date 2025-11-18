import { db } from "../config/db.js";

export const relatorioDiario = (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Data não informada" });
  }

  const resumoQuery = `
    SELECT 
      COUNT(*) AS total_emitidas,
      SUM(status='atendida') AS total_atendidas
    FROM senhas
    WHERE DATE(created_at) = ?
  `;

  const detalhesQuery = `
    SELECT codigo, tipo, status, guiche, created_at
    FROM senhas
    WHERE DATE(created_at) = ?
  `;

  db.query(resumoQuery, [date], (err, resumo) => {
    if (err) return res.status(500).json(err);

    db.query(detalhesQuery, [date], (err2, detalhes) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        total_emitidas: resumo[0].total_emitidas,
        total_atendidas: resumo[0].total_atendidas,
        detalhe: detalhes
      });
    });
  });
};
