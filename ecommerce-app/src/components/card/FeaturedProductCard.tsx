import { ProductType } from "@/db/models/product";
import { rupiahFormat } from "@/helpers/rupiahFormat";
import Link from "next/link";

type Props = {
  product: ProductType;
};


export default function FeaturedProductCard({product} : Props) {
    return (
      <Link href={`/products/${product.slug}`} className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-30 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
        <div className="w-full h-[15rem] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
          <img
            src={product.thumbnail}
            alt="product1"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white w-11/12 p-3 rounded-lg transition-all duration-300">
          <div className="text-center">
            <h3 className="text-base font-bold text-gray-800">
              {product.name}
            </h3>
            <h4 className="text-lg text-[#0aae62] font-bold mt-2">
              {rupiahFormat(product.price)}
            </h4>
          </div>
          <div className="flex justify-center space-x-1 mt-4">
            <svg
              className="w-4 fill-[#facc15]"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-[#facc15]"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-[#facc15]"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-[#facc15]"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-[#facc15]"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
        </div>
      </Link>
    );
}