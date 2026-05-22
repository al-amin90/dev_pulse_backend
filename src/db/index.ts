import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(50) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role VARCHAR(20) DEFAULT 'contributor' NOT NULL,

          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),

          CONSTRAINT chk_role CHECK (role in ('contributor', 'maintainer'))
        )
      `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
          id SERIAL PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          description TEXT NOT NULL,
          type VARCHAR(20) NOT NULL,
          status VARCHAR(15) DEFAULT 'open' NOT NULL,
          reporter_id INT NOT NULL,

          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),

          CONSTRAINT chk_type CHECK (type in ('bug', 'feature_request')),
          CONSTRAINT chk_status CHECK (status in ('open', 'in_progress','resolved')),
          CONSTRAINT chk_description_length CHECK (LENGTH(description) >=20 )
        )
      `);

    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
