"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const post_route_1 = require("../modules/post/post.route");
const comment_routes_1 = require("../modules/comment/comment.routes");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/posts",
        route: post_route_1.Postroutes,
    },
    {
        path: "/comments",
        route: comment_routes_1.commentRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
