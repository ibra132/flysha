"use server";

import { ActionResult } from "next/dist/server/app-render/types";
import { userSchema } from "../../sign-up/lib/validation";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

export async function signInUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = userSchema.pick({ email: true, password: true }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "User not found",
      errorDesc: ["User not found"],
    };
  }

  const isValidPassword = await bcrypt.compare(
    validate.data.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      errorTitle: "Error Password",
      errorDesc: ["Invalid password"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookies = await lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookies.name,
    sessionCookies.value,
    sessionCookies.attributes
  );

  return redirect("/");
}
