"use server";

import { redirect } from "next/navigation";
import { formSchema } from "./validation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import prisma from "../../../../../../lib/prisma";

export interface ActionResult {
  errorTitle: string | null;
  errorDesc: string[] | null;
}

export async function handleSignIn(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const values = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email not found"],
    };
  }

  const validPassword = await bcrypt.compare(
    values.data.password,
    existingUser.password
  );

  if (!validPassword) {
    return {
      errorTitle: "Error",
      errorDesc: ["Password not match"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookies = await lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookies.name,
    sessionCookies.value,
    sessionCookies.attributes
  );

  return redirect("/dashboard");
}
