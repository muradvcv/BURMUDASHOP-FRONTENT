"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Envelope } from "@gravity-ui/icons";
import { LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session} = useSession();
  const router = useRouter();
  const user = session?.user;

  if (!user) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

      {/* Profile */}
      <Link
        href={`/public/freelancers/${user.id}`}
        className="group flex items-center gap-4 p-4 transition-colors hover:bg-orange-50/60"
      >
        <div className="relative shrink-0">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name ?? "User"}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border-2 border-orange-500 object-cover ring-2 ring-white"
          />
          {/* অনলাইন / ভেরিফাইড স্ট্যাটাস ডট */}
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-base font-semibold text-gray-900">
              {user.name ?? "Unknown User"}
            </h2>
            {user.role === "admin" && (
              <ShieldCheck className="h-4 w-4 shrink-0 text-orange-500" />
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
            <Envelope className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>

          {user.role && (
            <span className="mt-2 inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium capitalize text-orange-700">
              {user.role}
            </span>
          )}
        </div>
      </Link>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Footer */}
      <Button
        onPress={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.replace("/");
              },
            },
          });
        }}
        className="flex w-full items-center justify-center gap-2 rounded-none rounded-b-2xl bg-transparent py-6 font-semibold text-gray-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="h-4 w-4 text-red-600" />
        Logout
      </Button>
    </div>
  );
};

export default Profile;