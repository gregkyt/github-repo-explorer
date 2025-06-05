import { UserData, V1ErrorResponse } from "@/modules/domain/user-domain"; // adjust this path
import UserRepository from "@/modules/repository/user-repository"; // adjust this path
import UseGetUsers from "@/modules/use-case/user/use-get-users";

jest.mock("@/modules/repository/user-repository"); // 🧪 mock the repository

const MockedUserRepository = UserRepository as jest.MockedClass<
  typeof UserRepository
>;

describe("UseGetUsers", () => {
  const mockOnStart = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call onStart and onSuccess when API call is successful", async () => {
    const mockData: UserData[] = [
      {
        id: 1,
        login: "repo1",
        repos_fetch_status: 0,
        is_collapse: false,
        repos: [],
      },
    ];
    MockedUserRepository.prototype.retrieveUsers = jest.fn().mockResolvedValue({
      data: mockData,
    });

    const useCase = new UseGetUsers({
      queryParam: {},
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

    MockedUserRepository.prototype.retrieveUsers = jest
      .fn()
      .mockRejectedValue(mockError);

    const useCase = new UseGetUsers({
      queryParam: {},
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
