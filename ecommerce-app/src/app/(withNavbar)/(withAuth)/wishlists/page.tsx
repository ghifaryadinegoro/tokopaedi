"use client";

import WishlistCard from "@/components/card/WishlistCard";
import { WishlistType, WishlistWithProductType } from "@/db/models/wishlists";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function Wishlist() {
  const [wishlists, setWishlists] = useState<WishlistWithProductType[]>([]);

  useEffect(() => {
    const getWishlists = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`
          // ,{
          // method: "GET",
          // headers: {
          //   "Content-Type": "application/json"
          // }
          // }
        );

        if (!response.ok) throw new Error("Failed to fetch wishlists");
        const data: WishlistWithProductType[] = await response.json();
        // console.log(data, "<<<<<<<< dataWishListPage");

        setWishlists(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWishlists();
  }, []);
  // console.log(wishlists, "<<<<<<<<< wishlists");

  const handleRemove = (_id: string) => {
    const updatedWishlists = wishlists.filter(
      (item) => item._id.toString() !== _id
    );
    setWishlists(updatedWishlists);
  };

  return (
    <div className="font-[sans-serif] py-4 lg:px-10 mx-auto lg:max-w-full md:max-w-3xl max-w-lg">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 border-b-2 pb-2 border-b-gray-300">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {wishlists.map((wishlist, index) => {
          return (
            <WishlistCard
              key={`${wishlist.createdAt}-${index}`}
              wishlist={wishlist}
              onRemove={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
}
