import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import {
  Groups,
  ChildCare,
  Public,
  MenuBook,
  Category,
  School,
  Spellcheck,
} from "@mui/icons-material";
import type { DashboardStats as DashboardStatsType } from "../hooks/useDashboard";
import type { DashboardStatistics } from "../Api";

interface DashboardStatsProps {
  dashboardStats: DashboardStatistics | null;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ dashboardStats }) => {
  const renderMainStats = () => (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
      <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Groups sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Parents
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {dashboardStats?.totalParents?.count || "0"}
            </Typography>
            <Chip
              label={`${dashboardStats?.totalParents?.isPositive ? "+" : "-"}${
                dashboardStats?.totalParents?.percentageChange || 0
              }% this month`}
              color="success"
              size="medium"
            />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <ChildCare sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Children
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {dashboardStats?.totalChildren?.count || "0"}
            </Typography>
            <Chip
              label={`${dashboardStats?.totalChildren?.isPositive ? "+" : "-"}${
                dashboardStats?.totalChildren?.percentageChange || 0
              }% this month`}
              color="success"
              size="medium"
            />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Public sx={{ fontSize: 48, color: "info.main", mb: 2 }} />
            <Typography color="textSecondary" gutterBottom variant="h6">
              Languages
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {dashboardStats?.totalLanguages?.count || "0"}
            </Typography>
            <Chip
              label={`${
                dashboardStats?.totalLanguages?.newThisMonth || 0
              } new added`}
              color="info"
              size="medium"
            />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <MenuBook sx={{ fontSize: 48, color: "warning.main", mb: 2 }} />
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Words
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {dashboardStats?.totalLessons?.count || "0"}
            </Typography>
            <Chip
              label={`${
                dashboardStats?.totalLessons?.newThisMonth || 0
              } new added`}
              color="success"
              size="medium"
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  const renderContentHierarchy = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Content Hierarchy
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Card sx={{ flex: "1 1 200px", minWidth: "180px" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Public sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Languages
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {dashboardStats?.totalLanguages?.count || "0"}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: "1 1 200px", minWidth: "180px" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Category sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Domains
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {dashboardStats?.totalDomains?.count || "0"}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: "1 1 200px", minWidth: "180px" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <School sx={{ fontSize: 40, color: "success.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Lessons
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {dashboardStats?.totalLessons?.count || "0"}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: "1 1 200px", minWidth: "180px" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Spellcheck sx={{ fontSize: 40, color: "warning.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Words
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {dashboardStats?.totalWords?.count || "0"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  return (
    <>
      {renderMainStats()}
      {renderContentHierarchy()}
    </>
  );
};

export default DashboardStats;
