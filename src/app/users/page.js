"use client";
import { useState, useEffect } from "react";
import UserTabs from "../Components/Layouts/UserTabs";
import { useProfile } from "../Components/UseProfile";
import Edit from "@/app/Components/Icons/Edit";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-lg mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 gap-4 flex items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <sapn>{user.name}</sapn>}
                  {!user.name && <span className="italic">No Name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user._id}>
                  <Edit className={"w-4 h-4"} />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}