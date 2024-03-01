"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';
export interface RegistrationFormData {
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    password: string;
    cpassword: string;
  }

export default function Register() {
    const [formData, setFormData] = useState<RegistrationFormData>({
        firstname: '',
        lastname: '',
        gender: 'male',
        email: '',
        password: '',
        cpassword: ''
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

    const { firstname, email, password, cpassword } = formData;
    if (!firstname || !email || !password || !cpassword) {
        return toast("Please fill in all required fields.");
    }

    if (password !== cpassword) {
      return  toast.error("Passwords do not match.");
      
    }

    console.log('Form Data:', formData);
  }

  return (
    <section className="w-1/2 mx-auto py-14 bg-white my-10 text-sm border border-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <form onSubmit={onSubmit}>
        <h1 className="text-2xl font-semibold mb-3 text-center">Create your account</h1>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="firstname">First name (required)</label>
          <input className="block border-2 p-2 w-full" type="text" name="firstname" id="firstname" required onChange={handleInputChange} />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="lastname">Last name</label>
          <input className="block border-2 p-2 w-full" type="text" name="lastname" id="lastname" onChange={handleInputChange} />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="gender">Gender</label>
          <select className="block border-2 p-2 w-full" name="gender" id="gender" onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="email">Email Address (required)</label>
          <input className="block border-2 p-2 w-full" placeholder="someone@mail.com" type="email" name="email" id="email" required onChange={handleInputChange} />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="password">Password (required)</label>
          <input className="block border-2 p-2 w-full" placeholder="********" type="password" name="password" id="password" required onChange={handleInputChange} />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <label className="text-xs mb-4" htmlFor="cpassword">Confirm Password (required)</label>
          <input className="block border-2 p-2 w-full" placeholder="********" type="password" name="cpassword" id="cpassword" required onChange={handleInputChange} />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
          <p className="text-xs mb-2">
            By clicking on "create account" button you agree to our terms and conditions.
          </p>
          <button type="submit" className="bg-blue-500 w-full text-white p-3">Create Account</button>
        </div>
      </form>
    </section>
  );
}
