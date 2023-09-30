import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // const user = new User()

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token

  const { email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const authService = {
  loginUser,
};
