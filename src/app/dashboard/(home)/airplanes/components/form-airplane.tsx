"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useActionState } from "react";
import { saveAirplane, updateAirplane } from "../lib/action";
import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { Airplane } from "@/generated/prisma";
import SubmitFormButton from "../../components/submit-form-button";

interface FormAirplaneProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Airplane | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormAirplane: FC<FormAirplaneProps> = ({ type, defaultValues }) => {
  const updateAirplaneWithId = (_state: ActionResult, formData: FormData) => {
    return updateAirplane(null, defaultValues?.id as string, formData);
  };

  const [state, formAction] = useActionState(
    type === "ADD" ? saveAirplane : updateAirplaneWithId,
    initialFormState
  );

  return (
    <form action={formAction} className="w-[40%] space-y-5">
      {state.errorTitle !== null && (
        <div className="my-7 p-4 w-[400px]  bg-red-500 text-white rounded-md p">
          <div className="font-bold mb-4">{state.errorTitle}</div>

          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value: string, index: number) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="code">Kode Pesawat</Label>
        <Input
          id="code"
          name="code"
          placeholder="Kode pesawat..."
          required
          defaultValue={defaultValues?.code}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Nama Pesawat</Label>
        <Input
          id="name"
          name="name"
          placeholder="Nama pesawat..."
          required
          defaultValue={defaultValues?.name}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Foto</Label>
        <Input
          id="image"
          name="image"
          type="file"
          placeholder="Upload foto..."
          required
        />
      </div>

      <SubmitFormButton />
    </form>
  );
};

export default FormAirplane;
