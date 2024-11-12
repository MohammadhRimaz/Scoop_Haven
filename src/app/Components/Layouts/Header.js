"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Cart from "@/app/Components/Icons/Cart";
import Menu from "@/app/Components/Icons/Menu";

// Function for the Tab links
function AuthLinks({ status, userName }) {
  {
    /* Need to fix Not applicable for creadential login */
  }
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-primary text-white rounded-full px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary text-white rounded-full px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);

  // Display 1st name of loggedin username
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <header>
      {/* Header section for small screens */}
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href="/">
          SCOOP&nbsp;HAVEN
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={"/cart"} className="relative">
            <Cart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border-0"
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Toggle Menu Button */}
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden max-w-[250px] p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-4 text-center absolute right-0"
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <AuthLinks userName={userName} status={status} />
        </div>
      )}

      {/* Header section for Big screens */}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-3 xl:gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href="/">
            SCOOP&nbsp;HAVEN
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <Cart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
