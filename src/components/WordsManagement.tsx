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
} from "@mui/material";
import { Add, Edit, Delete, Spellcheck } from "@mui/icons-material";

interface Word {
  _id?: string;
  word?: string;
  translation?: string;
  pronunciation?: string;
  lessonId?: string;
}

const WordsManagement: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [formData, setFormData] = useState({
    word: "",
    translation: "",
    pronunciation: "",
    lessonId: "",
  });

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    setLoading(true);
    setError(null);
    try {
      // Note: Words API endpoints not yet implemented
      setError("Words API endpoints not yet implemented. Showing demo data.");
      // Fallback demo data
      setWords([
        {
          _id: "1",
          word: "Dog",
          translation: "Perro",
          pronunciation: "/dɔːg/",
          lessonId: "1",
        },
        {
          _id: "2",
          word: "Cat",
          translation: "Gato",
          pronunciation: "/kæt/",
          lessonId: "1",
        },
        {
          _id: "3",
          word: "Red",
          translation: "Rojo",
          pronunciation: "/red/",
          lessonId: "2",
        },
        {
          _id: "4",
          word: "Blue",
          translation: "Azul",
          pronunciation: "/bluː/",
          lessonId: "2",
        },
      ]);
    } catch (err) {
      console.error("Failed to load words:", err);
      setError("Failed to load words. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (word?: Word) => {
    if (word) {
      setEditingWord(word);
      setFormData({
        word: word.word || "",
        translation: word.translation || "",
        pronunciation: word.pronunciation || "",
        lessonId: word.lessonId || "",
      });
    } else {
      setEditingWord(null);
      setFormData({
        word: "",
        translation: "",
        pronunciation: "",
        lessonId: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWord(null);
    setFormData({ word: "", translation: "", pronunciation: "", lessonId: "" });
  };

  const handleSave = async () => {
    // Note: The current API doesn't support CRUD operations for words
    setError(
      "Word CRUD operations not yet implemented in the API. This is for demonstration purposes."
    );

    // Simulate the operation for demo purposes
    if (editingWord) {
      // Update existing word
      setWords(
        words.map((word) =>
          word._id === editingWord._id ? { ...word, ...formData } : word
        )
      );
    } else {
      // Create new word
      const newWord: Word = {
        _id: Date.now().toString(),
        ...formData,
      };
      setWords([...words, newWord]);
    }
    handleCloseDialog();
  };

  const handleDelete = async (wordId: string) => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      // Note: The current API doesn't support delete operations for words
      setError(
        "Word deletion not yet implemented in the API. This is for demonstration purposes."
      );

      // Simulate the operation for demo purposes
      setWords(words.filter((word) => word._id !== wordId));
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
        Manage vocabulary words within lessons. Words are the fundamental
        building blocks of language learning.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Words management requires additional API endpoints to be implemented.
        Currently showing demo data for UI demonstration.
      </Alert>

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
                    <TableCell>Translation</TableCell>
                    <TableCell>Pronunciation</TableCell>
                    <TableCell>Lesson ID</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {words.map((word) => (
                    <TableRow key={word._id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Spellcheck color="primary" />
                          <strong>{word.word}</strong>
                        </Box>
                      </TableCell>
                      <TableCell>{word.translation}</TableCell>
                      <TableCell>
                        <code style={{ fontSize: "0.9em", color: "#666" }}>
                          {word.pronunciation}
                        </code>
                      </TableCell>
                      <TableCell>{word.lessonId}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(word)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => word._id && handleDelete(word._id)}
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
              label="Translation"
              value={formData.translation}
              onChange={(e) =>
                setFormData({ ...formData, translation: e.target.value })
              }
              fullWidth
              required
              placeholder="Enter the translation"
            />
            <TextField
              label="Pronunciation"
              value={formData.pronunciation}
              onChange={(e) =>
                setFormData({ ...formData, pronunciation: e.target.value })
              }
              fullWidth
              placeholder="Enter IPA pronunciation (optional)"
              helperText="Use IPA notation, e.g., /həˈloʊ/"
            />
            <TextField
              label="Lesson ID"
              value={formData.lessonId}
              onChange={(e) =>
                setFormData({ ...formData, lessonId: e.target.value })
              }
              fullWidth
              required
              placeholder="Enter the lesson ID this word belongs to"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              !formData.word || !formData.translation || !formData.lessonId
            }
          >
            {editingWord ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WordsManagement;
