// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const NavBar = ({ onLogout }) => {
//   const navigate = useNavigate();

//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
//           Todo App
//         </Typography>
//         <Box>
//           <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
//           <Button color="inherit" onClick={() => navigate("/completed-tasks")}>Completed</Button>
//           <Button color="inherit" onClick={onLogout}>Logout</Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;

import { AppBar, Toolbar, Typography, Button, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold"  }}>
          My Todo App
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/dashboard" color="inherit" underline="none">
            <Button color="inherit">Dashboard</Button>
          </Link>
          <Link href="/completed-tasks" color="inherit" underline="none">
            <Button color="inherit">Completed Tasks</Button>
          </Link>
          <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

