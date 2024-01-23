import { AppBar, Box, Toolbar } from "@mui/material";
import * as React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar />
      </AppBar>

      {children}
    </Box>
  );
}

export default Layout;
