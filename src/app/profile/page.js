"use client";
import { useSession } from "next-auth/react";
import UserForm from "@/app/Components/Layouts/UserForm";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/app/Components/Layouts/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const { status } = session;
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    // Display Profile details update Confirmation Messages
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Saved!",
      error: "Error!",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="max-w-lg mx-auto mt-8">
      {/* Title */}
      <UserTabs isAdmin={isAdmin} />
      {/* Profile Form */}
      <div className="mt-8"></div>
      <UserForm user={user} onSave={handleProfileInfoUpdate} />
    </section>
  );
}
