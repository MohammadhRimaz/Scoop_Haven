// The Item edit Page
"use client";
import UserTabs from "@/app/Components/Layouts/UserTabs";
import { useProfile } from "@/app/Components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/app/Components/Icons/Left";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import MenuItemForm from "@/app/Components/Layouts/MenuItemForm";
import DeleteButton from "@/app/Components/DeleteButton";

export default function EditMenuitemPage() {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  // Fetch Clicked Item Details from DB
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        // Place the details to the correct field
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

    // Reset fields after saved & redirect to Menu Items
    setRedirectToItems(true);
  }

  // Fuction for Delete Item
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted.",
      error: "Error",
    });

    // Reset fields after deleted & redirect to Menu Items
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

      {/* Render MenuItemForm with delete button */}
      <MenuItemForm
        menuItem={menuItem}
        onSubmit={handleFormSubmit}
        showDeleteButton={true}
        onDelete={handleDeleteClick}
      />
    </section>
  );
}
