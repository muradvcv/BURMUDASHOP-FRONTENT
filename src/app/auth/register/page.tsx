"use client";

import React from "react";
import Link from "next/link";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Lottie from "lottie-react";
import secureAnimation from "@/app/assets/lottie/resicon.json";
const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passwordValue, setPasswordValue] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log(data);
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-5 rounded-2xl shadow bg-orange-400">
        <div className="hidden lg:flex flex-col items-center justify-center w-[460px] bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 rounded-l-2xl p-10 text-white relative overflow-hidden">

          {/* Background Blur */}
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />

          {/* Lottie */}
          <div className="relative z-10">
            <Lottie
              animationData={secureAnimation}
              loop
              className="w-[320px] h-[320px]"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center mt-4">

            <h2 className="text-4xl font-bold leading-tight">
              Shop With <br /> Confidence
            </h2>

            <p className="mt-5 text-orange-100 leading-7">
              Create your BurmudaShop account and enjoy a secure,
              faster and smarter shopping experience with exclusive
              offers, order tracking and wishlist support.
            </p>

          </div>

          {/* Features */}

          <div className="relative z-10 mt-10 grid grid-cols-2 gap-4 w-full">

            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold">🔒</h3>
              <p className="mt-2 text-sm font-medium">
                Secure Account
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold">⚡</h3>
              <p className="mt-2 text-sm font-medium">
                Fast Checkout
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold">❤️</h3>
              <p className="mt-2 text-sm font-medium">
                Wishlist
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold">📦</h3>
              <p className="mt-2 text-sm font-medium">
                Order Tracking
              </p>
            </div>

          </div>

        </div>
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-r-2xl border border-slate-100 shadow-xl p-6 md:p-10">

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-slate-500 mt-3 text-sm md:text-base">
                Join <span className="text-orange-600 font-semibold">BurmudaShop</span> and start shopping smart.
              </p>
            </div>

            <Form
              onSubmit={onSubmit}
              className="space-y-6"
              render={(props) => <form {...props} />}
            >
              {/* Row 1: Name & Email */}
              <div className="grid sm:grid-cols-2 gap-6">
                <TextField isRequired name="name" className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Full Name</Label>
                  <Input
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                  />
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>

                <TextField
                  isRequired
                  name="email"
                  type="email"
                  className="flex flex-col gap-1.5"
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "Enter a valid email address";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-slate-700">Email Address</Label>
                  <Input
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                  />
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>
              </div>

              {/* Row 2: Passwords */}
              <div className="grid sm:grid-cols-2 gap-6">
                <TextField
                  isRequired
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="flex flex-col gap-1.5 relative"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "Minimum 8 characters required";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-slate-700">Password</Label>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      onChange={(e) => setPasswordValue((e.target as HTMLInputElement).value)}
                      className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>

                <TextField
                  isRequired
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="flex flex-col gap-1.5 relative"
                  validate={(value) => {
                    if (value !== passwordValue) {
                      return "Passwords do not match";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-semibold text-slate-700">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>
              </div>


              {/* Image */}
              <TextField isRequired name="image" className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-slate-700">Image Url</Label>
                <Input
                  type="url"
                  placeholder="https://md-murad8.imgbb.com/"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Row 3: Phone */}
              <TextField isRequired name="phone" className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
                <Input
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* Address */}
              <TextField isRequired name="address" className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-slate-700">Address</Label>
                <Input
                  placeholder="Street address, Apartment, Suite"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              {/* City & Postal Code */}
              <div className="grid sm:grid-cols-2 gap-6">
                <TextField isRequired name="city" className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-slate-700">City</Label>
                  <Input
                    placeholder="Mymensingh"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                  />
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>

                <TextField isRequired name="postalCode" className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Postal Code</Label>
                  <Input
                    placeholder="2200"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm text-slate-800"
                  />
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 text-sm pt-2">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600 accent-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <p className="text-slate-600 leading-tight">
                  I agree to the{" "}
                  <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base shadow-lg shadow-orange-600/20 active:scale-[0.99] transition duration-200"
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="text-slate-400 text-xs font-semibold tracking-wider">OR</span>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <Button

                  className="h-12 border border-slate-200 bg-white hover:bg-slate-50 transition font-medium text-slate-700 rounded-xl gap-3"
                >
                  <Image width={100} height={100}
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign up with Google
                </Button>


              </div>

              {/* Footer Sign in trigger */}
              <p className="text-center text-sm text-slate-600 pt-4">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition"
                >
                  Login
                </Link>
              </p>
            </Form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;