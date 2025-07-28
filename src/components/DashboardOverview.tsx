import React from "react";
import {
  Box,
  Typography,
  Alert,
  Card,
  CardContent,
  Paper,
  Skeleton,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import {
  TrendingUp,
  Language,
  Analytics,
  Dashboard,
  People,
  MenuBook,
  Settings,
  ChevronRight,
  WbSunny,
  Brightness3,
  WbTwilight,
} from "@mui/icons-material";
import DashboardStats from "./DashboardStats";
import type { DashboardStatistics } from "../Api";

interface DashboardOverviewProps {
  dashboardStats: DashboardStatistics | null;
  loading: boolean;
  error: string | null;
  swaggerStatus: {
    valid: boolean;
    errors: string[];
  } | null;
  onTabChange: (tab: string) => void;
  onContentTabChange: (contentTab: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  dashboardStats,
  loading,
  error,
  swaggerStatus,
  onTabChange,
  onContentTabChange,
}) => {
  const theme = useTheme();

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        text: "Good Morning",
        icon: <WbSunny sx={{ color: "#FFA726" }} />,
      };
    } else if (hour < 17) {
      return {
        text: "Good Afternoon",
        icon: <WbTwilight sx={{ color: "#FF7043" }} />,
      };
    } else {
      return {
        text: "Good Evening",
        icon: <Brightness3 sx={{ color: "#7E57C2" }} />,
      };
    }
  };

  const greeting = getGreeting();

  // Quick action cards data
  const quickActions = [
    {
      title: "Manage Parents",
      description: "View and manage parent accounts",
      icon: <People sx={{ fontSize: 32, color: theme.palette.primary.main }} />,
      action: () => onTabChange("parents"),
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Content Management",
      description: "Manage languages, domains & lessons",
      icon: (
        <MenuBook sx={{ fontSize: 32, color: theme.palette.success.main }} />
      ),
      action: () => onTabChange("content"),
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Languages",
      description: "Configure available languages",
      icon: <Language sx={{ fontSize: 32, color: theme.palette.info.main }} />,
      action: () => onContentTabChange("languages"),
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Settings",
      description: "View detailed statistics",
      icon: (
        <Settings sx={{ fontSize: 32, color: theme.palette.warning.main }} />
      ),
      action: () => onTabChange("settings"),
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
  ];

  const StatsSkeletonLoader = () => (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {[1, 2, 3, 4].map((item) => (
          <Box key={item} sx={{ flex: "1 1 250px", minWidth: "240px" }}>
            <Card sx={{ height: 160 }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <Skeleton
                  variant="circular"
                  width={48}
                  height={48}
                  sx={{ mx: "auto", mb: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  sx={{ mx: "auto", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  sx={{ mx: "auto", fontSize: "2rem", mb: 2 }}
                />
                <Skeleton
                  variant="rounded"
                  width="70%"
                  height={24}
                  sx={{ mx: "auto" }}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Hero Section with Gradient Background */}
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.8
          )} 0%, ${alpha(theme.palette.secondary.main, 0.6)} 100%)`,
          borderRadius: 3,
          p: 4,
          mb: 4,
          position: "relative",
          overflow: "hidden",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\') repeat',
            opacity: 0.3,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                {greeting.icon}
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {greeting.text}!
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  background:
                    "linear-gradient(45deg, #ffffff 30%, #f0f8ff 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Learning Platform Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 300 }}>
                Manage your educational platform efficiently
              </Typography>
            </Box>
            <Dashboard sx={{ fontSize: 80, opacity: 0.3 }} />
          </Box>
        </Box>
      </Paper>

      {/* Alerts Section */}
      {error && (
        <Fade in={true}>
          <Alert
            severity="warning"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Dashboard Warning
            </Typography>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        </Fade>
      )}

      {swaggerStatus && !swaggerStatus.valid && (
        <Fade in={true}>
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              API Integration Issues Detected
            </Typography>
            {swaggerStatus.errors.map((err, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                • {err}
              </Typography>
            ))}
          </Alert>
        </Fade>
      )}

      {/* Quick Actions Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TrendingUp sx={{ color: theme.palette.primary.main }} />
          Quick Actions
        </Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {quickActions.map((action, index) => (
            <Box key={index} sx={{ flex: "1 1 280px", minWidth: "260px" }}>
              <Fade in={true} timeout={800 + index * 200}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: action.gradient,
                    color: "white",
                    height: "100%",
                    minHeight: 140,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 12px 30px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                    },
                  }}
                  onClick={action.action}
                >
                  <CardContent sx={{ p: 3, height: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Box sx={{ mb: 2 }}>{action.icon}</Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 1 }}
                        >
                          {action.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {action.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 2,
                        }}
                      >
                        <ChevronRight sx={{ opacity: 0.7 }} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Statistics Section */}
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Analytics sx={{ color: theme.palette.secondary.main }} />
          Platform Statistics
        </Typography>

        {loading ? (
          <StatsSkeletonLoader />
        ) : (
          <Fade in={true} timeout={1000}>
            <Box>
              <DashboardStats dashboardStats={dashboardStats} />
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default DashboardOverview;
