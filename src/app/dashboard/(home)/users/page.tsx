import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";
import React from "react";
import { columns } from "./components/user-columns";
import { getCustomers } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Users",
};

export default async function UsersPage() {
  const users = await getCustomers();

  return (
    <>
      <div className="my-5 flex items-center justify-between">
        <div className="font-bold text-2xl">Users</div>
      </div>
      <DataTable columns={columns} data={users} />
    </>
  );
}
