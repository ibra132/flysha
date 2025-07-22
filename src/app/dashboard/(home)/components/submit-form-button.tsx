import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

import React from "react";

export default function SubmitFormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
}
