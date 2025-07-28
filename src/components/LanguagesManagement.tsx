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
import {
  Add,
  Edit,
  Delete,
  Language as LanguageIcon,
} from "@mui/icons-material";
import { LanguageService } from "../Api/services/LanguageService";
import type { Language } from "../Api/models/Language";

const LanguagesManagement: React.FC = () => {
  const [allLanguages, setAllLanguages] = useState<Language[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    loadLanguages();
  }, []);

  // Effect for pagination changes
  useEffect(() => {
    updatePaginatedLanguages();
  }, [page, pageSize, allLanguages]);

  const updatePaginatedLanguages = () => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLanguages = allLanguages.slice(startIndex, endIndex);
    setLanguages(paginatedLanguages);
  };

  const loadLanguages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await LanguageService.getApiLanguages();
      setAllLanguages(data);
    } catch (err) {
      console.error("Failed to load languages:", err);
      setError("Failed to load languages. Please check API connection.");
      // Fallback demo data
      const demoData = [
        { _id: "1", name: "English", code: "en" },
        { _id: "2", name: "Spanish", code: "es" },
        { _id: "3", name: "French", code: "fr" },
        { _id: "4", name: "German", code: "de" },
        { _id: "5", name: "Italian", code: "it" },
        { _id: "6", name: "Portuguese", code: "pt" },
        { _id: "7", name: "Dutch", code: "nl" },
        { _id: "8", name: "Russian", code: "ru" },
        { _id: "9", name: "Chinese", code: "zh" },
        { _id: "10", name: "Japanese", code: "ja" },
        { _id: "11", name: "Korean", code: "ko" },
        { _id: "12", name: "Arabic", code: "ar" },
      ];
      setAllLanguages(demoData);
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

  const handleOpenDialog = (language?: Language) => {
    if (language) {
      setEditingLanguage(language);
      setFormData({
        name: language.name || "",
        code: language.code || "",
      });
    } else {
      setEditingLanguage(null);
      setFormData({ name: "", code: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLanguage(null);
    setFormData({ name: "", code: "" });
  };

  const handleSave = async () => {
    // Note: The current API doesn't support CRUD operations for languages
    // This is a placeholder for future API implementation
    setError(
      "Language CRUD operations not yet implemented in the API. This is for demonstration purposes."
    );

    // Simulate the operation for demo purposes
    if (editingLanguage) {
      // Update existing language
      const updatedLanguages = allLanguages.map((lang) =>
        lang._id === editingLanguage._id ? { ...lang, ...formData } : lang
      );
      setAllLanguages(updatedLanguages);
    } else {
      // Create new language
      const newLanguage: Language = {
        _id: Date.now().toString(),
        ...formData,
      };
      setAllLanguages([...allLanguages, newLanguage]);
    }
    handleCloseDialog();
  };

  const handleDelete = async (languageId: string) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      // Note: The current API doesn't support delete operations for languages
      setError(
        "Language deletion not yet implemented in the API. This is for demonstration purposes."
      );

      // Simulate the operation for demo purposes
      const updatedLanguages = allLanguages.filter(
        (lang) => lang._id !== languageId
      );
      setAllLanguages(updatedLanguages);

      // Adjust page if necessary
      const newTotalPages = Math.ceil(updatedLanguages.length / pageSize);
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
          Languages Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Language
        </Button>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage available languages for the learning platform. Languages are the
        top level of the content hierarchy.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Currently showing read-only language data from GET /api/languages. CRUD
        operations require additional API endpoints to be implemented.
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
                    <TableCell>Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {languages.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Box sx={{ py: 4 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            No languages found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            No languages have been created yet
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    languages.map((language) => (
                      <TableRow key={language._id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LanguageIcon color="primary" />
                            {language.name}
                          </Box>
                        </TableCell>
                        <TableCell>{language.code}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(language)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              language._id && handleDelete(language._id)
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
              count={allLanguages.length}
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
          {editingLanguage ? "Edit Language" : "Add New Language"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Language Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Language Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              fullWidth
              required
              placeholder="e.g., en, es, fr"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name || !formData.code}
          >
            {editingLanguage ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LanguagesManagement;
