import React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";
import {
  Dashboard,
  People,
  School,
  Language,
  Settings,
  Logout,
  Person,
  ChildCare,
  Analytics,
  MenuBook,
  Public,
  Category,
  Spellcheck,
  Api,
} from "@mui/icons-material";

const drawerWidth = 280;

interface DashboardSidebarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  selectedTab,
  onTabChange,
  onSignOut,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      text: "Dashboard",
      icon: <Dashboard />,
      color: "rgba(255, 152, 0, 1)",
    },
    {
      id: "parents",
      text: "Parents",
      icon: <People />,
      color: "rgba(33, 150, 243, 1)",
    },
    {
      id: "content",
      text: "Content Management",
      icon: <MenuBook />,
      color: "rgba(76, 175, 80, 1)",
    },
    // {
    //   id: "analytics",
    //   text: "Analytics",
    //   icon: <Analytics />,
    //   color: "rgba(63, 81, 181, 1)",
    // },
    // {
    //   id: "swagger",
    //   text: "API Integration",
    //   icon: <Api />,
    //   color: "rgba(156, 39, 176, 1)",
    // },
    {
      id: "settings",
      text: "Settings",
      icon: <Settings />,
      color: "rgba(96, 125, 139, 1)",
    },
  ];

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            mr: 2,
          }}
        >
          A
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Admin Panel
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Language Learning Platform
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedTab === item.id}
              onClick={() => onTabChange(item.id)}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 152, 0, 0.1)",
                  borderLeft: "4px solid rgba(255, 152, 0, 1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 152, 0, 0.15)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 152, 0, 0.05)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedTab === item.id ? "primary.main" : item.color,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight: selectedTab === item.id ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Logout />}
          onClick={onSignOut}
          sx={{
            borderColor: "rgba(255, 152, 0, 0.5)",
            color: "primary.main",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(255, 152, 0, 0.05)",
            },
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(255, 152, 0, 0.1)",
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};

export { drawerWidth };
export default DashboardSidebar;
