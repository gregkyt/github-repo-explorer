import UserRepository from "@/modules/repository/user-repository";
import { api } from "@/plugin/axios";

jest.mock("@/plugin/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("UserRepository", () => {
  const repository = new UserRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call api.get with correct URL for retrieveUsers", async () => {
    const mockResponse = { data: { items: [{ id: 1, login: "john" }] } };
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await repository.retrieveUsers({ q: "john" });

    expect(api.get).toHaveBeenCalledWith("/search/users?q=john");
    expect(result).toEqual(mockResponse);
  });

  it("should call api.get with correct URL for retrieveUserRepos", async () => {
    const mockResponse = { data: [{ id: 1, name: "repo1" }] };
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await repository.retrieveUserRepos("john");

    expect(api.get).toHaveBeenCalledWith("/users/john/repos");
    expect(result).toEqual(mockResponse);
  });
});
