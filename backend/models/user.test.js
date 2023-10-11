const mongoose = require("mongoose");
const UserModel = require("./user.js");

describe("User Model", () => {
  it("should fail to save a user with missing required fields", async () => {
    const user = new UserModel({
      userId: "testuser123",
    });

    let error = null;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.status).toBeDefined();
    expect(error.errors.successCount).toBeDefined();
  });
});
