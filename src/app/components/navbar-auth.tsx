import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { logout } from "../(home)/lib/actions";

export default async function NavbarAuth() {
  const { session, user } = await getUser();

  return (
    <div className="inline-flex items-center gap-3">
      <Link
        href={session && user.role === "CUSTOMER" ? "/my-tickets" : "/sign-in"}
        className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
      >
        {session && user.role === "CUSTOMER" ? "My Tickets" : "Sign In"}
      </Link>

      {session && user.role === "CUSTOMER" && (
        <form action={logout}>
          <Button variant="destructive" className="rounded-full cursor-pointer">
            <LogOut className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
