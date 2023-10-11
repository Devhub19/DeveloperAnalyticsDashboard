const request = require("supertest");
const app = require("../app");
const { analyticsData } = require("./user.controller");

describe("analyticsData function", () => {
  it("should respond with status 200 and return details", async () => {
    const mockDetails = {
      successCountValue: 10,
      uniqueUser: 5,
      failureCountValue: 2,
    };

    const mockRequest = {};
    const mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    await analyticsData(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
