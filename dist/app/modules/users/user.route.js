"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.get("/notification/:userId", user_controller_1.UserController.getCommentNotification);
router.get("/", user_controller_1.UserController.getAllUsers);
router.get("/username/:username", user_controller_1.UserController.getUserByUsername);
router.get("/:email", user_controller_1.UserController.getSingleUser);
exports.UserRoutes = router;
