import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import {
  Settings,
  Person,
  Security,
  Notifications,
  Language,
  Backup,
  Update,
  AdminPanelSettings,
} from "@mui/icons-material";

const SettingsSection: React.FC = () => {
  const settingsCategories = [
    {
      title: "Admin Profile",
      description: "Manage your admin account settings and preferences",
      icon: <Person sx={{ fontSize: 40, color: "primary.main" }} />,
      actions: ["Edit Profile", "Change Password", "Manage Permissions"],
    },
    {
      title: "System Configuration",
      description: "Configure global system settings and parameters",
      icon: <Settings sx={{ fontSize: 40, color: "info.main" }} />,
      actions: ["App Settings", "Feature Flags", "Environment Config"],
    },
    {
      title: "Security Settings",
      description: "Manage security policies and authentication settings",
      icon: <Security sx={{ fontSize: 40, color: "error.main" }} />,
      actions: ["Password Policy", "Session Management", "Two-Factor Auth"],
    },
    {
      title: "Notifications",
      description: "Configure notification preferences and alert settings",
      icon: <Notifications sx={{ fontSize: 40, color: "warning.main" }} />,
      actions: ["Email Alerts", "Push Notifications", "Admin Alerts"],
    },
    {
      title: "Language Settings",
      description: "Manage platform languages and localization",
      icon: <Language sx={{ fontSize: 40, color: "success.main" }} />,
      actions: ["Add Languages", "Translation Keys", "Locale Settings"],
    },
    {
      title: "Data Management",
      description: "Backup, export, and data management tools",
      icon: <Backup sx={{ fontSize: 40, color: "secondary.main" }} />,
      actions: ["Database Backup", "Export Data", "Import Tools"],
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        System Settings
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Configure application settings, manage admin preferences, and control
        system behavior.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<Settings />} size="large">
          App Settings
        </Button>
        <Button variant="outlined" startIcon={<Person />} size="large">
          Admin Profile
        </Button>
        <Button variant="outlined" startIcon={<Security />} size="large">
          Security
        </Button>
        <Button variant="outlined" startIcon={<Update />} size="large">
          System Updates
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Settings Categories
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 3,
          mb: 4,
        }}
      >
        {settingsCategories.map((category, index) => (
          <Card
            key={index}
            sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 } }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                {category.icon}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {category.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                {category.description}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Available Actions:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {category.actions.map((action, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    • {action}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SettingsSection;
