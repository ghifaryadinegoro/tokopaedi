import { Wishlist, WishlistType } from "@/db/models/wishlists";
import { ZodError } from "zod";

// POST /api/wishlists
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(request, "<<<<<<< rquesttt");

    body.userId = request.headers.get("x-user-id") as string;
    // console.log(body, "<<<<<<< bodyWishlistAPI");

    let result = await Wishlist.create(body);
    console.log(result, "<<<<<<<< resultCreateWishlistAPI");

    return Response.json(
      { message: "Success add product to wishlist" },
      { status: 201 }
    );
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

// GET /api/wishlists
export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const wishlists = await Wishlist.findAll(userId);
    // console.log(wishlists, "<<<<<<<<<< getWishlistAPI");

    return Response.json(wishlists, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE /api/wishlists
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    // console.log(body, "<<<<<<<< bodyDelete");

    await Wishlist.removeWishlist(body._id);

    return Response.json(
      { message: "Success remove product from wishlist" },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
