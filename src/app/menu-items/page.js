"use client";
import { useProfile } from "@/app/Components/UseProfile";
import UserTabs from "../Components/Layouts/UserTabs";
import Link from "next/link";
import Image from "next/image";
import Right from "../Components/Icons/Right";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Your not an admin";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link href={"/menu-items/new"} className="button flex">
          <span>Create New Item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm mt-8 text-gray-500">Edit Menu Item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="mb-1 bg-gray-100 rounded-lg p-4 flex-col"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={""}
                    className="rounded-md"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
