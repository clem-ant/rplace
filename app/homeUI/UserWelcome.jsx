"use client";
import { useCanvas } from "@/hooks/useCanvas"; // Assume we'll create this context
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserWelcome() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const { connectToCanvas } = useCanvas(); // Hook to connect to the canvas

  useEffect(() => {
    async function fetchUsername() {
      if (session?.user?.email) {
        // Fetch username from API route instead of directly using Prisma
        const response = await fetch(`/api/user?email=${session.user.email}`);
        const data = await response.json();
        if (data.username) {
          setUsername(data.username);
          connectToCanvas(data.username); // Connect to canvas with username
        }
      }
    }

    fetchUsername();
  }, [session, connectToCanvas]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this content.</div>;
  }

  return (
    <div>
      <h1>Welcome, {username || "User"}!</h1>
      <p>Enjoy drawing on the canvas!</p>
      {/* Add instructions or controls for the canvas here */}
    </div>
  );
}
