"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

// calculate product price in cart page
export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.count) {
    price += cartProduct.count.price;
  }
  if (cartProduct.flavour?.length > 0) {
    for (const flavor of cartProduct.flavour) {
      price += flavor.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Save cart details in local storage
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Clear cart details
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  // Remove item from cart
  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product Removed.");
  }

  // save added cart products
  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  // Add to cart products
  function addToCart(product, count = null, flavour = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, count, flavour };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
