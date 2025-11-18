import { db } from "../config/db.js";

export const gerarSenha = (req, res) => {
  const { tipo } = req.body;

  if (!tipo) {
    return res.status(400).json({ error: "O tipo é obrigatório" });
  }

  const codigo = tipo + "-" + Math.floor(Math.random() * 900 + 100);

  db.query(
    "INSERT INTO senhas (codigo, tipo, status) VALUES (?, ?, 'aguardando')",
    [codigo, tipo],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ codigo });
    }
  );
};

export const atualizarStatus = (req, res) => {
  const { codigo, status } = req.body;

  db.query(
    "UPDATE senhas SET status=? WHERE codigo=?",
    [status, codigo],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status atualizado" });
    }
  );
};

export const chamarSenha = (req, res) => {
  const { guiche } = req.query;

  db.query(
    "SELECT * FROM senhas WHERE status='aguardando' ORDER BY created_at LIMIT 1",
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.json({ message: "Nenhuma senha disponível" });
      }

      const senha = results[0];

      db.query(
        "UPDATE senhas SET status='atendida', guiche=? WHERE codigo=?",
        [guiche, senha.codigo],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.json({ chamada: senha });
        }
      );
    }
  );
};
