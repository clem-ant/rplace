import LoginBtn from "@/components/login-btn";
import { useSession } from "next-auth/react";
import React from "react";

export default function UserInformation() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row gap-4 justify-center">
      {session?.user?.name && (
        <>
          Bonjour {session?.user?.name}
          <p> Vous avez {session?.user?.pixelCount} pixels</p>
        </>
      )}
      <LoginBtn />
    </div>
  );
}
