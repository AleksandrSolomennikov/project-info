"use client";

import type React from "react";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Navigation />
    </div>
  );
}
