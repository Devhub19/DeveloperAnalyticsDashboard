const User = require("../models/user");

const Analytics = require("../models/analytics");

let successCount = 0;
let failureCount = 0;

const register = async (req, res, next) => {
  const data = { userId: Object.keys(req.body)[0] };
  successCount = successCount + 1;
  const dateData = new Date();
  try {
    const exUser = await User.findOne({ userId: data.userId }).select({
      userId: 1,
    });
    if (exUser) {
      failureCount = failureCount + 1;
      res.status(500).send({
        message: "User exists",
      });
      return;
    }
    const user = await User({
      userId: data.userId,
      status: "Success",
      errorMessage: null,
      successCount: successCount,
      date: dateData,
      requestData: req.body,
      responseData: res.body,
    });
    await user.save();
    await updateAnalyticsData();
    next();
    res.send({
      message: "User Id Saved successfully",
    });
  } catch (error) {
    const err = {
      status: 500,
      message: "Internal server error!",
      error,
    };
    const user = await User({
      userId: data.userId,
      status: "Failure",
      errorMessage: error.message,
      successCount: successCount,
      date: dateData,
      requestData: req.body,
      responseData: res.body,
    });
    await user.save();
    await updateAnalyticsData();
    failureCount = failureCount + 1;
    next(err);
  }
};

const updateAnalyticsData = async (totalUsers) => {
  try {
    const analytics = await Analytics.findOne();
    if (analytics) {
      analytics.totalUsers = totalUsers || analytics.totalUsers;
      analytics.successCount = await User.countDocuments({ status: "Success" });
      analytics.failureCount = await User.countDocuments({ status: "Failure" });

      await analytics.save();
    } else {
      await Analytics.create({
        totalUsers: totalUsers || 0,
        successCount: await User.countDocuments({ status: "Success" }),
        failureCount: await User.countDocuments({ status: "Failure" }),
      });
    }
  } catch (error) {
    console.error("Error updating analytics data:", error);
  }
};

const countUniqueUsers = async () => {
  try {
    const uniqueUsers = await User.distinct("userId");
    const totalUniqueUsers = uniqueUsers.length;
    details = {
      successCountValue: successCount,
      uniqueUser: totalUniqueUsers,
      failureCountValue: failureCount,
    };
    await updateAnalyticsData(totalUniqueUsers);
  } catch (error) {
    console.error("Error:", error);
  }
};

const analyticsData = async (req, res, next) => {
  try {
    const analytics = await Analytics.findOne();
    res.status(200).send(analytics);
    return;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error:", error);
    const err = {
      status: 500,
      message: "Internal server error!",
      error,
    };
    next(err);
  }
};

module.exports = {
  register,
  countUniqueUsers,
  analyticsData,
  getAllUsers,
  updateAnalyticsData,
};
