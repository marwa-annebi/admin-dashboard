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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Add, Edit, Delete, School, Search } from "@mui/icons-material";
import { AdminLessonManagementService } from "../Api/services/AdminLessonManagementService";
import { createLesson } from "../services/lessonService";
import { AdminDomainManagementService } from "../Api/services/AdminDomainManagementService";
import { LanguageService } from "../Api/services/LanguageService";
import type { Domain } from "../Api/models/Domain";
import type { Language } from "../Api/models/Language";
// Custom interface for lesson management since LessonContent doesn't match our needs
interface Lesson {
  _id: string;
  title: string;
  content: string;
  domainId: string;
  type?: "word" | "paragraph" | "sentence";
}

const LessonsManagement: React.FC = () => {
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [domainsLoading, setDomainsLoading] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languagesLoading, setLanguagesLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "word" | "paragraph" | "sentence"
  >("all");

  const [formData, setFormData] = useState({
    difficulty: "easy",
    type: "word" as "word" | "paragraph" | "sentence",
    contents: [
      {
        languageId: "",
        domainId: "",
        title: "",
        content: "",
      },
    ] as Array<{
      languageId: string;
      domainId: string;
      title: string;
      content: string;
    }>,
  });

  useEffect(() => {
    loadLessons();
    loadDomains();
    loadLanguages();
  }, []);

  // Debounce search and reload lessons from backend
  useEffect(() => {
    const handle = setTimeout(() => {
      setPage(0);
      loadLessons(
        searchTerm.trim() || undefined,
        typeFilter === "all" ? undefined : typeFilter
      );
    }, 300);
    return () => clearTimeout(handle);
  }, [searchTerm, typeFilter]);

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

  const loadLessons = async (
    search?: string,
    lessonType?: "word" | "paragraph" | "sentence"
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdminLessonManagementService.getApiLessonAdmin({
        page: 1,
        limit: 1000,
        search,
        type: lessonType,
      });
      const apiLessons = response.data || [];
      const mapped = apiLessons.map((l: any) => ({
        _id: l._id || "",
        title: l.title || "",
        content: l.description || "",
        domainId: (l.domain && (l.domain._id || l.domain.id)) || "",
        type: l.type || undefined,
      }));
      setAllLessons(mapped);
    } catch (err) {
      console.error("Failed to load lessons:", err);
      setError("Failed to load lessons. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadDomains = async () => {
    setDomainsLoading(true);
    try {
      const { data } = await AdminDomainManagementService.getApiDomainesAll({});
      setDomains(data || []);
    } catch (err) {
      console.error("Failed to load domains:", err);
    } finally {
      setDomainsLoading(false);
    }
  };

  const loadLanguages = async () => {
    setLanguagesLoading(true);
    try {
      const langs = await LanguageService.getApiLanguages();
      setLanguages(langs || []);
    } catch (err) {
      console.error("Failed to load languages:", err);
    } finally {
      setLanguagesLoading(false);
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

  const handleOpenDialog = (lesson?: Lesson) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        difficulty: "easy",
        type: (lesson.type as any) || "word",
        contents: [
          {
            languageId:
              ((domains.find((d) => d._id === lesson.domainId) as any)?.language
                ?._id as string) || "",
            domainId: lesson.domainId || "",
            title: lesson.title || "",
            content: lesson.content || "",
          },
        ],
      });
    } else {
      setEditingLesson(null);
      setFormData({
        difficulty: "easy",
        type: "word",
        contents: [
          {
            languageId: "",
            domainId: "",
            title: "",
            content: "",
          },
        ],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLesson(null);
    setFormData({
      difficulty: "easy",
      type: "word",
      contents: [
        {
          languageId: "",
          domainId: "",
          title: "",
          content: "",
        },
      ],
    });
  };

  const handleSave = async () => {
    try {
      if (editingLesson) {
        // Update not yet wired to API
        setError(
          "Lesson update not yet implemented in the API. This is for demonstration purposes."
        );
        const updatedLessons = allLessons.map((lesson) =>
          lesson._id === editingLesson._id
            ? {
                ...lesson,
                title: formData.contents[0]?.title || lesson.title,
                content: formData.contents[0]?.content || lesson.content,
                domainId: formData.contents[0]?.domainId || lesson.domainId,
              }
            : lesson
        );
        setAllLessons(updatedLessons);
      } else {
        const createdLessons: Lesson[] = [];
        for (const entry of formData.contents) {
          const created = await createLesson({
            title: entry.title,
            description: entry.content,
            domainId: entry.domainId,
            difficulty: formData.difficulty as "easy" | "medium" | "hard",
            type: formData.type as "word" | "paragraph" | "sentence",
          });
          createdLessons.push({
            _id: created._id || "",
            title: created.title || "",
            content: created.description || "",
            domainId:
              (created.domain &&
                (created.domain._id || (created as any).domainId)) ||
              "",
            type: (created as any).type || undefined,
          });
        }
        setAllLessons([...allLessons, ...createdLessons]);
      }
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save lesson:", err);
      setError("Failed to save lesson. Please try again.");
    }
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="word">Word</MenuItem>
              <MenuItem value="paragraph">Paragraph</MenuItem>
              <MenuItem value="sentence">Sentence</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Lesson
          </Button>
        </Box>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage learning lessons within domains. Lessons contain the actual
        learning content and activities.
      </Typography>

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
                    <TableCell>Type</TableCell>
                    <TableCell>Domain Name</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lessons.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
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
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {lesson.type || "-"}
                        </TableCell>
                        <TableCell>
                          {domains.find((d) => d._id === lesson.domainId)?.name}
                        </TableCell>
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
            <FormControl fullWidth required>
              <InputLabel>Lesson Type</InputLabel>
              <Select
                label="Lesson Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as any,
                  }))
                }
              >
                <MenuItem value="word">Word</MenuItem>
                <MenuItem value="paragraph">Paragraph</MenuItem>
                <MenuItem value="sentence">Sentence</MenuItem>
              </Select>
            </FormControl>
            {formData.contents.map((c, idx) => (
              <Box
                key={`content-${idx}`}
                sx={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Language content #{idx + 1}
                </Typography>
                <FormControl fullWidth required>
                  <InputLabel>Language</InputLabel>
                  <Select
                    label="Language"
                    value={c.languageId}
                    onChange={(e) => {
                      const value = e.target.value as string;
                      setFormData((prev) => ({
                        ...prev,
                        contents: prev.contents.map((item, i) =>
                          i === idx
                            ? { ...item, languageId: value, domainId: "" }
                            : item
                        ),
                      }));
                    }}
                    disabled={languagesLoading}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang._id} value={lang._id || ""}>
                        {lang.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Domain</InputLabel>
                  <Select
                    label="Domain"
                    value={c.domainId}
                    onChange={(e) => {
                      const value = e.target.value as string;
                      setFormData((prev) => ({
                        ...prev,
                        contents: prev.contents.map((item, i) =>
                          i === idx ? { ...item, domainId: value } : item
                        ),
                      }));
                    }}
                    disabled={domainsLoading || !c.languageId}
                  >
                    {domains
                      .filter(
                        (d: any) => (d.language?._id || "") === c.languageId
                      )
                      .map((domain) => (
                        <MenuItem key={domain._id} value={domain._id || ""}>
                          {domain.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Lesson Title"
                  value={c.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      contents: prev.contents.map((item, i) =>
                        i === idx ? { ...item, title: value } : item
                      ),
                    }));
                  }}
                  fullWidth
                  required
                />
                <TextField
                  label="Content"
                  value={c.content}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      contents: prev.contents.map((item, i) =>
                        i === idx ? { ...item, content: value } : item
                      ),
                    }));
                  }}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  placeholder="Enter the lesson content, instructions, or description"
                />
                {formData.contents.length > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      color="error"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          contents: prev.contents.filter((_, i) => i !== idx),
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
            <Box>
              <Button
                variant="outlined"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    contents: [
                      ...prev.contents,
                      { languageId: "", domainId: "", title: "", content: "" },
                    ],
                  }))
                }
              >
                Add another language content
              </Button>
            </Box>
            <TextField
              label="Difficulty"
              value={formData.difficulty}
              onChange={(e) =>
                setFormData({ ...formData, difficulty: e.target.value })
              }
              fullWidth
              required
              select
              SelectProps={{ native: true }}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              !formData.difficulty ||
              formData.contents.length === 0 ||
              formData.contents.some(
                (c) =>
                  !c.languageId ||
                  !c.domainId ||
                  !c.title.trim() ||
                  !c.content.trim()
              )
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
