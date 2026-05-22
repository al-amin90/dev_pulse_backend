import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponce";
import authService from "./auth.service";
import AppError from "../../utils/AppError";

const signup = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);

  if (!user) {
    throw new AppError(500, "User did not Created!");
  }

  delete user.password;

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
};

const login = async (req: Request, res: Response) => {
  const result = await authService.loginUserIntoDB(req.body);

  const { accessToken, refreshToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { token: accessToken, user },
  });
};

// const refreshToken = async (req: Request, res: Response) => {
//   try {
//     const result = await authService.generateRefreshToken(
//       req.cookies.refreshToken,
//     );

//     res.status(200).json({
//       success: true,
//       message: "Access Token Generate",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(200).json({
//       success: false,
//       message: error.message,
//       data: error,
//     });
//   }
// };

export const authController = { signup, login };
