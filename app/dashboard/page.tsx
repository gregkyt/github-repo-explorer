"use client";

import { useSearchParams } from "next/navigation";
import List from "./components/list";
import Search from "./components/search";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="p-4">
      <Search accessToken={token} />
      <List />
    </div>
  );
}
