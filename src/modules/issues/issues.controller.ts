import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponce";
import authService from "./issues.service";
import AppError from "../../utils/AppError";
import issuesService from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  const result = await issuesService.createIssues(req.body);

  if (!result) {
    throw new AppError(500, "User did not Created!");
  }

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Issue created successfully",
    data: result,
  });
};

export const issuesController = { createIssues };
