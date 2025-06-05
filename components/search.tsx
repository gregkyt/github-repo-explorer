"use client";

import { createUserStore } from "@/store/user-store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const { getSearchUsers } = createUserStore();
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  return (
    <>
      <div className="flex">
        <input
          className="grow input input-bordered"
          onChange={(e) => {
            const { value } = e.target;
            setSearch(value);
          }}
        />
      </div>
      <button
        className="btn btn-block mt-4"
        disabled={[undefined, null, ""].includes(search)}
        onClick={() => getSearchUsers(search)}
      >
        Search
      </button>
    </>
  );
}
