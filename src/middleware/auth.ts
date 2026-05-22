import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { USER_ROLES } from "../interface";
import AppError from "../utils/AppError";

const auth = (...roles: (keyof typeof USER_ROLES)[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, "Invalid Token!");
      }

      const decoded = jwt.verify(
        token as string,
        config.jwt_secret,
      ) as JwtPayload;

      const userData = await pool.query(
        `
            SELECT * FROM users WHERE id=$1
        `,
        [decoded.id],
      );

      const user = userData.rows[0];

      if (userData.rows.length === 0) {
        throw new AppError(404, "User Not found!");
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new AppError(403, "Forbidden! This role not have access!");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
