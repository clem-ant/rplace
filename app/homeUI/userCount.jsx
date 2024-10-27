"use client";
import { socket } from "@/app/socket";
import { useEffect, useState } from "react";

export default function UserCount() {
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    socket.on("updateClientCount", (count) => {
      setUserCount(count);
    });
    socket.emit("getClientCount");
  }, []);
  return (
    <div className="text-white bg-primary  p-3">
      {userCount} utilisateur{userCount > 1 ? "s" : ""} en ligne
    </div>
  );
}
