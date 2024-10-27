"use client";
import React, { useState, useEffect } from "react";
import { socket } from "@/app/socket";

export default function UserCount() {
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    socket.on("updateClientCount", (count) => {
      setUserCount(count);
    });
    socket.emit("getClientCount");
  }, []);
  return <div>{userCount}</div>;
}
