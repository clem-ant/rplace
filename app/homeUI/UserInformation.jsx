import LoginBtn from "@/components/login-btn";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserInformation() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user?.name ? (
        <div className="backdrop-blur-xl bg-primary/20 border-none shadow-xl p-4 rounded-xl space-y-4 flex flex-col items-center justify-center min-w-[200px]">
          <div className="flex flex-row gap-4 items-start justify-center">
            <Image
              className="rounded-full"
              src={session?.user?.image}
              alt={session?.user?.name}
              width={50}
              height={50}
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            {session?.user?.name && (
              <>
                <p>
                  <span className="font-bold">{session?.user?.pixelCount}</span>{" "}
                  pixel
                  {session?.user?.pixelCount > 1 ? "s" : ""} disponible
                  {session?.user?.pixelCount > 1 ? "s" : ""}
                </p>
                {session?.user?.pixelCount <= 0 && (
                  <p>
                    <Link
                      href="/recharger"
                      className="text-primary hover:underline transition-all duration-100"
                    >
                      Comment recharger ?
                    </Link>
                  </p>
                )}
              </>
            )}
            <LoginBtn />
          </div>
        </div>
      ) : (
        <LoginBtn />
      )}
    </>
  );
}
