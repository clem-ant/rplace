"use client";
import socket from "@/app/socket";
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
    <div className="text-white bg-primary p-3 rounded-full flex items-center">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="green"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <circle cx="5" cy="5" r="5" />
      </svg>
      {userCount} utilisateur{userCount > 1 ? "s" : ""} en ligne
    </div>
  );
}
