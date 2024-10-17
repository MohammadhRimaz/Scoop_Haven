"use client";
import { useSession } from "next-auth/react";
import EditableImage from "@/app/Components/Layouts/EditableImage";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/app/Components/Layouts/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const { status } = session;
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setCity(data.city);
          setPostal(data.postal);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    // Display Profile details update Confirmation Messages
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          city,
          postal,
          country,
        }),
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
    <section className="mt-8">
      {/* Title */}
      <UserTabs isAdmin={isAdmin} />
      {/* Profile Form */}
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          {/* Input Fields for the profile section */}
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and Last Name</label>
            <input
              type="text"
              placeholder="First and Last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              disabled={true}
              value={session.data.user.email}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postal}
                  onChange={(ev) => setPostal(ev.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
