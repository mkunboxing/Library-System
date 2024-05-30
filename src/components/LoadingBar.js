// LoadingBar.js
import React from "react";
import { LinearProgress, Box } from "@mui/material";
import { useLoading } from "../LoadingContext";

const LoadingBar = () => {
  const { isLoading } = useLoading();
  // console.log("Loading state:", isLoading); // Add this line for debugging

  return (
    <Box sx={{ width: "100%", position: "abosolute", top: 0, left: 0, zIndex: 10000 }}>
      {isLoading && <LinearProgress color="secondary" />}
    </Box>
  );
};


export default LoadingBar;
