"use client";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "@/app/Components/Layouts/SectionHeaders";
import Bin from "@/app/Components/Icons/Bin";
import { CartContext, cartProductPrice } from "@/app/Components/AppContext";
import Image from "next/image";
import AddressInputs from "@/app/Components/Layouts/AddressInputs";
import { useProfile } from "../Components/UseProfile";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  // Calling Address details if user already loggedin
  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postal, city, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        postal,
        city,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  // calculate total of the cart products price
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        {/* If No products selected */}
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart...</div>
          )}
          {/* If products selected, display It's details*/}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex items-center gap-4 border-b py-4">
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={""}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.count && (
                    <div className="text-sm">
                      Count: <span>{product.count.name}</span>
                    </div>
                  )}
                  {product.flavour?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.flavours.map((flavour) => (
                        <div>
                          {flavour.name} + Rs. {flavour.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  Rs. {cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                    className="p-2"
                  >
                    <Bin />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Total:</span>
            <span className="text-lg font-semibold pl-2">Rs. {total}</span>
          </div>
        </div>
        <div className="bg-zinc-200 p-4 rounded-lg">
          <h2 className="text-center mb-4">Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button className="mt-6" type="submit">
              Pay Rs. {total}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
