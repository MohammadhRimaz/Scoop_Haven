// The New Item Create Page
"use client";
import UserTabs from "@/app/Components/Layouts/UserTabs";
import { useProfile } from "@/app/Components/UseProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/app/Components/Icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/app/Components/Layouts/MenuItemForm";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving the tasty item...",
      success: "Saved.",
      error: "Error",
    });

    // After creating an item, redirect to the item list page
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />

      {/* Item List Button */}
      <div className="max-w-lg mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show All Menu Items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
    </section>
  );
}
