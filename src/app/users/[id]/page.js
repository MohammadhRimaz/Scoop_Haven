"use client";
import UserForm from "@/app/Components/Layouts/UserForm";
import UserTabs from "../../Components/Layouts/UserTabs";
import { useProfile } from "../../Components/UseProfile";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [redirectToUser, setRedirectToUser] = useState(false);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Updating user...",
      success: "Updated.",
      error: "Error",
    });
    // Reset fields after updated & redirect to user tab
    setRedirectToUser(true);
  }

  if (redirectToUser) {
    return redirect("/users");
  }

  if (loading) {
    return "Loading user profile...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
