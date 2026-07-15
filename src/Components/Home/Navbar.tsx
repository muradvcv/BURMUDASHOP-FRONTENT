"use client";

import Link from "next/link";
import { LayoutDashboard, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/app/icon.png"
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Explore Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold rounded-full">
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-medium text-gray-700 transition hover:text-orange-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          {isPending ? (
            <>
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
            </>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/${user?.role}`}
                className="rounded-full p-2 hover:bg-orange-100 transition"
              >
                <LayoutDashboard className="h-7 w-7 text-orange-500" />
              </Link>


                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-2 border-orange-500 object-cover"
                />
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold transition hover:border-orange-500 hover:text-orange-500"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 lg:hidden">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${isOpen ? "max-h-[600px]" : "max-h-0"
          }`}
      >
        <div className="border-t bg-white px-6 py-5">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-700 transition hover:text-orange-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6">
            {isPending ? (
              <div className="space-y-3">
                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            ) : user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Image
                      src={user.image || "/default-avatar.png"}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border-2 border-orange-500 object-cover"
                    />

                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg bg-orange-500 py-2 text-center font-semibold text-white hover:bg-orange-600"
                >
                  Dashboard
                </Link>
                
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-gray-300 py-2 text-center font-semibold transition hover:border-orange-500 hover:text-orange-500"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-orange-500 py-2 text-center font-semibold text-white transition hover:bg-orange-600"
                >
                  Register
                </Link>

                   
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;