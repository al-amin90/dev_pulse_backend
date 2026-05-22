import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import type { Issue } from "./issues.interface";

class IssuesService {
  async createIssues(payload: Issue) {
    const { title, description, type } = payload;

    const reporter_id = 6;

    const result = await pool.query(
      `
        INSERT INTO issues (title, description, type, reporter_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      [title, description, type, reporter_id],
    );

    return result.rows[0];
  }

  async loginUserIntoDB(payload: { email: string; password: string }) {
    const { email, password } = payload;

    const userData = await pool.query(
      `
      SELECT * FROM users WHERE email=$1

    `,
      [email],
    );

    if (userData.rows.length === 0) {
      throw new Error("User Not Found!");
    }

    const user = userData.rows[0];

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      throw new Error("Invalid Password!");
    }

    // Generate Token
    const jwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {
      expiresIn: "356d",
    });

    delete user.password;

    return { accessToken, refreshToken, user };
  }
}

export default new IssuesService();
