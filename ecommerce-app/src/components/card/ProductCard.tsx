"use client";

import { rupiahFormat } from "@/helpers/rupiahFormat";
import { ProductType } from "@/db/models/product";
import Link from "next/link";
import AddWishlistButton from "../button/AddWishlistButton";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white border overflow-hidden rounded-2xl cursor-pointer hover:scale-[1.05] transition-all relative shadow-md flex flex-col max-w-[300px]"
    >
      <div className="w-full h-[250px] overflow-hidden aspect-w-16 aspect-h-8">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-md text-gray-800">{product.name}</h3>
        <div className="truncate text-gray-500 mt-2">{product.description}</div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between mt-4">
          <h4 className="text-lg text-gray-800 font-bold">
            {rupiahFormat(product.price)}
          </h4>
          {/* WishList Button */}
          <AddWishlistButton key={product.slug} product={product} />
          {/* <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full hover:scale-[1.1]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="fill-gray-800 inline-block"
                viewBox="0 0 64 64"
              >
                <path
                  stroke="#ff0501"
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                />
              </svg>
            </div> */}
        </div>
      </div>
    </Link>
  );
}
