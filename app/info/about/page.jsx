"use client";
import React from "react";

export default function About() {
  return (
    <div className="bg-primary/20 h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        À propos de ce projet
      </h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <p>
          Ce projet est inspiré par le célèbre projet r/place de Reddit, où les
          utilisateurs peuvent collaborer pour dessiner pixel par pixel sur une
          grande toile. Nous avons recréé cette expérience pour permettre aux
          utilisateurs de dessiner ensemble en temps réel sur une grille
          configurable.
        </p>
        <p>
          Ce projet a été réalisé dans le cadre du 4L Trophy, un raid étudiant
          solidaire qui se déroule chaque année. Le 4L Trophy est une aventure
          humaine et sportive qui réunit des milliers d'étudiants pour traverser
          le désert marocain en Renault 4L. L'objectif principal est d'apporter
          des fournitures scolaires et sportives aux enfants défavorisés du
          Maroc.
        </p>
        <p>
          En participant à ce projet, vous contribuez à une cause noble et aidez
          à faire une différence dans la vie de nombreux enfants. Chaque don que
          vous faites pour obtenir des pixels sera utilisé pour soutenir notre
          participation au 4L Trophy et pour financer les fournitures que nous
          apporterons.
        </p>
        <p>
          Merci de votre soutien et de votre participation à ce projet.
          Ensemble, nous pouvons créer quelque chose de beau tout en aidant ceux
          qui en ont besoin.
        </p>
      </div>
    </div>
  );
}
