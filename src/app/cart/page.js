"use client";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "@/app/Components/Layouts/SectionHeaders";
import { CartContext, cartProductPrice } from "@/app/Components/AppContext";
import AddressInputs from "@/app/Components/Layouts/AddressInputs";
import { useProfile } from "../Components/UseProfile";
import CartProduct from "@/app/Components/Menu/CartProduct";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  // The Message for Payment Failed
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment Failed 😔");
      }
    }
  }, []);

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
  let subTotal = 0;
  for (const p of cartProducts) {
    subTotal += cartProductPrice(p);
  }

  // Read Address
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  // Proceed to checkout
  async function proceedToCheckuot(ev) {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      // fetch address and shopping cart products
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          // redirect to stripe
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
    toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Error, try again later...",
    });
  }

  // If No products selected
  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-8">Your shopping cart is empty...</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid xl:gap-8 xl:grid-cols-2">
        <div>
          {/* If products selected, display It's details*/}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={removeCartProduct}
                index={index}
              />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center text-[17px]">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2">
              ${subTotal}
              <br />
              $5
              <br />${subTotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-zinc-200 p-4 rounded-lg">
          <h2 className="text-center text-lg mb-4">Checkout</h2>
          <form onSubmit={proceedToCheckuot}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button className="mt-6" type="submit">
              Pay ${subTotal + 5}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
