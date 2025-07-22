"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Airplane } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getFileUrl } from "@/lib/supabase";

import Link from "next/link";
import Image from "next/image";
import DeleteAirplane from "./delete-airplane";

export const columns: ColumnDef<Airplane>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const plane = row.original;
      const imageSrc = getFileUrl(plane.image);

      return (
        <Image src={imageSrc} alt="Image airplane" width={60} height={60} />
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const plane = row.original;

      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} asChild size={"sm"}>
            <Link href={`/dashboard/airplanes/edit/${plane.id}`}>
              <Pencil className="mr-2 w-4 h-4" />
              Edit
            </Link>
          </Button>
          <DeleteAirplane id={plane.id} />
        </div>
      );
    },
  },
];
