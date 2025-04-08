"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/store/auth-store";
import { toast } from "sonner";
import axios from "axios";

interface LoginFormProps {
  onClose: () => void;
  onRegister: () => void;
}

export const LoginForm = ({ onClose, onRegister }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        const { user, token } = response.data;
        login(user, token);
        toast.success("Successfully signed in!");
        onClose();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="pt-2">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Button variant="link" onClick={onRegister} className="p-0 h-auto">
          Create one
        </Button>
      </div>
      <div className="text-xs text-muted-foreground text-center pt-4">
        <p>For demo, use:</p>
        <p>Email: demo@example.com</p>
        <p>Password: password</p>
      </div>
    </form>
  );
};
