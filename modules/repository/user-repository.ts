import { api } from "@/plugin/axios";
import { toQueryParam } from "@/utils/utils";
import { SearchUsersResponse, UserReposResponse } from "../domain/user-domain";

export default class UserRepository {
  async retrieveUsers(queryParam?: Record<string, any>) {
    return api.get<SearchUsersResponse>(
      `/search/users?${toQueryParam(queryParam)}`
    );
  }

  async retrieveUserRepos(username: string) {
    return api.get<UserReposResponse>(`/users/${username}/repos`);
  }
}
