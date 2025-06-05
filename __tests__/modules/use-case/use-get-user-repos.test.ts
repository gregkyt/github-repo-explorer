import { UserRepoData, V1ErrorResponse } from "@/modules/domain/user-domain"; // adjust this path
import UserRepository from "@/modules/repository/user-repository"; // adjust this path
import UseGetUserRepos from "@/modules/use-case/user/use-get-user-repos"; // adjust this path

jest.mock("@/modules/repository/user-repository"); // 🧪 mock the repository

const MockedUserRepository = UserRepository as jest.MockedClass<
  typeof UserRepository
>;

describe("UseGetUserRepos", () => {
  const mockUsername = "testuser";

  const mockOnStart = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onStart and onSuccess when API call is successful", async () => {
    const mockData: UserRepoData[] = [{ id: 1, name: "repo1" }];
    MockedUserRepository.prototype.retrieveUserRepos = jest
      .fn()
      .mockResolvedValue({
        data: mockData,
      });

    const useCase = new UseGetUserRepos({
      username: mockUsername,
      onStart: mockOnStart,
      onSuccess: mockOnSuccess,
      onError: mockOnError,
    });

    await useCase.execute();

    expect(mockOnStart).toHaveBeenCalled();
    expect(mockOnSuccess).toHaveBeenCalledWith(mockData);
    expect(mockOnError).not.toHaveBeenCalled();
  });

  it("should call onStart and onError when API call fails", async () => {
    const mockError: V1ErrorResponse = {
      message: "Something went wrong",
    };

    MockedUserRepository.prototype.retrieveUserRepos = jest
      .fn()
      .mockRejectedValue(mockError);

    const useCase = new UseGetUserRepos({
      username: mockUsername,
      onStart: mockOnStart,
      onSuccess: mockOnSuccess,
      onError: mockOnError,
    });

    await useCase.execute();

    expect(mockOnStart).toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalledWith(mockError);
  });
});
