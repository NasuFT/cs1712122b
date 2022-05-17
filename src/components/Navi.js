import { AppBar, Box, Button, IconButton, Link, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const appBarItems = [
  {
    id: 0,
    label: "L System",
    route: "/",
  },
  { id: 1, label: "Other project", route: "/" },
];

function Navi() {
  const navigate = useNavigate();

  function handleClick(route) {
    return () => {
      navigate(route);
    };
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {appBarItems.map((item) => (
              <Button
                key={item.id}
                onClick={handleClick(item.route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/jamjamnewbie/cs1712122b"
          >
            <IconButton size="large">
              <GitHubIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navi;
