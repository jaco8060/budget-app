import AddIcon from "@mui/icons-material/Add";
import { Box, Container, CssBaseline, Fab } from "@mui/material";
import { amber, teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import AddSpendDialog from "./components/AddSpendDialog";
import Header from "./components/Header";
import SummaryDashboard from "./components/SummaryDashboard";
import WeeklySpendsList from "./components/WeeklySpendsList";
import { BudgetProvider } from "./context/BudgetContext";

const proTheme = createTheme({
  palette: {
    mode: "dark",
    primary: teal,
    secondary: amber,
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 700,
    },
  },
});

function App() {
  const [openAddSpend, setOpenAddSpend] = useState(false);

  return (
    <ThemeProvider theme={proTheme}>
      <CssBaseline />
      <BudgetProvider>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          {/* 
            FIX: Removed the maxWidth="lg" prop.
            The Container will now be fluid and take up the full available width.
          */}
          <Container component="main" sx={{ py: 4, flexGrow: 1 }}>
            <SummaryDashboard />
            <WeeklySpendsList />
          </Container>

          <Fab
            color="secondary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 32, right: 32 }}
            onClick={() => setOpenAddSpend(true)}
          >
            <AddIcon />
          </Fab>

          <AddSpendDialog
            open={openAddSpend}
            handleClose={() => setOpenAddSpend(false)}
          />
        </Box>
      </BudgetProvider>
    </ThemeProvider>
  );
}

export default App;
