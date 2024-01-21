const userService = require("../service/userService");

const getUserTodos = async (req, res) => {
  try {
    const { _id } = req.user;
    const { sortBy, sortOrder, priority } = req.query;
    const data = await userService.getUserTodos({
      userId: _id,
      sortBy,
      sortOrder,
      priority,
    });

    return res.json({ status: 200, message: "Successfully get todos", data });
  } catch (error) {
    console.log(error, "from get todos controller");
    return res.json({ status: 400, error });
  }
};

const addUserTodo = async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      title,
      description,
      completedBy,
      isCompleted,
      completedOn,
      priority,
    } = req.body;

    const data = await userService.addUserTodo({
      userId: _id,
      title,
      description,
      completedBy,
      isCompleted,
      completedOn,
      priority,
    });

    return res.json({ status: 200, message: "Successfully added todo", data });
  } catch (error) {
    console.log(error, "from add todo controller");
    return res.json({ status: 400, error });
  }
};

const deleteUserTodo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { todoId } = req.params;

    const data = await userService.deleteUserTodo({ userId: _id, todoId });

    return res.json({ status: 200, message: "Successfully delete todo", data });
  } catch (error) {
    console.log(error, "from delete todo controller");
    return res.json({ status: 400, error });
  }
};

const getStats = async (req, res) => {
  try {
    const { _id } = req.user;

    const data = await userService.getStats({ userId: _id });

    return res.json({ status: 200, message: "Successfully get stats", data });
  } catch (error) {
    console.log(error, "from states todo controller");
    return res.json({ status: 400, error });
  }
};

const editUserTodo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { todoId } = req.params;
    const {
      title,
      description,
      completedBy,
      isCompleted,
      completedOn,
      priority,
    } = req.body;

    const data = await userService.editUserTodo({
      userId: _id,
      todoId,
      title,
      description,
      completedBy,
      isCompleted,
      completedOn,
      priority,
    });

    return res.json({ status: 200, message: "Successfully edit todo", data });
  } catch (error) {
    console.log(error, "from delete todo controller");
    return res.json({ status: 400, error });
  }
};

module.exports = {
  getUserTodos,
  addUserTodo,
  deleteUserTodo,
  getStats,
  editUserTodo,
};
