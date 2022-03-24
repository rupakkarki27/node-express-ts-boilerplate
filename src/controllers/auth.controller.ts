import passport from "passport";
import jwt from "jsonwebtoken";
import JSONResponse from "../helpers/JSONResponse";

import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/secrets";

export const signupControlelr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate("signup", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      JSONResponse.error(req, res, info.message);
    }

    JSONResponse.success(req, res, { user: user }, "Signup successful");
  })(req, res, next);
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate("signin", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      JSONResponse.error(req, res, "User not found.");
    }

    if (user) {
      const body = {
        _id: user._id,
        email: user.email,
      };

      const token = jwt.sign({ user: body }, JWT_SECRET);

      JSONResponse.success(req, res, { token }, "Signin successful");
    }
    JSONResponse.error(req, res, "Signin failed");
  })(req, res, next);
};
