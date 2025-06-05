import {
  SearchUsersResponse,
  V1ErrorResponse,
} from "@/modules/domain/user-domain";
import UserRepository from "../../repository/user-repository";
import BaseUseCase from "../base-use-case";

interface IUseGetUsers {
  queryParam?: Record<string, any>;
  onStart: () => void;
  onSuccess: (data: SearchUsersResponse) => void;
  onError?: (error: V1ErrorResponse) => void;
}

export default class UseGetUsers implements BaseUseCase {
  repository = new UserRepository();
  queryParam?: Record<string, any>;
  onStart: () => void;
  onSuccess: (data: SearchUsersResponse) => void;
  onError?: (error: V1ErrorResponse) => void;

  constructor({ queryParam, onStart, onSuccess, onError }: IUseGetUsers) {
    this.queryParam = queryParam;
    this.onStart = onStart;
    this.onSuccess = onSuccess;
    this.onError = onError;
  }

  async execute() {
    this.onStart();
    try {
      const { data } = await this.repository.retrieveUsers(this.queryParam);
      this.onSuccess(data);
    } catch (error) {
      if (typeof this.onError === "function") {
        this.onError(error as V1ErrorResponse);
      }
    }
  }
}
