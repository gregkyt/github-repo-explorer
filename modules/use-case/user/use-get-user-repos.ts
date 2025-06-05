import {
  UserReposResponse,
  V1ErrorResponse,
} from "@/modules/domain/user-domain";
import UserRepository from "../../repository/user-repository";
import BaseUseCase from "../base-use-case";

interface IUseGetUserRepos {
  username: string;
  onStart: () => void;
  onSuccess: (data: UserReposResponse) => void;
  onError?: (error: V1ErrorResponse) => void;
}

export default class UseGetUserRepos implements BaseUseCase {
  repository = new UserRepository();
  username: string;
  onStart: () => void;
  onSuccess: (data: UserReposResponse) => void;
  onError?: (error: V1ErrorResponse) => void;

  constructor({ username, onStart, onSuccess, onError }: IUseGetUserRepos) {
    this.username = username;
    this.onStart = onStart;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  async execute() {
    this.onStart();
    try {
      const { data } = await this.repository.retrieveUserRepos(this.username);
      this.onSuccess(data);
    } catch (error) {
      if (typeof this.onError === "function") {
        this.onError(error as V1ErrorResponse);
      }
    }
  }
}
