"use client";
import UserTabs from "@/app/Components/Layouts/UserTabs";
import { useProfile } from "@/app/Components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  // While Loading
  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
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
          <div className="pb-4">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>

      {/* List of categories */}
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit Category</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <button
              onClick={() => {
                setEditedCategory(c);
                setCategoryName(c.name);
              }}
              className="bg-gray-300 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-1"
            >
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
