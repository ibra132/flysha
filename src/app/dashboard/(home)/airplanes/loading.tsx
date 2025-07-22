import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <LoaderCircle className="animate-spin w-10 h-10" />
    </div>
  );
}
