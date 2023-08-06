import express from "express";
import { UserRoutes } from "../modules/users/user.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
