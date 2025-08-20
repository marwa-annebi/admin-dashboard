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
  TablePagination,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Spellcheck,
  CloudUpload,
} from "@mui/icons-material";
import { AdminWordManagementService } from "../Api/services/AdminWordManagementService";
import { OpenAPI } from "../Api/core/OpenAPI";
import { AdminDomainManagementService } from "../Api/services/AdminDomainManagementService";
import type { Domain } from "../Api/models/Domain";
import type { Language } from "../Api/models/Language";
import { AdminLessonManagementService } from "../Api/services/AdminLessonManagementService";
import type { Word } from "../Api/models/Word";
import type { Lesson } from "../Api/models/Lesson";

const WordsManagement: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [domains, setDomains] = useState<
    Array<Domain & { language?: Language }>
  >([]);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState<{
    domainId: string;
    lessonId: string;
  }>({ domainId: "", lessonId: "" });
  const [page, setPage] = useState(0); // zero-based for UI
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [formData, setFormData] = useState({
    lessonId: "",
    word: "",
    sentence: "",
    phonetic: "",
    images: [] as File[],
  });

  const buildImageUrl = (rawPath?: string) => {
    if (!rawPath) return "";
    const trimmed = String(rawPath).trim();
    // Normalize any backslashes first (even when absolute)
    const normalized = trimmed.replace(/\\/g, "/");
    // If already absolute URL, return as-is (after normalization)
    if (/^https?:\/\//i.test(normalized)) return normalized;
    // Ensure leading slash and prepend API base
    const pathWithLeadingSlash = normalized.startsWith("/")
      ? normalized
      : `/${normalized}`;
    const base = (OpenAPI.BASE || "").replace(/\/$/, "");
    return `${base}${pathWithLeadingSlash}`;
  };

  useEffect(() => {
    loadDomains();
    loadLessons();
  }, []);

  useEffect(() => {
    loadWords(page + 1, rowsPerPage);
  }, [page, rowsPerPage, filters.domainId, filters.lessonId]);

  const loadWords = async (
    requestedPage: number = page + 1,
    requestedLimit: number = rowsPerPage
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdminWordManagementService.getApiWordsAdmin({
        page: requestedPage,
        limit: requestedLimit,
        domainId: filters.domainId || undefined,
        lessonId: filters.lessonId || undefined,
      });
      setWords(response.data || []);
      setTotalCount(response.totalCount || 0);
    } catch (err) {
      console.error("Failed to load words:", err);
      setError("Failed to load words. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async (domainId?: string) => {
    setLessonsLoading(true);
    try {
      const response = await AdminLessonManagementService.getApiLessonAdmin({
        page: 1,
        limit: 1000,
        domainId: domainId ?? (filters.domainId || undefined),
        type: "word",
      });
      setLessons(response.data || []);
    } catch (err) {
      console.error("Failed to load lessons for selection:", err);
      // Don't block word list on lessons failure
    } finally {
      setLessonsLoading(false);
    }
  };

  const loadDomains = async () => {
    try {
      const res = await AdminDomainManagementService.getApiDomainesAll({});
      setDomains(res.data || []);
    } catch (err) {
      console.error("Failed to load domains:", err);
    }
  };

  const renderDomainLabel = (domainId?: string) => {
    if (!domainId) return "—";
    const dom = domains.find((d) => d._id === domainId);
    if (!dom) return "—";
    const code = (dom as any).language?.code || (dom as any).language?.name;
    return code
      ? `${dom.name} (${String(code).toUpperCase()})`
      : dom.name || "—";
  };

  const handleOpenDialog = (wordItem?: Word) => {
    if (wordItem) {
      setEditingWord(wordItem);
      setFormData({
        lessonId: wordItem.lesson?._id || "",
        word: wordItem.word || "",
        sentence: wordItem.sentence || "",
        phonetic: wordItem.phonetic || "",
        images: [],
      });
    } else {
      setEditingWord(null);
      setFormData({
        lessonId: "",
        word: "",
        sentence: "",
        phonetic: "",
        images: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWord(null);
    setFormData({
      lessonId: "",
      word: "",
      sentence: "",
      phonetic: "",
      images: [],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData((prev) => ({ ...prev, images: files as File[] }));
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      setError(null);
      if (editingWord) {
        // Update not implemented yet
        setError("Word update not yet implemented in the API.");
      } else {
        await AdminWordManagementService.postApiWordsAdminBulk({
          formData: {
            lessonId: formData.lessonId,
            word: formData.word,
            sentence: formData.sentence || undefined,
            images: formData.images.length
              ? (formData.images as Blob[])
              : undefined,
          },
        });
        await loadWords(page + 1, rowsPerPage);
      }
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save word:", err);
      setError("Failed to save word. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
  };

  const handleDelete = async (_wordId: string) => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      setError("Word deletion not yet implemented in the API.");
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
          Words Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Word
        </Button>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage vocabulary words within lessons. Words include optional images
        and a sentence.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Domain</InputLabel>
          <Select
            label="Domain"
            value={filters.domainId}
            onChange={async (e) => {
              const newDomainId = e.target.value as string;
              setFilters((prev) => ({
                ...prev,
                domainId: newDomainId,
                lessonId: "",
              }));
              // refresh lessons based on domain
              await loadLessons(newDomainId);
              setPage(0);
            }}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          >
            <MenuItem value="">
              <em>All domains</em>
            </MenuItem>
            {domains.map((d) => (
              <MenuItem key={d._id} value={d._id || ""}>
                {renderDomainLabel(d._id || "")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 240 }} disabled={lessonsLoading}>
          <InputLabel>Lesson</InputLabel>
          <Select
            label="Lesson"
            value={filters.lessonId}
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                lessonId: e.target.value as string,
              }));
              setPage(0);
            }}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          >
            <MenuItem value="">
              <em>All lessons</em>
            </MenuItem>
            {lessons.map((lesson) => (
              <MenuItem key={lesson._id} value={lesson._id || ""}>
                {lesson.title}{" "}
                {lesson.difficulty ? `(${lesson.difficulty})` : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
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
                    <TableCell>Word</TableCell>
                    <TableCell>Images</TableCell>
                    <TableCell>Lesson</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {words.map((wordItem) => (
                    <TableRow key={wordItem._id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Spellcheck color="primary" />
                          <strong>{wordItem.word}</strong>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {wordItem.images ? (
                          <img
                            src={buildImageUrl(wordItem.images[0])}
                            alt={wordItem.word}
                            crossOrigin="anonymous"
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                            onError={(e) => {
                              console.error(
                                "Image failed to load:",
                                wordItem?.images?.[0]
                              );
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          "No image"
                        )}
                      </TableCell>
                      <TableCell>
                        {wordItem.lesson?.title || wordItem.lesson?._id || "—"}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(wordItem)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            wordItem._id && handleDelete(wordItem._id)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 20, 50, 100]}
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
        <DialogTitle>{editingWord ? "Edit Word" : "Add New Word"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Alert severity="info">
              Creating a word via bulk will add it to all equivalent lessons
              across languages for the selected lesson's domain and difficulty.
            </Alert>
            <FormControl fullWidth required>
              <InputLabel>Lesson</InputLabel>
              <Select
                label="Lesson"
                value={formData.lessonId}
                onChange={(e) =>
                  setFormData({ ...formData, lessonId: e.target.value })
                }
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              >
                {lessons.map((lesson) => (
                  <MenuItem key={lesson._id} value={lesson._id || ""}>
                    {lesson.title}{" "}
                    {lesson.difficulty ? `(${lesson.difficulty})` : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Word"
              value={formData.word}
              onChange={(e) =>
                setFormData({ ...formData, word: e.target.value })
              }
              fullWidth
              required
              placeholder="Enter the word"
            />

            <TextField
              label="Phonetic"
              value={formData.phonetic}
              onChange={(e) =>
                setFormData({ ...formData, phonetic: e.target.value })
              }
              fullWidth
              placeholder="Enter the phonetic of the word"
            />

            <Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Images
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileChange}
                  hidden
                  multiple
                />
              </Button>
              {formData.images.length > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Selected: {formData.images.map((f) => f.name).join(", ")}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.word || !formData.lessonId || submitting}
          >
            {submitting ? "Saving..." : editingWord ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WordsManagement;
