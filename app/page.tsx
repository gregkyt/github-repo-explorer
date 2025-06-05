"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clientId = process.env.GITHUB_CLIENT_ID;
  const state = process.env.GITHUB_STATE;

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) onSuccessLogin(token);
  }, [token]);

  async function onSuccessLogin(token: string) {
    router.push(`/dashboard?token=${token}`);
  }

  function goToGitHubLogin() {
    setIsLoading(true);
    router.push(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}`
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className={`flex btn ${isLoading ? "loading loading-dots" : ""}`}
        onClick={goToGitHubLogin}
      >
        <label>Login with GitHub</label>
        <FaGithub />
      </button>
    </div>
  );
}
