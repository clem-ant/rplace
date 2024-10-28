"use client";
import { useCanvas } from "@/hooks/useCanvas"; // Assume we'll create this context
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserWelcome() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this content.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome, {session.user.username}!</h1>
      <p>Enjoy drawing on the canvas!</p>
      {/* Add instructions or controls for the canvas here */}
    </div>
  );
}
