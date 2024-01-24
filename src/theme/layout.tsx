import { CssBaseline, ThemeProvider } from "@mui/material";
import * as React from "react";
import theme from ".";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
}

export default Layout;
