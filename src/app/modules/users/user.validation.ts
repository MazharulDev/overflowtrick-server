import { z } from "zod";
import { gender } from "./user.constant";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
      middleName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.string({
      required_error: "Date of birth is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    contactNo: z.string({
      required_error: "Contact number is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
