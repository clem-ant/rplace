"use client";
import React from "react";

export default function CommentCaMarche() {
  return (
    <div className="bg-primary/20 h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Comment ça marche ?
      </h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <p>
          Ce projet permet aux utilisateurs de dessiner pixel par pixel sur une
          grande toile en temps réel. Toile qui sera sur le capot lors du rallye
          4L trophy. Voici comment cela fonctionne :
        </p>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Inscription :</strong> Créez un compte ou connectez-vous
            pour commencer à dessiner.
          </li>
          <li>
            <strong>Choisissez une couleur :</strong> Sélectionnez la couleur
            que vous souhaitez utiliser pour dessiner.
          </li>
          <li>
            <strong>Commencez à dessiner :</strong> Cliquez sur les pixels de la
            grille pour les colorier. Vous pouvez voir les dessins des autres
            utilisateurs en temps réel.
          </li>
          <li>
            <strong>Rechargez vos pixels :</strong> Si vous manquez de pixels,
            vous pouvez en obtenir plus en faisant un don à notre association.
            Chaque don vous donne un certain nombre de pixels à utiliser.
          </li>
        </ol>
        <p>
          Nous espérons que vous apprécierez cette expérience collaborative et
          créative. Merci de votre participation et de votre soutien !
        </p>
      </div>
    </div>
  );
}
