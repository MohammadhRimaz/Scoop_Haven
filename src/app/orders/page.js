"use client";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from "@/app/libs/datetime";
import UserTabs from "../Components/Layouts/UserTabs";
import { useProfile } from "../Components/UseProfile";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  // Fetch orders detail from Database
  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div className="text-center">Loading order details...</div>
        )}
        {/* {orders.length === 0 && (
          <div className="text-center">You haven't order anything yet...🥺</div>
        )} */}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col sm:flex-row items-center gap-6">
                {/* Display Payments Detail */}
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-white w-20 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not Paid"}
                  </div>
                </div>

                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    {/* Display Email */}
                    <div className="grow">{order.userEmail}</div>

                    {/* Display Date & Time*/}
                    <div className="text-gray-500 text-sm">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>

                  {/* Display Ordered Items */}
                  <div className="text-gray-500 text-sm">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              {/* Orders Detail page link */}
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
