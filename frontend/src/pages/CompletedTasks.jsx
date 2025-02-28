import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { getTasks } from "../services/taskService";
import NavBar from "../components/NavBar";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const data = await getTasks(true);  
      setTasks(data.data);
    } 
    catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <NavBar/>

      <Typography variant="h4" fontWeight="bold" mt={4} ml={2}>
        Completed Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4, ml: 2, color: "gray" }}>
          No completed tasks yet.
        </Typography>
      ) : (
        <Grid container spacing={3} p={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#e0f2f1" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CompletedTasks;


