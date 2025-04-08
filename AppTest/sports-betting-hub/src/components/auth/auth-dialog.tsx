"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { useAuthStore } from "@/lib/store/auth-store";
import { UserProfile } from "./user-profile";

export const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "profile">("login");
  const { isAuthenticated } = useAuthStore();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (isAuthenticated) {
      setMode("profile");
    } else {
      setMode("login");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="default">
          <FaUser className="mr-2 h-4 w-4" />
          {isAuthenticated ? "My Account" : "Sign In"}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {mode === "login"
              ? "Sign In"
              : mode === "register"
                ? "Create Account"
                : "My Account"}
          </SheetTitle>
          <SheetDescription>
            {mode === "login"
              ? "Sign in to your account to place bets"
              : mode === "register"
                ? "Create a new account to start betting"
                : "Manage your profile and view your bets"}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {mode === "login" && (
            <LoginForm
              onClose={() => setIsOpen(false)}
              onRegister={() => setMode("register")}
            />
          )}
          {mode === "register" && (
            <RegisterForm
              onClose={() => setIsOpen(false)}
              onLogin={() => setMode("login")}
            />
          )}
          {mode === "profile" && (
            <UserProfile onClose={() => setIsOpen(false)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
