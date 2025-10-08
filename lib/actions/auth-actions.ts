"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function signUp(email: string, password: string, name: string) {
  const result = await auth.api.signUpEmail({
    body: { email, password, name, callbackURL: "/dashboard" },
  });
  return result;
}

export async function signIn(email: string, password: string) {
  const result = await auth.api.signInEmail({
    body: { email, password, callbackURL: "/dashboard" },
  });
  return result;
}
export async function signInSocial(provider: "github" | "google") {
  const { url } = await auth.api.signInSocial({
    body: { provider, callbackURL: "/dashboard" },
  });
  if (url) {
    redirect(url);
  }
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  return result;
}
