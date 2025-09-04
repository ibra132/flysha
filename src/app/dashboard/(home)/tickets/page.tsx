import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns-ticket";
import { getTickets } from "./lib/data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Tickets",
};

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <>
      <div className="my-5 flex items-center justify-between">
        <div className="font-bold text-2xl">Tickets</div>
      </div>
      <DataTable columns={columns} data={tickets} />
    </>
  );
}
