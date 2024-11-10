"use client";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../Components/Layouts/SectionHeaders.js";
import { CartContext, cartProductPrice } from "@/app/Components/AppContext.js";
import { useParams } from "next/navigation.js";
import AddressInputs from "@/app/Components/Layouts/AddressInputs.js";
import CartProduct from "@/app/Components/Menu/CartProduct.js";

export default function OrderPage() {
  const [order, setOrder] = useState();
  const { id } = useParams();
  const [loadingOrders, setLoadingOrders] = useState(true);
  // clear cart after paid for the order
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrders(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrders(false);
        });
      });
    }
  }, []);

  // Calculate & display Price of the products
  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order!</p>
          <p>We will call you when your order will on the way....</p>
        </div>
      </div>
      {loadingOrders && <div>Loading order details...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:{" "}
              <span className="text-black font-bold inline-block w-16">
                Rs. {subtotal}
              </span>
              <br />
              Delivery:{" "}
              <span className="text-black font-bold inline-block w-16">
                Rs. 200
              </span>
              <br />
              Total:{" "}
              <span className="text-black font-bold inline-block w-16">
                Rs. {subtotal + 200}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-zinc-200 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
