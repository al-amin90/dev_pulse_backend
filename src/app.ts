import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import CookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

// Middleware
app.use(CookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!!!" });
});

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack); // Log the error

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
});

export default app;
