import { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent, CardActions, Button, Box } from "@mui/material";
import { getTasks, completeTask } from "../services/taskService";
import NavBar from "../components/NavBar";
import AddTaskModal from "../components/AddTaskModal";  

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(false); 
      setTasks(data.data);
    } 
    catch (error) {
      console.error(error.message);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await completeTask(taskId);
      fetchTasks();  
    } 
    catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2} ml={2} mr={2}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <AddTaskModal onTaskAdded={fetchTasks} />  
      </Box>

      {tasks.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4, ml:2, color: "gray" }}>
          No pending tasks. Add a new one!
        </Typography>
      ) : (
        <Grid container spacing={3} p={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => handleComplete(task.id)}
                  >
                    Mark as Completed
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;

