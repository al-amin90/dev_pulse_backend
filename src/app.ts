import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import CookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import GlobalErrorHandler from "./middleware/GlobalErrorHandler";
import issuesRouter from "./modules/issues/issues.route";

const app: Application = express();

// Middleware
app.use(CookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/issues", issuesRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!!!" });
});

app.use(GlobalErrorHandler);

export default app;
