"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const post_constant_1 = require("./post.constant");
const post_model_1 = require("./post.model");
const user_model_1 = require("../users/user.model");
const comment_model_1 = require("../comment/comment.model");
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.create(payload);
    const populatedPost = yield post.populate("author");
    const authorId = populatedPost.author._id;
    yield user_model_1.User.findByIdAndUpdate(authorId, {
        $push: { posts: { $each: [populatedPost._id], $position: 0 } },
    });
    return populatedPost;
});
const getAllPost = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: post_constant_1.postSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield post_model_1.Post.find(whereConditions)
        .populate("author")
        .populate("like")
        .populate("comments")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield post_model_1.Post.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getPostByUserId = (author) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({ author })
        .populate("like")
        .sort("-createdAt");
    return result;
});
const deletePostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(id);
    if (!post) {
        throw new Error("Post not found");
    }
    const authorId = post.author;
    yield post_model_1.Post.findByIdAndDelete(id);
    yield comment_model_1.Comment.deleteMany({ postId: id });
    const result = yield user_model_1.User.findByIdAndUpdate(authorId, {
        $pull: { posts: id },
    });
    return result;
});
const toggleLike = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    const userIndex = (_a = post === null || post === void 0 ? void 0 : post.like) === null || _a === void 0 ? void 0 : _a.indexOf(userId);
    if (userIndex === -1) {
        // User hasn't liked the post, so add the like
        (_b = post === null || post === void 0 ? void 0 : post.like) === null || _b === void 0 ? void 0 : _b.push(userId);
    }
    else {
        // User has liked the post, so remove the like
        (_c = post === null || post === void 0 ? void 0 : post.like) === null || _c === void 0 ? void 0 : _c.splice(userIndex, 1);
    }
    yield post.save();
    return post;
});
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findOne({ _id: id })
        .populate("author")
        .populate("like")
        .populate({
        path: "comments",
        populate: {
            path: "author",
            model: "User",
        },
    });
    return result;
});
exports.PostService = {
    createPost,
    getAllPost,
    getPostByUserId,
    deletePostById,
    toggleLike,
    getPostById,
};
