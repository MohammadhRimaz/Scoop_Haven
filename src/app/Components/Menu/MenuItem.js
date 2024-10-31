import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/app/Components/Menu/MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, counts, flavours } = menuItem;
  const [selectedCount, setSelectedCount] = useState(counts?.[0] || null);
  const [selectedFlavours, setSelectedFlavours] = useState([]);

  //Add to Cart function
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  function handleAddToCartButtonClick() {
    const hasOption = counts.length > 0 || flavours.length > 0;
    if (hasOption && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedCount, selectedFlavours);
    closePopup();
    toast.success("Added to Cart.");
  }

  // The Function for close popup
  function closePopup() {
    setShowPopup(false);
    setSelectedFlavours([]);
    setSelectedCount(counts?.[0] || null);
  }

  // Function for selected flavors
  function handleExtraFlavorClick(ev, flavour) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedFlavours((prev) => [...prev, flavour]);
    } else {
      setSelectedFlavours((prev) => {
        return prev.filter((e) => e.name !== flavour.name);
      });
    }
  }

  // Calculate Total price
  let selectedPrice = basePrice;
  if (selectedCount) {
    selectedPrice += selectedCount.price;
  }
  if (selectedFlavours?.length > 0) {
    for (const flavour of selectedFlavours) {
      selectedPrice += flavour.price;
    }
  }

  return (
    <>
      {/* A popup for add to cart button if extra counts or flavours need  */}
      {showPopup && (
        <div
          onClick={closePopup} //close popup here
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-auto p-2"
              style={{ maxHeight: "calc(100vh - 100px" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {counts?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Add Scoop Count</h3>
                  {counts.map((count) => (
                    <label className="flex items-center gap-2 p-2 rounded-md mb-1">
                      <input
                        type="radio"
                        onClick={() => setSelectedCount(count)}
                        checked={selectedCount?.name === count.name}
                        name="count"
                      />
                      {count.name} Rs.{basePrice + count.price}
                    </label>
                  ))}
                </div>
              )}
              {flavours?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any Extras?</h3>
                  {flavours.map((flavour) => (
                    <label className="flex items-center gap-2 p-4 rounded-md mb-1">
                      <input
                        type="checkbox"
                        onClick={(ev) => handleExtraFlavorClick(ev, flavour)}
                        name={flavour.name}
                      />
                      {flavour.name} +Rs.{flavour.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to Cart Rs. {selectedPrice}
              </button>
              <buuton
                onClick={closePopup} //close popup here
                className="button mt-2 cursor-pointer"
              >
                Close
              </buuton>
            </div>
          </div>
        </div>
      )}
      {/* Display all the Menu Items */}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
