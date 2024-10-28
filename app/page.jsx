"use client";
import UserWrapper from "./UserWrapper";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] h-screen overflow-hidden">
      <SessionProvider>
        <UserWrapper />
      </SessionProvider>
    </div>
  );
}
