"use client";

import { WishlistWithProductType } from "@/db/models/wishlists";
import Swal from "sweetalert2";

type Props = {
  wishlist: WishlistWithProductType;
  onRemove: (_id: string) => void;
};

export default function RemoveWishlistButton({ wishlist, onRemove }: Props) {
  const handleRemoveWishlist = async (_id: string) => {
    const form = {
      _id,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
      {
        method: "DELETE",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorBody = (await response.json()) as { error: string };
      console.log(errorBody, "<<<<< errorBody");
    }
    let responseBody = await response.json();
    // console.log(responseBody, "<<<<< responseBody");

    Swal.fire({
      title: "Deleted!",
      text: responseBody.message,
      icon: "success",
    });

    onRemove(_id);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleRemoveWishlist(wishlist._id.toString());
      }}
      type="button"
      className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-red-600 text-sm text-white font-semibold rounded-xl hover:bg-red-700"
    >
      Remove
    </button>
  );
}
