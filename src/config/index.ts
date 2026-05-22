import dotenv from "dotenv";
import path from "path";
import { env } from "process";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connection_string: env.CONNECTION_STRING,
  port: env.PORT,
  jwt_secret: env.JWT_SECRET,
  jwt_refresh_secret: env.JWT_REFRESH_SECRET,
  node_env: env.NODE_ENV,
};

export default config;
