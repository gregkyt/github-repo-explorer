import { FetchStatus } from "@/constant/fetch-status";
import {
  SearchUsersResponse,
  UserData,
  UserReposResponse,
} from "@/modules/domain/user-domain";
import UseGetUserRepos from "@/modules/use-case/user/use-get-user-repos";
import UseGetUsers from "@/modules/use-case/user/use-get-users";
import { create } from "zustand";

export type UserState = {
  search?: string;
  users?: UserData[];
  totalCount: number;

  perPage: number;
  page: number;

  fetchStatusPage: FetchStatus;
  fetchStatusButton: FetchStatus;
  message: string;
};

export type UserActions = {
  getSearchUsers: (search?: string) => void;
  getUserRepos: (username: string, isCollapse: boolean) => void;
  updateUsers: (username: string, data: Record<string, any>) => void;
};

export type UserStore = UserState & UserActions;

export const defaultUserStore = (): UserState => {
  return {
    users: [],
    totalCount: 0,

    perPage: 30,
    page: 1,

    fetchStatusPage: FetchStatus.IDLE,
    fetchStatusButton: FetchStatus.IDLE,
    message: "",
  };
};

export const createUserStore = create<UserStore>()((set) => ({
  ...defaultUserStore(),
  getSearchUsers: (search) => {
    const currentState = createUserStore.getState();
    const queryParam: Record<string, any> = {
      q: search,
      per_page: currentState.perPage,
      page: currentState.page,
    };
    new UseGetUsers({
      queryParam,
      onStart: () => {
        set(() => ({
          fetchStatusPage: FetchStatus.LOADING,
        }));
      },
      onSuccess: (data: SearchUsersResponse) => {
        set(() => ({
          search,
          page: queryParam?.page,
          users: data.items,
          totalCount: data.total_count,
          fetchStatusPage: FetchStatus.SUCCESS,
        }));
      },
      onError: (error) => {
        set(() => ({
          message: error.message,
          fetchStatusPage: FetchStatus.ERROR,
        }));
      },
    }).execute();
  },
  getUserRepos: (username: string, isCollapse: boolean) => {
    new UseGetUserRepos({
      username,
      onStart: () => {
        const currentState = createUserStore.getState();
        currentState.updateUsers(username, {
          is_collapse: isCollapse,
          repos: [],
          repos_fetch_status: FetchStatus.LOADING,
        });
      },
      onSuccess: (data: UserReposResponse) => {
        const currentState = createUserStore.getState();
        currentState.updateUsers(username, {
          is_collapse: isCollapse,
          repos: data,
          repos_fetch_status: FetchStatus.SUCCESS,
        });
      },
      onError: (error) => {
        set(() => ({
          message: error.message,
          fetchStatusPage: FetchStatus.ERROR,
        }));
      },
    }).execute();
  },
  updateUsers: (username, data) => {
    const currentState = createUserStore.getState();
    const users = currentState.users;
    if (users) {
      const index = users.findIndex((user) => user.login === username);
      if (index !== -1) {
        const user = users[index];
        const updateUser = {
          ...user,
          ...data,
        };
        users[index] = updateUser;

        set(() => ({
          users,
        }));
      }
    }
  },
}));
