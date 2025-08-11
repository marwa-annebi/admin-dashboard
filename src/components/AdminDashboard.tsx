import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { swaggerService } from "../services/swaggerService";

// Import the new separated components
import DashboardSidebar, { drawerWidth } from "./DashboardSidebar";
import DashboardOverview from "./DashboardOverview";
import ParentsManagement from "./ParentsManagement";
import ContentManagement from "./ContentManagement";
import SettingsSection from "./SettingsSection";
import { AdminStatisticsService, type DashboardStatistics } from "../Api";

interface AdminDashboardProps {
  onSignOut: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSignOut }) => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [contentTab, setContentTab] = useState("languages");
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swaggerStatus, setSwaggerStatus] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);

  useEffect(() => {
    if (selectedTab === "dashboard") {
      loadDashboardStats();
      checkSwaggerStatus();
    }
  }, [selectedTab]);

  const loadDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await AdminStatisticsService.getApiStatisticsDashboard();
      setDashboardStats(stats?.data || null);
    } catch (err) {
      console.error("Failed to load dashboard stats:", err);
      setError("Failed to load dashboard statistics. Using demo data.");
    } finally {
      setLoading(false);
    }
  };

  const checkSwaggerStatus = async () => {
    try {
      const status = await swaggerService.validateApiEndpoints();
      setSwaggerStatus(status);
    } catch (error) {
      console.error("Swagger validation error:", error);
      setSwaggerStatus({
        valid: false,
        errors: ["Failed to validate Swagger integration"],
      });
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleContentTabChange = (tab: string) => {
    setContentTab(tab);
  };

  const renderDashboardContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <DashboardOverview
            dashboardStats={dashboardStats}
            loading={loading}
            error={error}
            swaggerStatus={swaggerStatus}
            onTabChange={handleTabChange}
            onContentTabChange={handleContentTabChange}
          />
        );

      case "parents":
        return <ParentsManagement />;

      case "content":
        return (
          <ContentManagement
            contentTab={contentTab}
            onContentTabChange={handleContentTabChange}
          />
        );

      case "settings":
        return <SettingsSection />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ px: 4 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Language Learning Admin Dashboard
          </Typography>
          <Badge badgeContent={4} color="error">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Notifications />
            </IconButton>
          </Badge>
          <Avatar sx={{ ml: 2, bgcolor: "rgba(255,255,255,0.2)" }}>A</Avatar>
        </Toolbar>
      </AppBar>

      <DashboardSidebar
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        onSignOut={onSignOut}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 4,
          pt: 10,
          minHeight: "100vh",
        }}
      >
        {renderDashboardContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
