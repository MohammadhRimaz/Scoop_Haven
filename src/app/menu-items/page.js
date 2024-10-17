"use client";
import UserTabs from "@/app/Components/Layouts/UserTabs";
import { useProfile } from "@/app/Components/UseProfile";
import EditableImage from "@/app/Components/Layouts/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = {
      image,
      name,
      description,
      basePrice,
    };
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
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Your not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
