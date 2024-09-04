import { User, UserType } from "@/db/models/users";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UserType;

    await User.create(body);

    return Response.json({ message: "register success" });
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues.map((issue) => {
        // console.log(issue, "<<<<<<<<< issue");

        return issue.message.toLowerCase();
      });
      return Response.json({ error: formatted }, { status: 400 });
    }
    // console.log(error, "<<<<<<< errorAPI");

    return Response.json({ error: "Internal Server Error" });
  }
}
