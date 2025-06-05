import { FetchStatus } from "@/constant/fetch-status";
import { UserData, UserReposResponse } from "@/modules/domain/user-domain";
import UseGetUserRepos from "@/modules/use-case/user/use-get-user-repos";
import UseGetUsers from "@/modules/use-case/user/use-get-users";
import { createUserStore } from "@/store/user-store";
import { describe } from "node:test";
import { act } from "react";

jest.mock("@/modules/use-case/user/use-get-users");
jest.mock("@/modules/use-case/user/use-get-user-repos");

const mockedUseGetUsers = UseGetUsers as jest.MockedClass<typeof UseGetUsers>;
const mockedUseGetUserRepos = UseGetUserRepos as jest.MockedClass<
  typeof UseGetUserRepos
>;

describe("user-store", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update users and set fetchStatusPage to SUCCESS on getSearchUsers success", async () => {
    const store = createUserStore.getState();

    const mockUsers: UserData[] = [
      {
        login: "john",
        id: 1,
        repos: [],
        repos_fetch_status: 0,
        is_collapse: false,
      },
      {
        login: "doe",
        id: 2,
        repos: [],
        repos_fetch_status: 0,
        is_collapse: false,
      },
    ];

    const executeMock = jest.fn().mockImplementation(() => {
      const context = mockedUseGetUsers.mock.calls[0][0];
      context.onStart();
      context.onSuccess({
        items: mockUsers,
        total_count: 2,
      });
    });

    mockedUseGetUsers.mockImplementation((params: any) => ({
      ...params,
      execute: executeMock,
    }));

    await act(() => {
      store.getSearchUsers("john");
    });

    const state = createUserStore.getState();
    expect(state.users).toEqual(mockUsers);
    expect(state.totalCount).toBe(2);
    expect(state.fetchStatusPage).toBe(FetchStatus.SUCCESS);
  });

  it("should update user repos and set repos_fetch_status to SUCCESS", async () => {
    const store = createUserStore.getState();
    store.users = [
      {
        id: 1,
        login: "john",
        repos: [],
        repos_fetch_status: 0,
        is_collapse: false,
      },
    ];

    const mockRepos: UserReposResponse = [{ id: 1, name: "repo1" }];

    const executeMock = jest.fn().mockImplementation(() => {
      const context = mockedUseGetUserRepos.mock.calls[0][0];
      context.onStart();
      context.onSuccess(mockRepos);
    });

    mockedUseGetUserRepos.mockImplementation((params: any) => ({
      ...params,
      execute: executeMock,
    }));

    await act(() => {
      store.getUserRepos("john", true);
    });

    const updatedUser = store.users?.find((u) => u.login === "john");
    expect(updatedUser?.repos).toEqual(mockRepos);
    expect(updatedUser?.repos_fetch_status).toBe(FetchStatus.SUCCESS);
  });

  it("should update user by login", () => {
    const store = createUserStore.getState();
    store.users = [
      {
        id: 1,
        login: "john",
        repos: [],
        repos_fetch_status: 0,
        is_collapse: false,
      },
    ];

    store.updateUsers("john", {
      is_collapse: true,
    });

    const updatedUser = store.users?.find((u) => u.login === "john");
    expect(updatedUser?.is_collapse).toBe(true);
  });
});
