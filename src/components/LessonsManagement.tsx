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
  TablePagination,
} from "@mui/material";
import { Add, Edit, Delete, School } from "@mui/icons-material";
// Custom interface for lesson management since LessonContent doesn't match our needs
interface Lesson {
  _id: string;
  title: string;
  content: string;
  domainId: string;
}

const LessonsManagement: React.FC = () => {
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    domainId: "",
  });

  useEffect(() => {
    loadLessons();
  }, []);

  // Effect for pagination changes
  useEffect(() => {
    updatePaginatedLessons();
  }, [page, pageSize, allLessons]);

  const updatePaginatedLessons = () => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLessons = allLessons.slice(startIndex, endIndex);
    setLessons(paginatedLessons);
  };

  const loadLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      // Note: LessonService doesn't have a get all lessons method
      // This would need to be implemented in the API
      setError("Lessons API endpoints not yet implemented. Showing demo data.");
    } catch (err) {
      console.error("Failed to load lessons:", err);
      setError("Failed to load lessons. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when changing page size
  };

  const handleOpenDialog = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title || "",
        content: lesson.content || "",
        domainId: lesson.domainId || "",
      });
    } else {
      setEditingLesson(null);
      setFormData({ title: "", content: "", domainId: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLesson(null);
    setFormData({ title: "", content: "", domainId: "" });
  };

  const handleSave = async () => {
    // Note: The current API doesn't support full CRUD operations for lessons
    setError(
      "Lesson CRUD operations not yet fully implemented in the API. This is for demonstration purposes."
    );

    // Simulate the operation for demo purposes
    if (editingLesson) {
      // Update existing lesson
      const updatedLessons = allLessons.map((lesson) =>
        lesson._id === editingLesson._id ? { ...lesson, ...formData } : lesson
      );
      setAllLessons(updatedLessons);
    } else {
      // Create new lesson
      const newLesson: Lesson = {
        _id: Date.now().toString(),
        ...formData,
      };
      setAllLessons([...allLessons, newLesson]);
    }
    handleCloseDialog();
  };

  const handleDelete = async (lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      // Note: The current API doesn't support delete operations for lessons
      setError(
        "Lesson deletion not yet implemented in the API. This is for demonstration purposes."
      );

      // Simulate the operation for demo purposes
      const updatedLessons = allLessons.filter(
        (lesson) => lesson._id !== lessonId
      );
      setAllLessons(updatedLessons);

      // Adjust page if necessary
      const newTotalPages = Math.ceil(updatedLessons.length / pageSize);
      if (page >= newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages - 1);
      }
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
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Lessons Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Lesson
        </Button>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage learning lessons within domains. Lessons contain the actual
        learning content and activities.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Lesson management requires additional API endpoints to be implemented.
        Currently showing demo data for UI demonstration.
      </Alert>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }} onClose={() => setError(null)}>
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
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Domain ID</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Box sx={{ py: 4 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            No lessons found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            No lessons have been created yet
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    lessons.map((lesson) => (
                      <TableRow key={lesson._id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <School color="primary" />
                            {lesson.title}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {lesson.content && lesson.content.length > 50
                            ? `${lesson.content.substring(0, 50)}...`
                            : lesson.content}
                        </TableCell>
                        <TableCell>{lesson.domainId}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(lesson)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              lesson._id && handleDelete(lesson._id)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={allLessons.length}
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingLesson ? "Edit Lesson" : "Add New Lesson"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Lesson Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              fullWidth
              required
              multiline
              rows={6}
              placeholder="Enter the lesson content, instructions, or description"
            />
            <TextField
              label="Domain ID"
              value={formData.domainId}
              onChange={(e) =>
                setFormData({ ...formData, domainId: e.target.value })
              }
              fullWidth
              required
              placeholder="Enter the domain ID this lesson belongs to"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              !formData.title || !formData.content || !formData.domainId
            }
          >
            {editingLesson ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LessonsManagement;
