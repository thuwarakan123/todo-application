import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const styles = {
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  container: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: 'center'
  },
  button: {
    marginTop: "20px",
    fontWeight: "bold",
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  link: {  
    fontWeight: "bold",
    color: "#1976d2",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  linkBox: {
    marginTop: "20px",   
    textAlign: 'center',
  },
  alert: {
    marginBottom: "20px",
  },
};

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } 
    catch (err) {
      setError(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <Container maxWidth="xs">
        <Box sx={styles.container}>
          <Typography variant="h5" sx={styles.heading}>
            Login
          </Typography>
          {error && <Alert severity="error" sx={styles.alert}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              size="small"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              size="small"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={styles.button} 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
            </Button>
          </form>
          <Typography variant="body2" style={styles.linkBox}>
            Don't have an account?{" "}
            <Link href="/register" underline="hover" sx={styles.link}>
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Login;

