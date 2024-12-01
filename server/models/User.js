const db = require("../db");

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;
  await db.execute(query);
};

const createUser = async (name, email, password) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(query, [name, email, password]);
  return result;
};

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  return rows[0];
};

module.exports = {
  createTable,
  createUser,
  findUserByEmail,
};
