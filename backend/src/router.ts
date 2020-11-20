import { Router } from "express";
import GameController from "./controllers/GameController";
import UserController from "./controllers/UserController";
import ScheduleController from "./controllers/ScheduleController";
import AuthController from "./controllers/AuthController";
import StationController from "./controllers/StationController";
import AuthMiddleware from "./middlewares/auth";
import AdminMiddleware from "./middlewares/admin";
import { GameBannerStorage, UserAvatarStorage } from "./config/storage";

const router = Router();

router.get("/users", AuthMiddleware, UserController.index);
router.post(
  "/users",
  [UserAvatarStorage.single("image")],
  UserController.create
);
router.post("/users/forgotpassword", UserController.forgotPassowrd);
router.post(
  "/users/changepassword",
  AuthMiddleware,
  UserController.changePassword
);
router.post("/users/delete", AuthMiddleware, UserController.deleteUser);

router.get("/games", GameController.index);
router.post(
  "/games",
  [GameBannerStorage.single("image"), AuthMiddleware, AdminMiddleware],
  GameController.create
);
router.post(
  "/games/stations",
  [AuthMiddleware, AdminMiddleware],
  StationController.create
);
router.get("/games/:id/stations", StationController.indexByGame);

router.get("/schedules", AuthMiddleware, ScheduleController.index);
router.get("/schedules/:id", ScheduleController.indexByStation);
router.post("/schedules", AuthMiddleware, ScheduleController.create);
router.delete("/schedules/:id", AuthMiddleware, ScheduleController.delete);

router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);

export default router;
