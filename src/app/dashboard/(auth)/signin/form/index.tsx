"use client";

import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionResult, handleSignIn } from "./actions";
import React, { FC, useActionState } from "react";

interface FormSignInProps {
  // Define any props if needed
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Submit"}
    </Button>
  );
};

const FormSignIn: FC<FormSignInProps> = ({}) => {
  const [state, formAction] = useActionState(handleSignIn, initialFormState);

  console.log(state);

  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {state.errorTitle !== null && (
          <div className="mx-auto my-7 p-4 w-[400px]  bg-red-500 text-white rounded-md p">
            <div className="font-bold mb-4">{state.errorTitle}</div>

            <ul className="list-disc list-inside">
              {state.errorDesc?.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input type="email" placeholder="Email..." name="email" required />
            <Input
              type="password"
              placeholder="Password..."
              name="password"
              required
            />

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
