"use server";
import { signIn } from "next-auth/react";

export default async function register(data) {
  console.log(data);
  try {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
