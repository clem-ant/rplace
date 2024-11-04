"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

export default function Recharger() {
  return (
    <div className="bg-primary/20 h-screen">
      <h2 className="text-2xl font-bold text-center">
        Comment recharger vos pixels ?
      </h2>
      <div className="flex flex-col gap-4">
        <p className="text-center">
          Les pixels sont automatiquement ajouté à votre compte lorsque vous
          faites un dons à notre association depuis HelloAsso.
          <br />
          1€ = 50 pixels
        </p>
        <p className="text-center">
          Pour faire un don, cliquez sur le bouton ci-dessous.
        </p>
      </div>
      <Link href="/">
        <Button className="">Faire un don</Button>
      </Link>
    </div>
  );
}
