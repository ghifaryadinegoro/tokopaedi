import { Product } from "@/db/models/product";

type SecondParam = {
    params: {
        slug: string
    }
}

// GET /api/products/:slug
export async function GET(request:Request, {params}: SecondParam) {
    const product = await Product.findOne(params);
    // console.log(product, "<<<<<<<< product");

    return Response.json(product);
}