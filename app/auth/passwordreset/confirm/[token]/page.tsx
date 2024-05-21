"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword } = useAuthStore();
  const router = useRouter();
  const {token} = useParams()


  useEffect(() => {
    if (!token || (Array.isArray(token) && token.length === 0)) {
      alert("Invalid or missing token");
      router.push("/auth/passwordreset/request");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (typeof token === 'string') {
      const success = await resetPassword(token, password);
      if (success) {
        alert("Password reset successful");
        router.push("/auth/login");
      } else {
        alert("Password reset failed");
      }
    } else {
      alert("Invalid or missing token");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="p-2 border border-gray-300"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="p-2 border border-gray-300"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Reset Password</button>
      </form>
    </div>
  );
}
