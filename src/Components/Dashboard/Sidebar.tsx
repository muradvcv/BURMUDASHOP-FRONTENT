"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  Archive,
  Bars,
  CirclePlus,
  LayoutHeaderCells,
  ListCheck,
} from "@gravity-ui/icons";
import {House,PackagePlus,Package,ShoppingCart,Users,CircleDollarSign,} from "lucide-react";

import { Button, Drawer } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Profile from "./Profile";
import Topbar from "./Topbar";

type Role = "user" | "admin";
type NavItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
};

const navItems: Record<Role, NavItem[]> = {
  user: [
    { icon: LayoutHeaderCells, label: "Overview", href: "/dashboard/client" },
    { icon: PackagePlus, label: "Add Product", href: "/dashboard/admin/additeam" },
    { icon: Package, label: "All Products", href: "/dashboard/admin/manageproduct" },
    { icon: Users, label: "My profile", href: "/dashboard/admin/myprofile" },
  ],
  admin: [
    { icon: House, label: "Overview", href: "/dashboard/admin" },
    { icon: PackagePlus, label: "Add Product", href: "/dashboard/admin/additeam" },
    { icon: Package, label: "Manage Products", href: "/dashboard/admin/manageproduct" },
    { icon: ShoppingCart, label: "Manage Orders", href: "/dashboard/admin/manageorders" },
    { icon: Users, label: "Manage Users", href: "/dashboard/admin/manageuser" },
    { icon: CircleDollarSign, label: "Total Revenue", href: "/dashboard/admin/revenue" },
  ],
};

// ---------- Loading placeholders ----------

// একটা ড্যাশবোর্ড মেনু আইটেম (আইকন + লেবেল) লোড হওয়ার সময় দেখানো placeholder
function DashboardItemLoading() {
  return (
    <div className="flex items-center gap-3 rounded-lg px-4 py-3">
      <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
      <div className="h-4 w-28 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
    </div>
  );
}

// পুরো ড্যাশবোর্ড মেনু (৫টা DashboardItemLoading একসাথে) লোড হওয়ার সময় দেখানো placeholder
function DashboardMenuLoading() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <DashboardItemLoading key={i} />
      ))}
    </div>
  );
}

// প্রোফাইল সেকশন (ছবি + নাম) লোড হওয়ার সময় দেখানো placeholder
function ProfileLoading() {
  return (
    <div className="mt-auto overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gray-200 animate-pulse" />

      {/* Profile row */}
      <div className="flex items-center gap-4 p-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          {/* status dot placeholder */}
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="min-w-0 flex-1">
          {/* Name */}
          <div className="h-4 w-32 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
          {/* Email */}
          <div className="mt-2 h-3 w-40 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
          {/* Role badge */}
          <div className="mt-2 h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Footer / Logout button placeholder */}
      <div className="flex items-center justify-center py-6">
        <div className="h-4 w-20 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
}

// ---------- Sidebar ----------
export default function Sidebar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  const role: Role = session?.user?.role === "admin" ? "admin" : "user";
  const items = navItems[role];

  // বর্তমান pathname অনুযায়ী কোন nav item active সেটা চেক করে
  const isActive = (href: string) => {
    if (href === "/dashboard/user" || href === "/dashboard/admin") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-default-200 min-h-screen h-screen sticky top-0 p-4">
        <Topbar />
        {isPending ? (
          <>
            <DashboardMenuLoading />
            <ProfileLoading />
          </>
        ) : (
          <>
            <nav className="flex flex-col gap-2">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${active
                        ? "bg-orange-500 text-white shadow-sm"
                        : "text-default-700 hover:bg-default-100"
                      }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${active ? "text-white" : "text-default-600"}`}
                    />
                    <span className={active ? "font-semibold" : "font-medium"}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
            {/* সবসময় নিচে থাকার জন্য mt-auto */}
            <div className="mt-auto">
              <Profile />
            </div>
          </>
        )}
      </aside>

      {/* Mobile */}
      <div className="md:hidden">
        <Drawer>
          <Button isIconOnly isDisabled={isPending}>
            <Bars />
          </Button>
          <Drawer.Backdrop />
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Menu</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body className="flex flex-col">
                {isPending ? (
                  <>
                    <DashboardMenuLoading />
                    <ProfileLoading />
                  </>
                ) : (
                  <>
                    <nav className="flex flex-col gap-2">
                      {items.map((item) => {
                        const active = isActive(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${active
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-default-700 hover:bg-default-100"
                              }`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${active ? "text-white" : "text-default-600"}`}
                            />
                            <span className={active ? "font-semibold" : "font-medium"}>
                              {item.label}
                            </span>
                          </Link>
                        );
                      })}
                    </nav>
                    <div className="mt-auto">
                      <Profile />
                    </div>
                  </>
                )}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
}