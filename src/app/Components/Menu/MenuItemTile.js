import { useState } from "react";
import AddToCartButton from "@/app/Components/Menu/AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, counts, flavours } = item;

  // toggle function for expand/collapse the description
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const hasCountsOrFlavours = counts?.length > 0 || flavours?.length > 0;

  return (
    <div className="bg-gray-100 p-4 rounded-lg text-center group hover:bg-white hover:shadow-lg hover:shadow-black/45 transition:all">
      <div className="text-center">
        {/* Item Image */}
        <img
          src={image}
          alt="Venilla Cup"
          className="max-h-auto max-h-36 block mx-auto"
        />
      </div>
      {/* Item Name */}
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      {/* Item Description */}
      <p
        className={`text-gray-500 text-sm ${!isExpanded ? "line-clamp-2" : ""}`}
      >
        {description}
      </p>
      {/* Item Description Toggle Button */}
      <div
        onClick={toggleReadMore}
        className="text-gray-700 text-sm mt-2 cursor-pointer"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </div>
      {/* Add to cart button */}
      <AddToCartButton
        hasCountsOrFlavours={hasCountsOrFlavours}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
