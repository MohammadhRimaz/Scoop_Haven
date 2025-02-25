"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  // The Function to handle the user registration
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Visible the error/success message after the registration
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  // Handle Google Sign-In
  function handleGoogleSignIn() {
    setError(false); // Hide the error message before Google sign-in
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <>
      <section className="mt-8">
        {/* Title of the Register page */}
        <h1 className="text-center text-primary text-4xl mb-4">Register</h1>

        {/* Success Message after Registration  */}
        {userCreated && (
          <div className="my-4 text-center">
            User created.
            <br /> Now you can&nbsp;
            <Link className="underline" href={"/login"}>
              login! &raquo;
            </Link>
          </div>
        )}

        {/* Error Message */}
        {!userCreated && error && (
          <div className="my-4 text-center">
            An error occurred!
            <br />
            The email and password are already taken.
          </div>
        )}

        {/* Registration Form */}
        <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit" disabled={creatingUser}>
            Register
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex gap-4 justify-center"
          >
            <Image
              src={"/Google.png"}
              alt={"Google Logo"}
              width={24}
              height={24}
            />
            Signup with google
          </button>
          <div className="text-center my-4 text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-gray-700" href={"/login"}>
              Login Here
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
