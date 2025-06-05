"use client";

import { FetchStatus } from "@/constant/fetch-status";
import { UserData } from "@/modules/domain/user-domain";
import { createUserStore } from "@/store/user-store";
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";

const Loading = () => {
  return <div className="loading loading-dots"></div>;
};

const ListUsers = () => {
  const { search, users, totalCount, getUserRepos, updateUsers } =
    createUserStore();

  function onCollapseUser(user: UserData, isCollapse: boolean) {
    if (user.login) {
      if (user.repos === undefined || user.repos?.length === 0)
        getUserRepos(user.login, isCollapse);
      else updateUsers(user.login, { is_collapse: isCollapse });
    }
  }

  if (users?.length === 0) return null;
  return (
    <div>
      <div className="mt-2 mb-2">
        <label>
          {`Found ${totalCount} results for `}
          <span className="font-semibold">{search}</span>
        </label>
      </div>
      {users?.map((user, index) => {
        return (
          <div
            key={user.id}
            className={`collapse collapse-arrow bg-base-100 border border-base-300 ${
              index === 0 ? "mt-0" : "mt-2"
            }`}
          >
            <input
              type="checkbox"
              checked={user.is_collapse ?? false}
              onChange={(e) => {
                if (user.login) onCollapseUser(user, e.target.checked);
              }}
            />
            <div className="collapse-title font-semibold">{user.login}</div>
            <ListUserRepos user={user} />
          </div>
        );
      })}
    </div>
  );
};

const ListUserRepos = ({ user }: { user: UserData }) => {
  switch (user.repos_fetch_status) {
    case FetchStatus.LOADING:
      return <Loading />;
    case FetchStatus.SUCCESS:
      if (user.is_collapse) {
        return (
          <div className="pl-4 pb-4 pr-4">
            {user.repos.map((repo, index) => {
              return (
                <div
                  key={repo.id}
                  className={`bg-base-100 border border-base-300 p-2 rounded-md ${
                    index === 0 ? "mt-0" : "mt-2"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <a
                      className="font-semibold"
                      href={repo.html_url}
                      target="_blank"
                    >
                      {repo.name}
                    </a>
                    <div className="flex items-center gap-2">
                      <label className="font-semibold">
                        {repo.stargazers_count}
                      </label>
                      <FaStar />
                    </div>
                  </div>
                  <p>{repo.description}</p>
                </div>
              );
            })}
          </div>
        );
      } else return null;
    default:
      return null;
  }
};

export default function List() {
  const { fetchStatusPage } = createUserStore();

  const isLoading = useMemo(() => {
    return fetchStatusPage === FetchStatus.LOADING;
  }, [fetchStatusPage]);

  return <div>{isLoading ? <Loading /> : <ListUsers />}</div>;
}
