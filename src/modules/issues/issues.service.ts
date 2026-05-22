import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import type { Issue } from "./issues.interface";
import AppError from "../../utils/AppError";

class IssuesService {
  async createIssues(payload: Issue) {
    const { title, description, type, reporter_id } = payload;

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

  async getSingleIssue(id: string) {
    const issues = await pool.query(
      `
        SELECT * FROM issues WHERE id=($1)
      `,
      [id],
    );

    const result = issues.rows[0];

    if (!result) {
      throw new AppError(404, "Issues is not Found!");
    }

    const user = await pool.query(
      `
        SELECT id,name,role FROM users WHERE id=($1)
      `,
      [result.reporter_id],
    );

    if (!user.rows[0]) {
      throw new AppError(404, "User not Found!");
    }

    delete result.reporter_id;
    result.reporter = user.rows[0];

    return result;
  }
}

export default new IssuesService();
