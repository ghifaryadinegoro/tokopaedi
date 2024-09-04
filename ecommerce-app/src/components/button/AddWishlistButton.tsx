"use client";

import { ProductType } from "@/db/models/product";
import Swal from "sweetalert2";

type Props = {
  product: ProductType;
};

export default function AddWishlistButton({ product }: Props) {
  const handleAddWishlist = async (productId: string) => {
    const form = {
      productId,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      // const errorBody = responseBody.error;
      console.log(errorBody, "<<<<< errorBody");

      if (response.status === 401) {
        Swal.fire({
          title: "Log In",
          text: "Please log in to add products to wishlist",
          icon: "error",
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        Swal.fire({
          title: "Error",
          text: errorBody.error,
          icon: "error",
        });
      }
      return;
    }
    const responseBody = await response.json();

    // console.log(responseBody, "<<<< responseBody addWishlists");
    Swal.fire({
      title: "Success",
      text: responseBody.message,
      icon: "success",
    });
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddWishlist(product._id);
        }}
        type="button"
        className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full hover:scale-[1.1]"
      >
        <svg
          className="w-[24px] h-[24px] text-[#ff0501]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
          />
        </svg>

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          className="fill-[#ff0501] bginline-block"
          viewBox="0 0 64 64"
        >
          <path
            stroke="#ff0501"
            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
            data-original="#000000"
          />
        </svg> */}
      </button>
    </div>
  );
}
