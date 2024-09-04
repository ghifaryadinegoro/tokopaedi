import { User, UserType } from "@/db/models/users";
import { compare } from "bcryptjs";
import { z, ZodError } from "zod";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const LoginSchema = z.object({
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
    ),
  password: z.string().refine(
    async (password): Promise<boolean> => {
      return Boolean(password);
    },
    {
      message: "password is required",
    }
  ),
});

export async function POST(request: Request) {
  try {
    const body = await request.json() as UserType;
    console.log(body, "<<<<<<< body");

    await LoginSchema.parseAsync(body);

    const user = await User.findOne({ email: body.email });

    if (!user) throw new Error("Invalid email/password");

    const isValid = await compare(body.password, user.password);
    if (!isValid) throw new Error("Invalid email/password");

    const { password, ...safeUser } = user;
    const access_token = sign(safeUser, process.env.JWT_SECRET);

    // optional
    // cookies().set(`Authorization`, `Bearer ${access_token}`)

    return Response.json({ access_token: access_token });
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues.map((issue) => {
        console.log(issue, "<<<<<<<<< issue");

        return issue.message.toLowerCase();
      });
      return Response.json({ error: formatted }, { status: 400 });
    }
    // console.log(error, "<<<<<<< errorAPI");
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 401 });
    }
    return Response.json({ error: "Internal Server Error" });
  }
}
