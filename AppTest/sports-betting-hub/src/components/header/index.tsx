"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { NewsSection } from "@/components/news";
import Link from "next/link";
import { FaUser, FaBell } from "react-icons/fa";
import { AuthDialog } from "@/components/auth/auth-dialog";

export const Header = () => {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">BetHero</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 justify-end">
          <NewsSection />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <FaBell className="h-5 w-5" />
          </Button>
          <AuthDialog />
        </div>
      </div>
    </header>
  );
};
