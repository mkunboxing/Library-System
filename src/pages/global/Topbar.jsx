import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const Topbar = ({ isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the useAuth hook to access logout function

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from the useAuth hook
      navigate('/signup'); // Redirect to signup after logout
    } catch (err) {
      console.error('Error during logout', err);
    }
  };

  return (
    <Box backgroundColor={colors.primary[400]} display="flex" justifyContent="space-between" p={1}>
      <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
        <MenuOutlinedIcon />
      </IconButton>

      <Box >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton sx={{ marginRight: "10px" }}>
          <LogoutIcon onClick={handleLogout} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
