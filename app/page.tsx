"use client";

import List from "@/components/list";
import Search from "@/components/search";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
      <List />
    </div>
  );
}
