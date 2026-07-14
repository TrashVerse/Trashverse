"use client";

import { useMemo } from "react";
import Image from "next/image";

const samplePartners = [

  {
    name: "Abia State Ministry of Science and Technology",
    logoUrl: "/images/science.jpeg",
  },
  {
    name: "Starich Environmental",
    logoUrl: "/images/starich.png",
  },
    {
    name: "Innovation Growth Hub",
    logoUrl: "/images/ighub.png",
  },
];

export default function OurPartners({ partners = samplePartners }) {
  const partnerList = useMemo(
    () => (partners.length ? partners : samplePartners),
    [partners]
  );

  return (
    <section className="w-full bg-white px-6 py-16 md:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold text-slate-700 sm:text-4xl">
          Our Partners
        </h2>

        <div className="mx-auto mt-4 flex items-center justify-center h-13">
          <span className="h-2.5 w-2.5 rotate-45 bg-emerald-600"></span>
          <span className="h-0.5 w-28 bg-emerald-600"></span>
          <span className="h-2.5 w-2.5 rotate-45 bg-emerald-600"></span>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 ">
          In collaboration with strategic partners, we develop advanced waste
          management strategies that transform waste into valuable assets,
          driving a cleaner and eco-friendly future.
        </p>
        <div className="h-10"></div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
          {partnerList.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={250}
                height={150}
                className="h-auto max-h-32 w-auto object-contain"
                priority
              />

            <p className="mt-4 text-lg font-bold text-emerald-700 tracking-wide">
              {partner.name}
            </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}