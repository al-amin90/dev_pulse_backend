import { Router } from "express";
import { issuesController } from "./issues.controller";

const router = Router();

router.post("/", issuesController.createIssues);
// router.post("/", authController.login);

// router.post("/refresh-token", authController.refreshToken);

const issuesRouter = router;

export default issuesRouter;
