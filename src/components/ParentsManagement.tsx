import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Chip,
  Switch,
  FormControlLabel,
  Tooltip,
  TablePagination,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Person,
  ToggleOn,
  ToggleOff,
} from "@mui/icons-material";
import type { User } from "../Api/models/User";
import { AdminParentManagementService } from "../Api";

const ParentsManagement: React.FC = () => {
  const [allParents, setAllParents] = useState<User[]>([]);
  const [parents, setParents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingParent, setEditingParent] = useState<User | null>(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    isActive: false,
    phone: "",
  });

  useEffect(() => {
    loadParents();
  }, []);

  // Effect for pagination changes
  useEffect(() => {
    updatePaginatedParents();
  }, [page, pageSize, allParents]);

  const updatePaginatedParents = () => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedParents = allParents.slice(startIndex, endIndex);
    setParents(paginatedParents);
  };

  const loadParents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await AdminParentManagementService.getApiUserParents();
      setAllParents(data.data || []);
    } catch (err) {
      console.error("Failed to load parents:", err);
      setError("Failed to load parents. Please check API connection.");
      // Fallback demo data with more entries for pagination demo
      const demoData = [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          isActive: true,
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1987654321",
          isActive: true,
        },
        {
          _id: "3",
          name: "Mike Wilson",
          email: "mike@example.com",
          phone: "+1555123456",
          isActive: false,
        },
        {
          _id: "4",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+1555987654",
          isActive: true,
        },
        {
          _id: "5",
          name: "David Brown",
          email: "david@example.com",
          phone: "+1555456789",
          isActive: true,
        },
        {
          _id: "6",
          name: "Emma Davis",
          email: "emma@example.com",
          phone: "+1555654321",
          isActive: false,
        },
        {
          _id: "7",
          name: "James Miller",
          email: "james@example.com",
          phone: "+1555789012",
          isActive: true,
        },
        {
          _id: "8",
          name: "Lisa Garcia",
          email: "lisa@example.com",
          phone: "+1555321987",
          isActive: true,
        },
        {
          _id: "9",
          name: "Robert Anderson",
          email: "robert@example.com",
          phone: "+1555567890",
          isActive: false,
        },
        {
          _id: "10",
          name: "Maria Rodriguez",
          email: "maria@example.com",
          phone: "+1555098765",
          isActive: true,
        },
        {
          _id: "11",
          name: "Thomas Taylor",
          email: "thomas@example.com",
          phone: "+1555234567",
          isActive: true,
        },
        {
          _id: "12",
          name: "Jessica White",
          email: "jessica@example.com",
          phone: "+1555876543",
          isActive: false,
        },
      ];
      setAllParents(demoData);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when changing page size
  };

  const handleOpenDialog = (parent?: User) => {
    if (parent) {
      setEditingParent(parent);
      setFormData({
        username: parent.name || "",
        email: parent.email || "",
        isActive: parent.isActive || false,
        phone: parent.phone || "",
      });
    } else {
      setEditingParent(null);
      setFormData({ username: "", email: "", isActive: false, phone: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingParent(null);
    setFormData({ username: "", email: "", isActive: false, phone: "" });
  };

  const handleSave = async () => {
    try {
      if (editingParent) {
        // Update existing parent
        await AdminParentManagementService.putApiUserParents({
          id: editingParent._id!,
          requestBody: {
            name: formData.username,
            email: formData.email,
            phone: formData.phone,
          },
        });

        // Update the parent in both allParents and current parents view
        const updatedParents = allParents.map((p) =>
          p._id === editingParent._id
            ? {
                ...p,
                name: formData.username,
                email: formData.email,
                phone: formData.phone,
              }
            : p
        );
        setAllParents(updatedParents);
      } else {
        // Create new parent
        await AdminParentManagementService.postApiUserParents(
          {
            requestBody: {
              name: formData.username,
              email: formData.email,
              phone: formData.phone,
              password: "temp123", // Temporary password - should be handled properly
              parentPin: "1234", // Temporary PIN - should be handled properly
            },
          }
        );
        loadParents(); // Reload to get the new parent with proper ID
      }
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save parent:", err);
      setError("Failed to save parent. Please try again.");
    }
  };

  const handleDelete = async (parentId: string) => {
    if (
      window.confirm("Are you sure you want to delete this parent account?")
    ) {
      try {
        await AdminParentManagementService.deleteApiUserParents({
          id: parentId,
        });

        const updatedParents = allParents.filter(
          (parent) => parent._id !== parentId
        );
        setAllParents(updatedParents);

        // Adjust page if necessary
        const newTotalPages = Math.ceil(updatedParents.length / pageSize);
        if (page >= newTotalPages && newTotalPages > 0) {
          setPage(newTotalPages - 1);
        }
      } catch (err) {
        console.error("Failed to delete parent:", err);
        setError("Failed to delete parent. Please try again.");
      }
    }
  };

  const handleToggleStatus = async (parent: User) => {
    try {
      const newStatus = !parent.isActive;

      // Note: The current API doesn't support isActive field in updates
      // This is a client-side only toggle for demo purposes
      // In a real implementation, you'd need a separate endpoint like:
      // await AdminParentManagementService.activateParent(parent._id) or
      // await AdminParentManagementService.deactivateParent(parent._id)

      // For now, we'll just update the local state
      const updatedParents = allParents.map((p) =>
        p._id === parent._id ? { ...p, isActive: newStatus } : p
      );
      setAllParents(updatedParents);

      // Show success message
      const action = newStatus ? "activated" : "deactivated";
      setError(null);
      console.log(
        `Parent ${parent.name} has been ${action} (client-side only)`
      );
    } catch (err) {
      console.error("Failed to toggle parent status:", err);
      setError(
        `Failed to ${
          parent.isActive ? "deactivate" : "activate"
        } parent. Please try again.`
      );
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Parents Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Parent
        </Button>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage parent accounts and their associated children. Parents can
        register their children for language learning courses.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Box sx={{ py: 4 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            No parents found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            No parent accounts have been created yet
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    parents.map((parent) => (
                      <TableRow key={parent._id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Person color="primary" />
                            {`${parent.name || ""}`.trim() || "N/A"}
                          </Box>
                        </TableCell>
                        <TableCell>{parent.email}</TableCell>
                        <TableCell>{parent.phone || "N/A"}</TableCell>
                        <TableCell>
                          <Chip
                            label={parent.isActive ? "Active" : "Inactive"}
                            color={parent.isActive ? "success" : "default"}
                            size="small"
                            variant={parent.isActive ? "filled" : "outlined"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Tooltip
                              title={
                                parent.isActive
                                  ? "Deactivate Parent"
                                  : "Activate Parent"
                              }
                            >
                              <IconButton
                                color={parent.isActive ? "warning" : "success"}
                                onClick={() => handleToggleStatus(parent)}
                                size="small"
                              >
                                {parent.isActive ? <ToggleOff /> : <ToggleOn />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Parent">
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenDialog(parent)}
                                size="small"
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Parent">
                              <IconButton
                                color="error"
                                onClick={() =>
                                  parent._id && handleDelete(parent._id)
                                }
                                size="small"
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={allParents.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={pageSize}
              onRowsPerPageChange={handlePageSizeChange}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </CardContent>
        </Card>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingParent ? "Edit Parent" : "Add New Parent"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              fullWidth
              placeholder="+1234567890"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  color="success"
                />
              }
              label="Active Account"
              sx={{ mt: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.username || !formData.email}
          >
            {editingParent ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentsManagement;
