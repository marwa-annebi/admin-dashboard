import React, { useEffect, useState } from "react";
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
import { Add, Edit, Delete, Search, Notes } from "@mui/icons-material";
import { AdminParagraphManagementService } from "../Api/services/AdminParagraphManagementService";
import { AdminLessonManagementService } from "../Api/services/AdminLessonManagementService";
import { AdminDomainManagementService } from "../Api/services/AdminDomainManagementService";
import type { Domain } from "../Api/models/Domain";
import type { Language } from "../Api/models/Language";
import type { Lesson } from "../Api/models/Lesson";

interface ParagraphItem {
  _id: string;
  text: string;
  lessonId: string;
  lessonTitle: string;
  domainId: string;
}

const ParagraphsManagement: React.FC = () => {
  const [allItems, setAllItems] = useState<ParagraphItem[]>([]);
  const [items, setItems] = useState<ParagraphItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editing, setEditing] = useState<ParagraphItem | null>(null);

  const [domains, setDomains] = useState<
    Array<Domain & { language?: Language }>
  >([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");

  const [formData, setFormData] = useState({
    textIncomplete: "",
    lessonId: "",
  });

  useEffect(() => {
    loadItems();
    loadDomains();
    loadLessonOptions();
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      setPage(0);
      loadItems(searchTerm.trim() || undefined, selectedLessonId || undefined);
    }, 300);
    return () => clearTimeout(handle);
  }, [searchTerm, selectedLessonId]);

  useEffect(() => {
    const start = page * pageSize;
    const end = start + pageSize;
    const filtered = allItems.filter((it) => {
      const matchDomain = !selectedDomainId || it.domainId === selectedDomainId;
      const matchLesson = !selectedLessonId || it.lessonId === selectedLessonId;
      return matchDomain && matchLesson;
    });
    setItems(filtered.slice(start, end));
  }, [page, pageSize, allItems, selectedDomainId, selectedLessonId]);

  const loadItems = async (search?: string, lessonId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response =
        await AdminParagraphManagementService.getApiParagraphsAdmin({
          page: 1,
          limit: 1000,
          search,
          lessonId,
        });
      const list = (response.data || []).map((p: any) => ({
        _id: p._id || "",
        text: p.textIncomplete || "",
        lessonId: (p.lesson && p.lesson._id) || "",
        lessonTitle: (p.lesson && p.lesson.title) || "",
        domainId:
          (p.lesson &&
            p.lesson.domain &&
            (p.lesson.domain._id || p.lesson.domain.id)) ||
          "",
      }));
      setAllItems(list);
    } catch (e) {
      console.error(e);
      setError("Failed to load paragraphs.");
    } finally {
      setLoading(false);
    }
  };

  const loadDomains = async () => {
    try {
      const { data } = await AdminDomainManagementService.getApiDomainesAll({});
      setDomains(data || []);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const loadLessonOptions = async () => {
    setLessonsLoading(true);
    try {
      const res = await AdminLessonManagementService.getApiLessonAdmin({
        page: 1,
        limit: 1000,
        type: "paragraph",
      });
      setLessons((res.data as any) || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLessonsLoading(false);
    }
  };

  const renderDomainLabel = (domainId?: string) => {
    if (!domainId) return "—";
    const dom: (Domain & { language?: Language }) | undefined = domains.find(
      (d) => d._id === domainId
    );
    if (!dom) return "—";
    const code = (dom as any).language?.code || (dom as any).language?.name;
    return code
      ? `${dom.name} (${String(code).toUpperCase()})`
      : dom.name || "—";
  };

  const handleOpenDialog = (item?: ParagraphItem) => {
    if (item) {
      setEditing(item);
      setFormData({
        textIncomplete: item.text || "",
        lessonId: item.lessonId || "",
      });
    } else {
      setEditing(null);
      setFormData({ textIncomplete: "", lessonId: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditing(null);
    setFormData({ textIncomplete: "", lessonId: "" });
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await AdminParagraphManagementService.putApiParagraphsAdmin({
          id: editing._id,
          requestBody: {
            textIncomplete: formData.textIncomplete,
            lessonId: editing.lessonId,
          },
        });
        const updated = allItems.map((x) =>
          x._id === editing._id ? { ...x, text: formData.textIncomplete } : x
        );
        setAllItems(updated);
      } else {
        setError("Creation not implemented by API.");
      }
      handleCloseDialog();
    } catch (e) {
      console.error(e);
      setError("Failed to save. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this paragraph?")) {
      try {
        await AdminParagraphManagementService.deleteApiParagraphsAdmin({ id });
        const updated = allItems.filter((x) => x._id !== id);
        setAllItems(updated);
        const newTotalPages = Math.ceil(updated.length / pageSize);
        if (page >= newTotalPages && newTotalPages > 0) {
          setPage(newTotalPages - 1);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to delete paragraph.");
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
          Paragraphs Management
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search paragraphs..."
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
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Filter by Domain</InputLabel>
            <Select
              label="Filter by Domain"
              value={selectedDomainId}
              onChange={(e) => {
                setSelectedDomainId(e.target.value as string);
                setSelectedLessonId("");
                setPage(0);
              }}
            >
              <MenuItem value="">All</MenuItem>
              {domains.map((d) => (
                <MenuItem key={d._id} value={d._id || ""}>
                  {renderDomainLabel(d._id || "")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Lesson</InputLabel>
            <Select
              label="Filter by Lesson"
              value={selectedLessonId}
              onChange={(e) => {
                setSelectedLessonId(e.target.value as string);
                setPage(0);
              }}
              disabled={lessonsLoading}
            >
              <MenuItem value="">All</MenuItem>
              {(selectedDomainId
                ? (lessons as any[]).filter(
                    (l) =>
                      (l.domain && (l.domain._id || l.domain.id)) ===
                      selectedDomainId
                  )
                : (lessons as any[])
              ).map((l: any) => (
                <MenuItem key={l._id} value={l._id || ""}>
                  {l.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Paragraph
          </Button>
        </Box>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage paragraphs tied to lessons. Search operates on the paragraph
        text.
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
                    <TableCell>Text</TableCell>
                    <TableCell>Lesson</TableCell>
                    <TableCell>Domain</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Box sx={{ py: 4 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            No paragraphs found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Create your first paragraph
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Notes color="primary" />
                            {item.text && item.text.length > 50
                              ? `${item.text.substring(0, 50)}...`
                              : item.text}
                          </Box>
                        </TableCell>
                        <TableCell>{item.lessonTitle || "—"}</TableCell>
                        <TableCell>
                          {renderDomainLabel(item.domainId)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(item)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(item._id)}
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
              count={allItems.length}
              page={page}
              onPageChange={(_, p) => setPage(p)}
              rowsPerPage={pageSize}
              onRowsPerPageChange={(e) => {
                setPageSize(parseInt(e.target.value, 10));
                setPage(0);
              }}
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
          {editing ? "Edit Paragraph" : "Add Paragraph"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {!editing && (
              <FormControl fullWidth required>
                <InputLabel>Lesson</InputLabel>
                <Select
                  label="Lesson"
                  value={formData.lessonId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lessonId: e.target.value as string,
                    }))
                  }
                  disabled={lessonsLoading}
                >
                  {lessons.map((l: any) => (
                    <MenuItem key={l._id} value={l._id || ""}>
                      {l.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {editing && (
              <TextField
                label="Lesson"
                value={
                  items.find((i) => i._id === editing._id)?.lessonTitle || ""
                }
                fullWidth
                disabled
              />
            )}
            <TextField
              label="Paragraph Text"
              value={formData.textIncomplete}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  textIncomplete: e.target.value,
                }))
              }
              fullWidth
              required
              multiline
              rows={4}
              placeholder="Enter the paragraph text"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              !formData.textIncomplete.trim() ||
              (!editing && !formData.lessonId)
            }
          >
            {editing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParagraphsManagement;
