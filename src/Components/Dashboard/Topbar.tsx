"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/icon.png";

const Topbar = () => {
  return (
    <div className="mb-6 border-b border-default-200/60 pb-5 bg-background">
      <Link href="/" className="flex items-center gap-2.5 px-2 w-fit group transition">
        <Image
          src={Logo}
          alt="BurmudaShop Logo"
          width={38}
          height={38}
          className="rounded-full shadow-sm group-hover:scale-105 transition duration-200"
        />
        <span className="text-xl font-black tracking-tight">
          <span className="text-orange-500">Burmuda</span>
          <span className="text-default-900">Shop</span>
        </span>
      </Link>
    </div>
  );
};

export default Topbar;