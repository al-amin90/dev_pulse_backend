import dotenv from "dotenv";
import path from "path";
import { env } from "process";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  connection_string: env.CONNECTION_STRING as string,
  port: env.PORT as string,
  jwt_secret: env.JWT_SECRET as string,
  jwt_refresh_secret: env.JWT_REFRESH_SECRET as string,
  node_env: env.NODE_ENV as string,
};

export default config;
