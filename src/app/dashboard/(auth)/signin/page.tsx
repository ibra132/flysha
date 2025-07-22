import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormSignIn from "./form";

const SignInPage = async ({}) => {
  const { user, session } = await getUser();

  if (session && user?.role === "ADMIN") {
    redirect("/dashboard");
  }
  return <FormSignIn />;
};

export default SignInPage;
