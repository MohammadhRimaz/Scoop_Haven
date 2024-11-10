"use client";
import { useState } from "react";
import EditableImage from "@/app/Components/Layouts/EditableImage";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/app/Components/Layouts/AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postal, setPostal] = useState(user?.postal || "");
  const [country, setCountry] = useState(user?.country || "");
  const [image, setImage] = useState(user?.image || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "city") setCity(value);
    if (propName === "phone") setPhone(value);
    if (propName === "postal") setPostal(value);
    if (propName === "country") setCountry(value);
    if (propName === "streetAddress") setStreetAddress(value);
  }

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      {/* Input Fields for the profile section */}
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            postal,
            city,
            streetAddress,
            country,
            admin,
          })
        }
      >
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
          value={user.email}
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postal, city, country }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
