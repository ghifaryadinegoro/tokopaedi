import { z } from "zod";
import { db } from "../config";
import { ObjectId, WithId } from "mongodb";
import { ProductType } from "./product";

const WishlistSchema = z.object({
  userId: z.instanceof(ObjectId),
  productId: z.instanceof(ObjectId),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type WishlistType = z.infer<typeof WishlistSchema>;
export type WishlistWithProductType = WithId<WishlistType> & {
  product: ProductType;
};

export class Wishlist {
  static col() {
    return db.collection("wishlists");
  }

  static async findAll(userId: string) {
    try {
      const pipeline = [
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
      ];

      const result = await this.col().aggregate(pipeline).toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(filter: Partial<WishlistType>) {
    try {
      const result = await this.col().findOne(filter);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(newWishlist: WishlistType) {
    const newData = {
      userId: new ObjectId(newWishlist.userId),
      productId: new ObjectId(newWishlist.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await WishlistSchema.parseAsync(newData);

    const result = await this.col().insertOne(newData);

    return {
      ...newData,
      _id: result.insertedId,
    };
  }

  static async removeWishlist(wishlistId: string) {
    try {
      return await this.col().deleteOne({
        _id: new ObjectId(wishlistId),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
