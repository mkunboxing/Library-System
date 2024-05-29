import { Box, IconButton, useTheme,Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import {getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth();
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Box backgroundColor={colors.primary[400]} display="flex" justifyContent="flex-end" p={1}>

      {/* ICONS */}
      <Box display="flex" justifyContent={"space-between"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        <IconButton >
          <LogoutIcon onClick={handleLogout} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
