import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import type { IIssueQuery, Issue } from "./issues.interface";
import AppError from "../../utils/AppError";
import { USER_ROLES } from "../../interface";

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

  async updateIssue(user: JwtPayload, payload: Partial<Issue>, id: string) {
    const issues = await pool.query(
      `
        SELECT * 
        FROM issues 
        WHERE id=$1
      `,
      [id],
    );

    const issuesData = issues.rows[0];

    if (!issuesData) {
      throw new AppError(404, "Issues is not Found!");
    }

    console.log(
      "USER_ROLES.contributor === user.role",
      USER_ROLES.contributor === user.role,
    );
    console.log("user.id", user.id);
    console.log("issuesData.reporter_id", issuesData.reporter_id);
    console.log(user.id !== issuesData.reporter_id);

    if (
      USER_ROLES.contributor === user.role &&
      user.id !== issuesData.reporter_id
    ) {
      throw new AppError(403, "Forbidden You Don't have Permission!");
    }

    const { title, description, type, status } = payload;

    const result = await pool.query(
      `
        UPDATE issues 
        SET
        title=COALESCE($1, title),
        description=COALESCE($2, description),
        type=COALESCE($3, type),
        status=COALESCE($4, status)

        WHERE id=$5
        RETURNING *
      `,
      [title, description, type, status, id],
    );

    return result.rows[0];
  }

  async deleteIssue(id: string) {
    const issues = await pool.query(
      `
        DELETE FROM issues
        WHERE id=$1
      `,
      [id],
    );

    return issues;
  }
}

export default new IssuesService();
