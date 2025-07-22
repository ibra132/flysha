import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteAirplane } from "../lib/action";

interface DeleteAirplaneProps {
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

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const deleteAirplaneWithId = deleteAirplane.bind(null, id);

  return (
    <form action={deleteAirplaneWithId}>
      <SubmitButton />
    </form>
  );
};

export default DeleteAirplane;
