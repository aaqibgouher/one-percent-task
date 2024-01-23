import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAction, getTodosAction } from "../../actions/userAction";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SET_DIALOG, SET_TODO } from "../../types";

const TodoComponent = () => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const [priority, setPriority] = useState("ALL");
  const todosState = useSelector((state) => state.userReducer.todos);
  const prioritiesState = useSelector((state) => state.userReducer.priorities);
  const [sortByArr, setSortByArr] = useState([
    { label: "All", value: "ALL" },
    { label: "Due task", value: "DUE_TASK" },
    { label: "Today's task", value: "TODAYS_DATE" },
    { label: "Tomorrow's task", value: "TOMORROWS_DATE" },
  ]);
  const [sortOrderArr, setSortOrderArr] = useState([
    { label: "Asc", value: "ASC" },
    { label: "Desc", value: "DESC" },
  ]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const getTodos = async (payload = {}) => {
    try {
      await dispatch(getTodosAction(payload));
    } catch (error) {
      console.log(error, "from get todos todo component");
    }
  };

  const addTodo = async () => {
    await dispatch({
      type: SET_DIALOG,
      payload: { open: true, title: "Add Todo", type: "ADD_TODO" },
    });
  };

  const deleteTodo = async (todoId) => {
    try {
      await dispatch(deleteTodoAction(todoId));
    } catch (error) {
      console.log(error, "from delete todo");
    }
  };

  const applyFilter = async () => {
    try {
      const payload = {
        priority: priority === "ALL" ? "" : priority,
        sortBy: sortBy === "ALL" ? "" : sortBy,
        sortOrder: sortOrder ? sortOrder : "",
      };

      await getTodos(payload);
    } catch (error) {
      console.log(error, "from apply filter");
    }
  };

  const clearFilter = async () => {
    setPriority("ALL");
    setSortBy("");
    setSortOrder("");
  };

  const editTodo = async (todo) => {
    try {
      // setting todo in state
      await dispatch({ type: SET_TODO, payload: todo });

      //   open dialog
      await dispatch({
        type: SET_DIALOG,
        payload: { open: true, title: "Edit Todo", type: "EDIT_TODO" },
      });
    } catch (error) {
      console.log(error, "from edit todo todo controller");
    }
  };

  const formatDate = (date) => {
    const inputDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    };

    return inputDate.toLocaleString("en-US", options);
  };

  useEffect(() => {
    setTodos(todosState);
  }, [todosState]);

  useEffect(() => {
    if (priority || sortBy || sortOrder) {
      applyFilter();
    }
  }, [priority, sortBy, sortOrder]);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Typography variant="h3">Todo</Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={addTodo}>
            Add Todo
          </Button>
        </Grid>
      </Grid>

      {/* filter */}
      <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <MenuItem value="ALL">All</MenuItem>
              {prioritiesState.map((prio, index) => (
                <MenuItem key={index} value={prio.value}>
                  {prio.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              {sortByArr.map((data, index) => (
                <MenuItem key={index} value={data.value}>
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
              }}
            >
              {sortOrderArr.map((data, index) => (
                <MenuItem key={index} value={data.value}>
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label="view" onClick={clearFilter}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Complted on</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos && todos.length ? (
            todos.map((todo, index) => (
              <TableRow key={todo._id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{formatDate(todo.completedBy)}</TableCell>
                <TableCell>
                  {todo.isCompleted ? <DoneIcon /> : <CloseIcon />}
                </TableCell>
                <TableCell>
                  {todo.completedOn ? formatDate(todo.completedOn) : ""}
                </TableCell>
                <TableCell>{todo.priority}</TableCell>
                <TableCell>
                  <Stack direction="row">
                    <IconButton aria-label="view">
                      <ShowIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => editTodo(todo)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="subtitle1">No todos</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TodoComponent;
