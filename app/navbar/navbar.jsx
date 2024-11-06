import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 absolute top-0 left-0  z-50">
      <Link href="/">
        <Image src="/favicon.png" alt="logo" width={32} height={32} />
      </Link>
    </div>
  );
}
