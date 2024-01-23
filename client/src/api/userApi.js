import axios from "axios";

const apiService = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "PROD"
      ? `${import.meta.env.VITE_API_URL_PROD}/api`
      : "http://localhost:3000/api",
});

export const registerApi = async (payload) => {
  try {
    const res = await apiService.post("/auth/register", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const loginApi = async (payload) => {
  try {
    console.log(import.meta.env.VITE_ENV, "process");
    const res = await apiService.post("/auth/login", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from login api");
    throw error.response;
  }
};

export const logoutApi = async () => {
  try {
    const res = await apiService.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from logout api");
    throw error.response;
  }
};

export const getMeApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getStatsApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/todos/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getTodosApi = async (payload = {}) => {
  try {
    console.log("from get me api", payload, "payload");
    const { priority, sortBy, sortOrder, ...restPayload } = payload;

    let apiUrl = "/todos";

    // Append query parameters if available
    if (priority && priority !== "ALL") {
      apiUrl += `?priority=${priority}`;
    }

    if (sortBy && sortBy !== "ALL") {
      apiUrl += `${priority && priority !== "ALL" ? "&" : "?"}sortBy=${sortBy}`;
    }

    if (sortOrder) {
      apiUrl += `${priority || sortBy ? "&" : "?"}sortOrder=${sortOrder}`;
    }

    const res = await apiService.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: restPayload, // Other payload parameters go here
    });

    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const addTodoApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.post("/todos", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const deleteTodoApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.delete(`/todos/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const editTodoApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.patch(`/todos/${payload.todoId}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};
