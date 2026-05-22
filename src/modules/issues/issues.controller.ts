import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponce";
import AppError from "../../utils/AppError";
import issuesService from "./issues.service";
import type { JwtPayload } from "jsonwebtoken";

const createIssues = async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  req.body.reporter_id = user.id;

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

const getIssues = async (req: Request, res: Response) => {
  const result = await issuesService.getIssues(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
};

const getSingleIssues = async (req: Request, res: Response) => {
  const result = await issuesService.getSingleIssue(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
};

const updateIssues = async (req: Request, res: Response) => {
  const user = req.user;

  const result = await issuesService.updateIssue(
    user as JwtPayload,
    req.body,
    req.params.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Issue updated successfully",
    data: result,
  });
};

const deleteIssues = async (req: Request, res: Response) => {
  const result = await issuesService.getSingleIssue(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
  });
};

export const issuesController = {
  createIssues,
  getIssues,
  getSingleIssues,
  updateIssues,
  deleteIssues,
};
