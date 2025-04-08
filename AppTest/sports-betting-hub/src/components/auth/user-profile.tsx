"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Welcome, {user?.name || "User"}!</h2>
        <p className="text-sm text-gray-500">Manage your account and view your bets.</p>
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="default" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};