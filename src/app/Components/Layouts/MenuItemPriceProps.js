import Bin from "@/app/Components/Icons/Bin";
import Plus from "@/app/Components/Icons/Plus";
import Up from "@/app/Components/Icons/Up";
import Down from "@/app/Components/Icons/Down";
import { useState } from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  title,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Function for display extra scoop count & price
  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  //Edit extra count function
  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index][prop] = newValue;
      return newProps;
    });
  }

  // Function for Remove extra count1
  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-300 p-2 rounded-md mb-2">
      {/* Expand/Collapse Button for the count/flavours */}
      <button
        className="inline-flex p-1 border-0 justify-start"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen && <Up />}
        {!isOpen && <Down />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((prop, index) => (
            <div key={index} className="flex items-end gap-2">
              {/* Doubt: input type need to be change */}
              <div>
                <lable>{title}</lable>
                <input
                  type="text"
                  value={prop.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>

              <div className="">
                <lable>Extra price</lable>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={prop.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-4 px-2"
                >
                  <Bin />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center"
        >
          <Plus />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
