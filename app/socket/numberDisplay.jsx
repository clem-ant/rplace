"use client";
import React, { useEffect, useState } from "react";
import { socket } from "@/app/socket";
export default function NumberDisplay() {
  const [clientCount, setClientCount] = useState(0);
  useEffect(() => {
    socket.on("updateClientCount", (count) => {
      setClientCount(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <p>Connected Users: {clientCount}</p>
    </div>
  );
}
