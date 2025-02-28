// import { useState } from "react";
// import { Container, TextField, Button, Typography, Box, Alert, CircularProgress, Link } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";

// // Validation Schema using Yup
// const registerSchema = yup.object().shape({
//   username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   confirmPassword: yup.string()
//     .oneOf([yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// const Register = () => {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(registerSchema) });

//   const onSubmit = async (data) => {
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await registerUser({ username: data.username, email: data.email, password: data.password });
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, textAlign: "center", bgcolor: "white" }}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Register
//         </Typography>
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             fullWidth
//             label="Username"
//             {...register("username")}
//             error={!!errors.username}
//             helperText={errors.username?.message}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             {...register("email")}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             {...register("password")}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             {...register("confirmPassword")}
//             error={!!errors.confirmPassword}
//             helperText={errors.confirmPassword?.message}
//             margin="normal"
//           />
//           <Button 
//             type="submit" 
//             variant="contained" 
//             color="primary" 
//             fullWidth 
//             sx={{ mt: 2 }} 
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
//           </Button>
//         </form>
//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Already have an account?{" "}
//           <Link href="/login" underline="hover">
//             Login
//           </Link>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default Register;

import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref('password'), null], "Passwords must match"),
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

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      await registerUser(data);
      navigate("/login");
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
            Register
          </Typography>
          {error && <Alert severity="error" sx={styles.alert}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
             fullWidth
             label="Username"
             {...register("username")}
             error={!!errors.username}
             helperText={errors.username?.message}
             margin="normal"
             size="small"
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
            </Button>
          </form>
          <Typography variant="body2" sx={styles.linkBox}>
            Already have an account?{" "}
            <Link href="/login" underline="hover" sx={styles.link}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Register;



