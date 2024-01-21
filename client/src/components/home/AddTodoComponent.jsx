import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAction } from "../../actions/userAction";

const AddTodoComponent = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedBy, setCompletedBy] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedOn, setCompletedOn] = useState("");
  const prioritiesState = useSelector((state) => state.userReducer.priorities);

  const addTodo = async () => {
    try {
      const res = await dispatch(
        addTodoAction({
          title,
          description,
          completedBy,
          priority,
          isCompleted,
          completedOn,
        })
      );

      console.log(res, "from add todo");
    } catch (error) {
      console.log(error, "from add todo component dialog");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {/* Completed By Date (Date Picker) */}
        <Grid item xs={6}>
          <TextField
            label="Completed By"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={completedBy}
            onChange={(e) => setCompletedBy(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {prioritiesState.map((prio, index) => (
                <MenuItem key={index} value={prio.value}>
                  {prio.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
            }
            label="Is Completed"
          />
        </Grid>

        {isCompleted ? (
          <Grid item xs={6}>
            <TextField
              label="Completed On"
              type="datetime-local"
              fullWidth
              value={completedOn}
              onChange={(e) => setCompletedOn(e.target.value)}
            />
          </Grid>
        ) : (
          ""
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={addTodo}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddTodoComponent;
