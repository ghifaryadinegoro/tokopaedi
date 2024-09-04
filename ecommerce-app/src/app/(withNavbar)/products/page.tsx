"use client";

import ProductCard from "@/components/card/ProductCard";
import Sidebar from "@/components/Sidebar";
import { ProductType } from "@/db/models/product";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&limit=8&search=${search}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: ProductType[] = await response.json();
        // console.log(data.length, "<<<<<< dataLength");

        if (data.length < 8) {
          setHasMore(false);
        }

        // setProducts((prevProducts) => [...prevProducts, ...data]);

        // Check duplicate
        setProducts((prevProducts) => {
          const newProducts = data.filter(
            (product) => !prevProducts.some((p) => p.slug === product.slug)
          );
          return [...prevProducts, ...newProducts];
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [page, search]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (keyword: string) => {
    setSearch(keyword);
    setPage(1);
    setHasMore(true);
    setProducts([]);
  };

  return (
    <div className="flex">
      <div className="py-24">
        <Sidebar handleSearchChange={handleSearchChange} search={search} />
      </div>
      <div className=" flex-1  font-[sans-serif] py-4 lg:px-10 mx-auto lg:max-w-full md:max-w-3xl max-w-lg">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Our Products
        </h2>
        <div className="flex-1">
          <InfiniteScroll
            dataLength={products.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="mt-10 justify-center items-center">
                <img
                  className="mx-auto w-[10rem] h-[10rem]"
                  src="https://media1.tenor.com/m/GDLXkd0I1i4AAAAC/l.gif"
                  alt="loadingGif"
                />
              </div>
            }
            endMessage={
              products.length > 0 && (
                <p className="mt-8 text-center text-md font-medium">
                  You have seen all products
                </p>
              )
            }
          >
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {products.map((product) => {
                  return <ProductCard key={product.slug} product={product} />;
                })}
              </div>
            ) : (
              <h1 className="text-center mx-auto mt-10 justify-center items-center text-lg">
                --- Product Not Found ---
              </h1>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
