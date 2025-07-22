import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./components/columns-airplane";
import { getAirplanes } from "./lib/data";

import Link from "next/link";
import React from "react";

export default async function AirplanePage() {
  const planes = await getAirplanes();

  return (
    <>
      <div className="my-5 flex items-center justify-between">
        <div className="font-bold text-2xl">Airplane</div>
        <Button asChild variant={"default"}>
          <Link href={"/dashboard/airplanes/create"}>
            <Plus className="mr-2 w-4 h-4" />
            Tambah Data
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={planes ?? []} />
    </>
  );
}
