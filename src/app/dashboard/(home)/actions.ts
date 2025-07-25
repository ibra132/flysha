"use server";

import { getUser, lucia } from "@/lib/auth";
import type { ActionResult } from "../(auth)/signin/form/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<ActionResult> {
  const { session } = await getUser();

  if (!session) {
    return {
      errorTitle: "Error",
      errorDesc: ["Unauthorized"],
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard/signin");
}
