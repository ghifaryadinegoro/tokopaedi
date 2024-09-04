import { z } from "zod";
import { db } from "../config";
import { ObjectId, WithId } from "mongodb";
import { hash } from "bcryptjs";

const UserSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .refine(
      async (username): Promise<boolean> => {
        return Boolean(username);
      },
      {
        message: "username is required",
      }
    )
    .refine(
      async (username): Promise<boolean> => {
        const existingUser = await User.col().findOne({ username });
        return !existingUser;
      },
      {
        message: "username already exists",
      }
    ),
  email: z
    .string()
    .email("invalid email format")
    .refine(
      async (email): Promise<boolean> => {
        return Boolean(email);
      },
      {
        message: "email is required",
      }
    )
    .refine(
      async (email): Promise<boolean> => {
        const existingUser = await User.col().findOne({ email });
        return !existingUser;
      },
      {
        message: "email already exists",
      }
    ),
  password: z
    .string()
    .min(5, "minimum password is 5 characters")
    .refine(
      async (password): Promise<boolean> => {
        return Boolean(password);
      },
      {
        message: "password is required",
      }
    ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserType = WithId<z.infer<typeof UserSchema>>;

export class User {
  static col() {
    return db.collection<UserType>("users");
  }

  static async findAll() {
    try {
      const result = await this.col().find().toArray();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPk(id: string) {
    try {
      const result = await this.col().findOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(filter: Partial<UserType>) {
    try {
      const result = await this.col().findOne(filter);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(newUser: UserType) {
    await UserSchema.parseAsync(newUser);
    newUser.password = await hash(newUser.password, 10);
    newUser.createdAt = newUser.updatedAt = new Date();
    const result = await this.col().insertOne(newUser);

    const { password, ...userWithoutPassword } = newUser;

    return {
      ...userWithoutPassword,
      _id: result.insertedId,
    };
  }
}
