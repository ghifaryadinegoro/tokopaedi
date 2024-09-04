"use client";

import { rupiahFormat } from "@/helpers/rupiahFormat";
import { WishlistType, WishlistWithProductType } from "@/db/models/wishlists";
import RemoveWishlistButton from "../button/RemoveWishlistButton";

type Props = {
  wishlist: WishlistWithProductType;
  onRemove: (_id: string) => void;
};

export default function WishlistCard({ wishlist, onRemove }: Props) {
  return (
    <div className="rounded-xl transition-all relative overflow-hidden shadow-lg flex flex-col max-h-[400px]">
      <div className="overflow-hidden aspect-w-16 aspect-h-9">
        <img
          src={wishlist.product.thumbnail}
          alt={wishlist.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {wishlist.product.name}
        </h3>
        <h4 className="text-lg text-gray-800 font-bold mt-2">
          {rupiahFormat(wishlist.product.price)}
        </h4>
      </div>
      <div className="text-center p-4">
        <RemoveWishlistButton key={wishlist.product.slug} wishlist={wishlist} onRemove={onRemove} />
      </div>
    </div>
  );
}
