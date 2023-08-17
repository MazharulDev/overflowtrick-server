import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { Postroutes } from "../modules/post/post.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/posts",
    route: Postroutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
