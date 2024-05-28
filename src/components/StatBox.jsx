import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" width="100%" m="0 30px">
      <Box display="flex" flexBasis="50%" padding="10px"  >
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          {icon}
        </Box>
      </Box>
      <Box  width={"100%"} display="flex" flexDirection="column"   mt="2px" >
     
        <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
            variant="h2"
            fontWeight="800"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        {/* <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography> */}
      </Box>
    </Box>
  );
};

export default StatBox;
