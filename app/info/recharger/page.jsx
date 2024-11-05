"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

export default function Recharger() {
  return (
    <div className="bg-primary/20 h-screen flex flex-col justify-center items-center p-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Comment recharger vos pixels ?
      </h2>
      <div className="max-w-md text-center space-y-4">
        <p>
          Les pixels sont automatiquement ajoutés à votre compte lorsque vous
          faites un don à notre association via HelloAsso.
          <br />
          <strong>1€ = 50 pixels</strong>
        </p>
        <p>Pour faire un don, cliquez sur le bouton ci-dessous.</p>
      </div>
      <Link href="/" className="mt-6">
        <Button className="px-6 py-3 text-lg">Faire un don</Button>
      </Link>
    </div>
  );
}
