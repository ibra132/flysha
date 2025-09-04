import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteFlight } from "../lib/action";

interface DeleteFlightProps {
  id: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={"destructive"}
      size="sm"
      type="submit"
      className="w-full cursor-pointer"
      disabled={pending}
    >
      <Trash className="mr-2 w-4 h-4" />
      Delete
    </Button>
  );
}

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
  const deleteFlightWithId = deleteFlight.bind(null, id);

  return (
    <form action={deleteFlightWithId}>
      <SubmitButton />
    </form>
  );
};

export default DeleteFlight;
