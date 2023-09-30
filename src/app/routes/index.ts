import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { Postroutes } from "../modules/post/post.route";
import { commentRoutes } from "../modules/comment/comment.routes";
import { authRoutes } from "../modules/auth/auth.route";

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
  {
    path: "/comments",
    route: commentRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
