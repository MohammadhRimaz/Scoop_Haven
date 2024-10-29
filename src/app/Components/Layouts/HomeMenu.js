"use client";
import Image from "next/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  //Display last selled items
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-6));
      });
    });
  }, []);

  return (
    <section>
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[65px] text-left -z-10">
          <Image
            src={"/Melting Cream.png"}
            alt={"Venilla"}
            width={200}
            height={200}
          />
        </div>
        <div className="absolute right-0 top-[10px] -z-10">
          <Image
            src={"/Chocolate.png"}
            alt={"Chocolate"}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="text-center my-10">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Imported Menu Item's code from Menu folder. */}
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem {...item} />)}
      </div>
    </section>
  );
}
