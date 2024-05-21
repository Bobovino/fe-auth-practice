"use client"
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestPasswordReset(email);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Request Password Reset</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border border-gray-300"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Request Reset</button>
      </form>
    </div>
  );
}
