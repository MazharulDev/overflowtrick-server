import express from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.get("/notification/:userId", UserController.getCommentNotification);
router.get("/", UserController.getAllUsers);
router.get("/username/:username", UserController.getUserByUsername);
router.get("/:email", UserController.getSingleUser);
router.patch("/:id", UserController.updateUser);
export const UserRoutes = router;
