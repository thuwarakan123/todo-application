import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Box,
  Divider  
} from "@mui/material";
import { addTask } from "../services/taskService";

const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required").min(5, "Description must be at least 5 characters"),
});

const AddTaskModal = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(taskSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addTask(data);
      reset();
      onTaskAdded();
      setOpen(false);
    } 
    catch (error) {
      console.error(error.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ fontWeight: "bold" }}>
        Add Task +
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add New Task</DialogTitle>
        <Divider/>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              size="small"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr:2 }}>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" disabled={loading} sx={{ fontWeight: "bold" }}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskModal;