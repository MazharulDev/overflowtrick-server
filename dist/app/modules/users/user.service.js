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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const post_model_1 = require("../post/post.model");
const comment_model_1 = require("../comment/comment.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userExist = yield user_model_1.User.find({ username: payload === null || payload === void 0 ? void 0 : payload.username });
    const exist = (_a = userExist[0]) === null || _a === void 0 ? void 0 : _a.username;
    if (payload.username === exist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Username already exist!");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map((field) => ({
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
    const result = yield user_model_1.User.find(whereConditions)
        .populate("posts")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email }).populate("posts");
    return result;
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ username }).populate("posts");
    return result;
});
const getCommentNotification = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userAllPosts = yield post_model_1.Post.find({ author: userId });
    let allComments = [];
    userAllPosts.forEach((post) => {
        allComments = allComments.concat(post.comments);
    });
    const replies = yield comment_model_1.Comment.find({
        _id: { $in: allComments },
        author: { $ne: userId },
    })
        .populate("author")
        .sort("-createdAt");
    return replies;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.User.findById(id);
    if (findUser) {
        const result = yield user_model_1.User.findByIdAndDelete(id);
        yield post_model_1.Post.deleteMany({ author: id });
        yield comment_model_1.Comment.deleteMany({ author: id });
        return result;
    }
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    getUserByUsername,
    getCommentNotification,
    updateUser,
    deleteUser,
};
