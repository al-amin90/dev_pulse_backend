import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import type { IUser } from "./auth.interface";

class AuthService {
  async createUser(payload: IUser) {
    const { name, email, password, role } = payload;

    const result = await pool.query(
      `
        INSERT INTO users (name, email, password, role)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      [name, email, password, role],
    );

    return result.rows[0];
  }
}

// const loginUserIntoDB = async (payload: {
//   email: string;
//   password: string;
// }) => {
//   console.log("payload", payload);
//   const { email, password } = payload;

//   const userData = await pool.query(
//     `
//       SELECT * FROM users WHERE email=$1

//     `,
//     [email],
//   );

//   if (userData.rows.length === 0) {
//     throw new Error("Invalid Credential!");
//   }

//   const user = userData.rows[0];

//   const matchPassword = await bcrypt.compare(password, user.password);

//   if (!matchPassword) {
//     throw new Error("Invalid Credential!");
//   }

//   // Generate Token
//   const jwtPayload = {
//     id: user.id,
//     name: user.name,
//     isActive: user.is_active,
//     email: user.email,
//   };

//   const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
//     expiresIn: "1d",
//   });

//   const refreshToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
//     expiresIn: "356d",
//   });

//   return { accessToken, refreshToken };
// };

// const generateRefreshToken = async (token: string) => {
//   if (!token) {
//     throw new Error("Unauthorized Token!!");
//   }

//   const decoded = jwt.verify(
//     token as string,
//     config.jwt_secret as string,
//   ) as JwtPayload;

//   const userData = await pool.query(
//     `
//             SELECT * FROM users WHERE email=$1
//         `,
//     [decoded.email],
//   );

//   const user = userData.rows[0];

//   if (userData.rows.length === 0) {
//     throw new Error("User Not found");
//   }

//   if (!user.is_active) {
//     throw new Error("Forbbiden!!");
//   }

//   // Generate Token
//   const jwtPayload = {
//     id: user.id,
//     name: user.name,
//     isActive: user.is_active,
//     email: user.email,
//   };

//   const accessToken = jwt.sign(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     {
//       expiresIn: "1d",
//     },
//   );

//   return { accessToken };
// };

export default new AuthService();
