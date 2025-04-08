"use client";

import React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";

const sports = [
  {
    id: "formula1",
    name: "Formula 1",
    logo: "/images/f1-logo.png",
    path: "/sports/formula1"
  },
  {
    id: "basketball",
    name: "Basketball",
    logo: "/images/nba-logo.png",
    path: "/sports/basketball"
  },
  {
    id: "soccer",
    name: "Soccer",
    logo: "/images/soccer-logo.png",
    path: "/sports/soccer"
  }
];

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentSport = pathname.includes('/sports/')
    ? pathname.split('/sports/')[1]
    : "formula1";

  const handleTabChange = (value: string) => {
    router.push(`/sports/${value}`);
  };

  return (
    <div className="w-full border-t bg-muted sticky bottom-0 z-10">
      <div className="container flex justify-center px-4 py-2">
        <Tabs
          value={currentSport}
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid grid-cols-3 h-20">
            {sports.map((sport) => (
              <TabsTrigger
                key={sport.id}
                value={sport.id}
                className="data-[state=active]:bg-background flex flex-col gap-1 h-full"
              >
                <div className="h-8 relative w-12 flex items-center justify-center">
                  <Image
                    src={sport.logo}
                    alt={sport.name}
                    width={sport.id === "basketball" ? 32 : 40}
                    height={sport.id === "basketball" ? 32 : 40}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-medium">{sport.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
