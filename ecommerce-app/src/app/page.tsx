import FeaturedProductCard from "@/components/card/FeaturedProductCard";
import HomeBanner from "@/components/HomeBanner";
import HomeFooter from "@/components/HomeFooter";
import Navbar from "@/components/Navbar";
import { ProductType } from "@/db/models/product";
import Link from "next/link";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
    );
    if (!response.ok) throw new Error(`Failed to fetch products`);
    const data: ProductType[] = await response.json();
    // console.log(data, "<<<<< dataProductsDiHome");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Navbar />
      <HomeBanner />
      <div className="font-sans p-4 mx-auto lg:max-w-6xl md:max-w-4xl max-sm:max-w-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Top Products
          </h2>
          <Link
            href="/products"
            className="flex items-center py-auto hover:text-[#0aae62]"
          >
            <div>See All Products</div>
            <div className="ml-1 hover:text-[#0aae62]">
              <svg
                className="w-[24px] h-[24px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-6 gap-12">
          {products?.slice(0, 5).map((product) => {
            return <FeaturedProductCard key={product.slug} product={product} />;
          })}
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
