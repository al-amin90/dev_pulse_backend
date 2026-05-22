import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import type { IIssueQuery, Issue } from "./issues.interface";
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

  async getIssues(query: IIssueQuery) {
    const { sort, type, status } = query;

    // filter data dynamic store
    const conditions = [];
    const values = [];
    let index = 1;

    if (type) {
      conditions.push(`type = $${index++}`);
      values.push(type);
    }

    if (status) {
      conditions.push(`status = $${index++}`);
      values.push(status);
    }

    const condition =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const order = sort === "oldest" ? "ASC" : "DESC";

    const issues = await pool.query(
      `
        SELECT * 
        FROM issues 
        ${condition}
        ORDER BY created_at ${order}
      `,
      values,
    );

    const reporterIds = [...new Set(issues.rows.map((i) => i.reporter_id))];

    if (reporterIds.length === 0) return [];

    const placeholder = reporterIds.map((_, i) => `$${i + 1}`).join(",");

    // find user dynamickly
    const users = await pool.query(
      `
        SELECT id,name,role 
        FROM users 
        WHERE id IN (${placeholder})
      `,
      reporterIds,
    );

    const reporterMap = new Map(users.rows.map((user) => [user.id, user]));

    // merge user info to reporter
    const result = issues.rows.map((i) => {
      const { reporter_id, ...rest } = i;

      rest.reporter = reporterMap.get(reporter_id);

      return rest;
    });

    return result;
  }

  async getSingleIssue(id: string) {
    const issues = await pool.query(
      `
        SELECT * FROM issues WHERE id=$1
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
