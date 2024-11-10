import EditableImage from "@/app/Components/Layouts/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/app/Components/Layouts/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [counts, setCounts] = useState(menuItem?.counts || []);
  const [flavours, setFlavours] = useState(menuItem?.flavours || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);

  // Fetch all categories name for category list
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          counts,
          flavours,
          category,
        })
      }
      className="mt-8 max-w-lg mx-auto"
    >
      <div
        className="sm:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        {/* Item Image */}
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        {/* Item Details */}
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
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />

          {/* Extra Scoop Form */}
          <MenuItemPriceProps
            name={"Extra Scoop"}
            title={"Count"}
            props={counts}
            setProps={setCounts}
            addLabel={"Add Item Count"}
          />

          {/* Extra Scoop Flavour */}
          <MenuItemPriceProps
            name={"Flavours"}
            title={"Name"}
            props={flavours}
            setProps={setFlavours}
            addLabel={"Add Scoop Flavour"}
          />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
