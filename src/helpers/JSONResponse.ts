import { Request, Response } from "express";

export default class JSONResponse {
  /**
   *
   * @param req Express Request Object
   * @param res Express Response Object
   * @param data The actual data to send
   * @param message Message explaining the data
   */
  static success(req: Request, res: Response, data: unknown, message: string) {
    return res.status(200).json({ status: true, message: message, data: data });
  }

  /**
   *
   * @param req Express Request Object
   * @param res Express Response Object
   * @param message Message explaining the data
   * @param statusCode Response Status Code, defaults to 500
   */
  static error(req: Request, res: Response, message: string, statusCode = 500) {
    return res.status(statusCode).json({ status: false, message: message });
  }
}
