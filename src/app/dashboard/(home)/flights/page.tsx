import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { columns } from "./components/columns-flight";
import { getFlights } from "./lib/data";

import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Flights",
};

export default async function FlightPage() {
  const flights = await getFlights();

  return (
    <>
      <div className="my-5 flex items-center justify-between">
        <div className="font-bold text-2xl">Flight</div>
        <Button asChild variant={"default"}>
          <Link href={"/dashboard/flights/create"}>
            <Plus className="mr-2 w-4 h-4" />
            Tambah Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={flights} />
    </>
  );
}
