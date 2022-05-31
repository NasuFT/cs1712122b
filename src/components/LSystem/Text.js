import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box, createTheme } from "@mui/system";
import React from "react";

const customFont = createTheme({
  typography: {
    fontFamily: ["CS171CFDG", "sans-serif"].join(","),
  },
});

function Text({ text }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ThemeProvider theme={customFont}>
        <Typography className="font-cfdg" sx={{ fontSize: "5rem" }}>
          {text}
        </Typography>
      </ThemeProvider>
    </Box>
  );
}

export default Text;
