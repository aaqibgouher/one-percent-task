const { UserModel, TodoModel } = require("../models");
const mongoose = require("mongoose");

const getUserByEmail = async (email, password = false) => {
  return password
    ? await UserModel.findOne({ email })
    : await UserModel.findOne({ email }).select("-password");
};

// get user by id, default password hidden else do
const getUserById = async (id, password = false) => {
  return password
    ? await UserModel.findOne({ _id: id })
    : await UserModel.findOne({ _id: id }).select("-password");
};

const getUserTodos = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";

  const { userId, sortBy, sortOrder, priority } = payload;

  let query = { user: userId };

  console.log(new Date().setHours(23, 59, 59, 999), "date");
  if (sortBy === "DUE_TASK") {
    query.completedBy = {
      $lt: new Date().setHours(23, 59, 59, 999),
    };
    query.isCompleted = false;
  } else if (sortBy === "TODAYS_DATE") {
    query.completedBy = {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    };
  } else if (sortBy === "TOMORROWS_DATE") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    query.completedBy = {
      $gte: tomorrow.setHours(0, 0, 0, 0),
      $lt: tomorrow.setHours(23, 59, 59, 999),
    };
  }

  if (priority) {
    query.priority = priority || "LOW";
  }

  let sort = {};

  if (sortOrder === "ASC") {
    sort = { createdAt: 1 };
  } else {
    sort = { createdAt: -1 };
  }

  return await TodoModel.find(query).sort(sort);
};

const addUserTodo = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.title) throw "Title is required";
  if (!payload || !payload.description) throw "Description is required";
  if (!payload || !payload.completedBy) throw "Completed by is required";
  if (!payload || (payload.isCompleted && !payload.completedOn))
    throw "Completed on is required";

  const {
    userId,
    title,
    description,
    completedBy,
    isCompleted,
    completedOn,
    priority,
  } = payload;

  const todo = new TodoModel({
    user: userId,
    title,
    description,
    completedBy,
    isCompleted: isCompleted || false,
    completedOn: completedOn || "",
    priority: priority || "LOW",
  });

  return await todo.save();
};

const deleteUserTodo = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.todoId) throw "Todo id is required";

  let { userId, todoId } = payload;
  todoId = await toMongoId(todoId);

  // check todo exists or not
  const todo = await getUserTodoById(userId, todoId);

  if (!todo) throw "Todo not found for the user";

  return await TodoModel.deleteOne({ _id: todoId });
};

const editUserTodo = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.todoId) throw "Todo id is required";
  if (!payload || !payload.title) throw "Title is required";
  if (!payload || !payload.description) throw "Description is required";
  if (!payload || !payload.completedBy) throw "Completed by is required";
  if (!payload || (payload.isCompleted && !payload.completedOn))
    throw "Completed on is required";

  let {
    userId,
    todoId,
    title,
    description,
    completedBy,
    isCompleted,
    completedOn,
    priority,
  } = payload;

  todoId = await toMongoId(todoId);

  // check todo exists or not
  const todo = await getUserTodoById(userId, todoId);

  if (!todo) throw "Todo not found for the user";

  todo.title = title;
  todo.description = description;
  todo.completedBy = completedBy;
  todo.isCompleted = isCompleted || todo.isCompleted;
  todo.completedOn = completedOn || todo.completedOn;
  todo.priority = priority || "LOW";

  return await todo.save();
};

const getUserTodoById = async (userId, todoId) => {
  return await TodoModel.findOne({ user: userId, _id: todoId });
};

const toMongoId = async (id) => {
  return await new mongoose.Types.ObjectId(id);
};

const getStats = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Today's completed tasks count
  const todayCompletedCount = await TodoModel.countDocuments({
    user: payload.userId,
    completedBy: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    }, // Between start of day and end of day
    isCompleted: true,
    completedOn: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  });

  // Today's pending tasks count
  const todayPendingCount = await TodoModel.countDocuments({
    user: payload.userId,
    completedBy: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    }, // Between start of day and end of day
    isCompleted: false,
  });

  // All pending tasks count
  const allPendingCount = await TodoModel.countDocuments({
    user: payload.userId,
    $or: [
      { completedBy: { $lt: today }, isCompleted: false },
      { completedBy: { $gte: today }, isCompleted: false },
    ],
  });

  const result = [
    { label: "Today's completed task", value: todayCompletedCount },
    { label: "Today's Pending Tasks", value: todayPendingCount },
    { label: "Total Pending Tasks", value: allPendingCount },
  ];

  return result;
};

module.exports = {
  getUserByEmail,
  getUserById,
  getUserTodos,
  addUserTodo,
  toMongoId,
  getUserTodoById,
  deleteUserTodo,
  getStats,
  editUserTodo,
};
