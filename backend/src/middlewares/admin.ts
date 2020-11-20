import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export default async function AdminMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await User.findById(res.locals["user"].id);

  if (!user.isAdmin) {
    res.status(403).send({ error: "Somente usário administrador" });
  }

  next();
}
