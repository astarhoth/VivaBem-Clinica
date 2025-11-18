import mysql from "mysql2";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "viverbem",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// teste inicial da conexão
db.getConnection((err, conn) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
    conn.release();
  }
});
