import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";

const customFont = createTheme({
  typography: {
    fontFamily: ["CS171CFDG", "sans-serif"].join(","),
  },
});

function Navi() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/jamjamnewbie/cs1712122b"
          >
            <IconButton size="large">
              <GitHubIcon />
            </IconButton>
          </Link>
          <Box sx={{ mx: 2, display: { xs: "none", md: "flex" } }}>
            <ThemeProvider theme={customFont}>
              <Typography className="font-cfdg" color="white" fontSize="2rem">
                JOSH
              </Typography>
            </ThemeProvider>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navi;
