import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, CircularProgress } from "@mui/material";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SignIn from "./components/SignIn";
import AdminDashboard from "./components/AdminDashboard";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgba(255, 152, 0, 1)", // Orange theme to match mobile app
      light: "rgba(255, 183, 77, 1)",
      dark: "rgba(230, 126, 34, 1)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "rgba(255, 183, 77, 0.8)",
      light: "rgba(255, 204, 128, 1)",
      dark: "rgba(239, 108, 0, 1)",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#333333",
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 16px rgba(255, 152, 0, 0.2)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          background:
            "linear-gradient(45deg, rgba(255, 152, 0, 1) 30%, rgba(255, 183, 77, 1) 90%)",
          "&:hover": {
            background:
              "linear-gradient(45deg, rgba(230, 126, 34, 1) 30%, rgba(255, 152, 0, 1) 90%)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(90deg, rgba(255, 152, 0, 1) 0%, rgba(255, 183, 77, 1) 100%)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(255, 152, 0, 0.1)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            borderRight: "3px solid rgba(255, 152, 0, 1)",
            "&:hover": {
              backgroundColor: "rgba(255, 152, 0, 0.15)",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(255, 152, 0, 0.05)",
          },
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, signIn, signOut } = useAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "background.default" }}
      >
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <AdminDashboard onSignOut={signOut} />
      ) : (
        <SignIn onSignIn={signIn} />
      )}
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
