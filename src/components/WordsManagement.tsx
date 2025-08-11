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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Spellcheck,
  CloudUpload,
} from "@mui/icons-material";
import { AdminWordManagementService } from "../Api/services/AdminWordManagementService";
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
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    lessonId: "",
    word: "",
    sentence: "",
    images: [] as File[],
  });

  useEffect(() => {
    loadLessons();
    loadWords();
  }, []);

  const loadWords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdminWordManagementService.getApiWordsAdmin({
        page: 1,
        limit: 1000,
      });
      setWords(response.data || []);
    } catch (err) {
      console.error("Failed to load words:", err);
      setError("Failed to load words. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async () => {
    try {
      const response = await AdminLessonManagementService.getApiLessonAdmin({
        page: 1,
        limit: 1000,
      });
      setLessons(response.data || []);
    } catch (err) {
      console.error("Failed to load lessons for selection:", err);
      // Don't block word list on lessons failure
    }
  };

  const handleOpenDialog = (wordItem?: Word) => {
    if (wordItem) {
      setEditingWord(wordItem);
      setFormData({
        lessonId: wordItem.lesson?._id || "",
        word: wordItem.word || "",
        sentence: wordItem.sentence || "",
        images: [],
      });
    } else {
      setEditingWord(null);
      setFormData({ lessonId: "", word: "", sentence: "", images: [] });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWord(null);
    setFormData({ lessonId: "", word: "", sentence: "", images: [] });
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
        await AdminWordManagementService.postApiWordsAdmin({
          formData: {
            lessonId: formData.lessonId,
            word: formData.word,
            sentence: formData.sentence || undefined,
            images: formData.images.length
              ? (formData.images as Blob[])
              : undefined,
          },
        });
        await loadWords();
      }
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save word:", err);
      setError("Failed to save word. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                    <TableCell>Sentence</TableCell>
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
                      <TableCell>{wordItem.sentence || "—"}</TableCell>
                      <TableCell>
                        {wordItem.images && wordItem.images.length > 0 ? (
                          <Box
                            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                          >
                            {wordItem.images.slice(0, 3).map((img, idx) => (
                              <img
                                key={`${wordItem._id}-img-${idx}`}
                                src={`http://localhost:5000/${img}`}
                                alt={`word-img-${idx}`}
                                style={{
                                  width: 36,
                                  height: 36,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  border: "1px solid #eee",
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ))}
                            {wordItem.images.length > 3 && (
                              <Chip
                                label={`+${wordItem.images.length - 3}`}
                                size="small"
                              />
                            )}
                          </Box>
                        ) : (
                          "No images"
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
              label="Sentence"
              value={formData.sentence}
              onChange={(e) =>
                setFormData({ ...formData, sentence: e.target.value })
              }
              fullWidth
              placeholder="Enter a sentence using the word (optional)"
              multiline
              rows={3}
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
