"use client";

import { createUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";

interface SearchProps {
  accessToken?: string | null;
}

export default function Search(props: SearchProps) {
  const { getSearchUsers } = createUserStore();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (props.accessToken) {
      localStorage.setItem("token", props.accessToken);
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
