"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      return toast.warning("Please fill in all required fields.");
    }

    console.log("Form Data:", formData);
  }

  return (
    <section className="w-1/2 mx-auto py-14 bg-white my-10 text-sm border border-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <h1 className="text-2xl font-semibold mb-3 text-center">
        Log in to continue
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="email">
            Email Address
          </label>
          <input
            className="block border-2 p-2 w-full"
            placeholder="someone@mail.com"
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="password">
            Password
          </label>
          <input
            className="block border-2 p-2 w-full"
            placeholder="********"
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3 w-1/2 mx-auto">
          <button type="submit" className="bg-blue-500 w-full text-white p-3">
            Create Account
          </button>
        </div>
      </form>
      <p className="text-xs mb-2 w-1/2 mx-auto">
        Forgot Password ?{" "}
        <span className="text-blue-800 hover:underline hover:cursor-pointer">
          Click here
        </span>{" "}
      </p>
    </section>
  );
}
