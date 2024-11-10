"use client";
import UserTabs from "@/app/Components/Layouts/UserTabs";
import { useProfile } from "@/app/Components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Bin from "../Components/Icons/Bin";
import Edit from "../Components/Icons/Edit";
import DeleteButton from "@/app/Components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // reset the input field after update/create
      setCategoryName("");
      // fetching categories after create/update without reload
      fetchCategories();
      // reset the title after update
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    // Confirmation messages to user
    toast.promise(creationPromise, {
      loading: editedCategory
        ? "updateing your category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated." : "Category created.",
      error: "Error, sorry...",
    });
  }

  // Function For Delete a Category
  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted.",
      error: "Error, sorry...",
    });
    // Reload after delete.
    fetchCategories();
  }

  // While Loading
  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          {/* Update/Create Input Field */}
          <div className="grow">
            <label>
              {editedCategory ? "Update Category Name" : "New Category Name"}
              {editedCategory && (
                <>
                  :<b> {editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>

          {/* Update/Create Button */}
          <div className="pb-4 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            {/* Cancel Button for Edit click */}
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* List of categories */}
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 items-center rounded-xl p-2 px-4 flex gap-2 mb-1"
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                >
                  <Edit />
                </button>
                <DeleteButton
                  icon={<Bin />}
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
