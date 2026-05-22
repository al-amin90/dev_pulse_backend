import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { USER_ROLES } from "../../interface";

const router = Router();

router.post(
  "/",
  auth(USER_ROLES.contributor, USER_ROLES.maintainer),
  issuesController.createIssues,
);
router.get("/", issuesController.getIssues);
router.get("/:id", issuesController.getSingleIssues);

// router.post("/refresh-token", authController.refreshToken);

const issuesRouter = router;

export default issuesRouter;
