import { z } from "zod";
import { db } from "../config";

const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string().refine(async (slug): Promise<boolean> => {
    const existingProduct = await Product.col().findOne({slug})
    return !existingProduct;
  }, {
    message: "slug must be unique"
  }),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  price: z.number(),
  tags: z.string().array().optional(),
  thumbnail: z.string().optional(),
  images: z.string().array().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>

export class Product {
  static col() {
    return db.collection<ProductType>("products");
  }

  static async findAll(page: number = 1, limit: number = 8, search?: string) {
    try {
      let filter = {};
      if (search) {
        filter = {
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
          ],
        };
      }
      const skip = (page - 1) * limit;

      const result = await this.col().find(filter).skip(skip).limit(limit).toArray();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPk(id: string) {
    try {
      const result = await this.col().findOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(filter: Partial<ProductType>) {
    try {
      const result = await this.col().findOne(filter);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async search(
    keyword: string,
    page: number = 1,
    limit: number = 8,
    query?: string
  ) {
    try {
      const skip = (page - 1) * limit;
      const result = await this.col()
        .find({
          $or: [
            {
              name: { $regex: keyword, $options: "i" },
            },
            {
              description: { $regex: keyword, $options: "i" },
            },
          ],
        })
        .skip(skip)
        .limit(limit)
        .toArray();

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

