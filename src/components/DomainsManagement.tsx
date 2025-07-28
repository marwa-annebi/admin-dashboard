import React, { useState, useEffect, useCallback } from "react";
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
  InputAdornment,
  TablePagination,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Category,
  CloudUpload,
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";
import type { Domain } from "../Api/models/Domain";
import type { Language } from "../Api/models/Language";
import { AdminDomainManagementService, LanguageService } from "../Api";

const DomainsManagement: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);
  const [languagesLoading, setLanguagesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    languageId: "",
    image: null as File | null,
    lessonCount: "",
    isActive: true,
  });

  // Debounced search function
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: number;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const loadDomains = async (filters?: {
    name?: string;
    filterLanguage?: string;
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      // Calculate pagination parameters
      const currentPage = filters?.page ?? page;
      const currentLimit = filters?.limit ?? pageSize;

      const data = await AdminDomainManagementService.getApiDomainesAll({
        name: filters?.name || undefined,
        filterLanguage: filters?.filterLanguage || undefined,
        // Note: These pagination parameters might need to be added to the API
        // For now, we'll handle pagination client-side
      });

      // Server-side pagination (if API supports it)
      // For now, we'll simulate it client-side
      const allDomains = data?.data || [];
      const startIndex = currentPage * currentLimit;
      const endIndex = startIndex + currentLimit;
      const paginatedDomains = allDomains.slice(startIndex, endIndex);

      setDomains(paginatedDomains);
      setTotalCount(allDomains.length);
    } catch (err) {
      console.error("Failed to load domains:", err);
      setError("Failed to load domains. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of loadDomains for search
  const debouncedLoadDomains = useCallback(
    debounce((filters: { name?: string; filterLanguage?: string }) => {
      loadDomains({ ...filters, page: 0 }); // Reset to first page on search
      setPage(0);
    }, 500),
    [pageSize]
  );

  useEffect(() => {
    loadDomains();
    loadLanguages();
  }, []);

  // Effect for pagination changes
  useEffect(() => {
    const filters = {
      name: searchTerm.trim() || undefined,
      filterLanguage: selectedLanguageFilter || undefined,
      page,
      limit: pageSize,
    };
    loadDomains(filters);
  }, [page, pageSize]);

  // Effect for search term changes (debounced)
  useEffect(() => {
    const filters = {
      name: searchTerm.trim() || undefined,
      filterLanguage: selectedLanguageFilter || undefined,
    };

    if (searchTerm.trim() || selectedLanguageFilter) {
      debouncedLoadDomains(filters);
    } else {
      loadDomains({ page: 0 });
      setPage(0);
    }
  }, [searchTerm, selectedLanguageFilter, debouncedLoadDomains]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when changing page size
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLanguageFilter("");
    setPage(0);
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" || selectedLanguageFilter !== "";

  const loadLanguages = async () => {
    setLanguagesLoading(true);
    try {
      const languageData = await LanguageService.getApiLanguages();
      setLanguages(languageData || []);
    } catch (err) {
      console.error("Failed to load languages:", err);
      setError("Failed to load languages. Please check API connection.");
    } finally {
      setLanguagesLoading(false);
    }
  };

  const handleOpenDialog = (domain?: any) => {
    if (domain) {
      setEditingDomain(domain);
      setFormData({
        name: domain.name || "",
        description: domain.description || "",
        languageId:
          typeof domain.language === "object" ? domain.language?._id || "" : "",
        image: null,
        lessonCount: domain.lessonCount?.toString() || "",
        isActive: domain.isActive ?? true,
      });
    } else {
      setEditingDomain(null);
      setFormData({
        name: "",
        description: "",
        languageId: "",
        image: null,
        lessonCount: "",
        isActive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDomain(null);
    setFormData({
      name: "",
      description: "",
      languageId: "",
      image: null,
      lessonCount: "",
      isActive: true,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSave = async () => {
    try {
      if (editingDomain) {
        // Update existing domain
        const updateFormData: any = {
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
        };

        if (formData.languageId) {
          // Send language ID as languageCode (backend expects this field name)
          const selectedLanguage = languages.find(
            (lang) => lang._id === formData.languageId
          );
          updateFormData.languageCode =
            selectedLanguage?.code || formData.languageId;
        }

        if (formData.image) {
          updateFormData.image = formData.image;
        }

        if (formData.lessonCount) {
          updateFormData.lessonCount = parseInt(formData.lessonCount);
        }

        const updated = await AdminDomainManagementService.putApiDomaines({
          id: editingDomain._id!,
          formData: updateFormData,
        });

        setDomains(
          domains.map((domain) =>
            domain._id === editingDomain._id
              ? { ...domain, ...updated }
              : domain
          )
        );
      } else {
        // Create new domain
        const selectedLanguage = languages.find(
          (lang) => lang._id === formData.languageId
        );

        // Build the form data object for the API call
        const createFormData: any = {
          name: formData.name,
          languageCode: selectedLanguage?.code || "",
        };

        if (formData.description) {
          createFormData.description = formData.description;
        }

        if (formData.image) {
          createFormData.image = formData.image;
        }

        if (formData.lessonCount) {
          createFormData.lessonCount = parseInt(formData.lessonCount);
        }

        console.log("Creating domain with data:", createFormData);

        const newDomain = await AdminDomainManagementService.postApiDomaines({
          formData: createFormData,
        });

        // Reload domains to get the complete data
        await loadDomains();
      }
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save domain:", err);
      setError("Failed to save domain. Please try again.");
    }
  };

  const handleDelete = async (domainId: string) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      try {
        await AdminDomainManagementService.deleteApiDomaines({ id: domainId });
        setDomains(domains.filter((domain) => domain._id !== domainId));
      } catch (err) {
        console.error("Failed to delete domain:", err);
        setError("Failed to delete domain. Please try again.");
      }
    }
  };

  const isFormValid = () => {
    if (editingDomain) {
      return formData.name.trim() !== "";
    } else {
      return formData.name.trim() !== "" && formData.languageId.trim() !== "";
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
          Domains Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Domain
        </Button>
      </Box>

      <Typography variant="body1" paragraph color="text.secondary">
        Manage learning domains. Domains group related lessons and words by
        topic.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading || languagesLoading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Card>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: { sm: "center" },
                  mb: hasActiveFilters ? 2 : 0,
                }}
              >
                <TextField
                  label="Search Domains"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flexGrow: 1, maxWidth: { sm: 300 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setSearchTerm("")}
                          size="small"
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 200 }}
                >
                  <InputLabel>Filter by Language</InputLabel>
                  <Select
                    value={selectedLanguageFilter}
                    label="Filter by Language"
                    onChange={(e) => setSelectedLanguageFilter(e.target.value)}
                  >
                    <MenuItem value="">All Languages</MenuItem>
                    {languages.map((language) => (
                      <MenuItem key={language._id} value={language._id}>
                        {language.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {hasActiveFilters && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Clear />}
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>
              {hasActiveFilters && (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {searchTerm.trim() && (
                    <Chip
                      label={`Search: "${searchTerm}"`}
                      onDelete={() => setSearchTerm("")}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {selectedLanguageFilter && (
                    <Chip
                      label={`Language: ${
                        languages.find(
                          (lang) => lang._id === selectedLanguageFilter
                        )?.name
                      }`}
                      onDelete={() => setSelectedLanguageFilter("")}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>
              )}
            </Box>

            {(searchTerm.trim() || selectedLanguageFilter) && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {domains.length > 0
                  ? `Found ${domains.length} domain${
                      domains.length !== 1 ? "s" : ""
                    }`
                  : "No domains found"}{" "}
                {hasActiveFilters ? "matching your criteria" : ""}
              </Typography>
            )}

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Lessons</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {domains.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Box sx={{ py: 4 }}>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            No domains found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {searchTerm.trim() || selectedLanguageFilter
                              ? "Try adjusting your search or filter criteria"
                              : "No domains have been created yet"}
                          </Typography>
                          {hasActiveFilters && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Clear />}
                              onClick={clearFilters}
                              sx={{ mt: 2 }}
                            >
                              Clear Filters
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    domains.map((domain: any) => (
                      <TableRow key={domain._id}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Category color="primary" />
                            {domain.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {domain.description || "No description"}
                        </TableCell>
                        <TableCell>
                          {typeof domain.language === "object"
                            ? domain.language?.name
                            : domain.language || "N/A"}
                        </TableCell>
                        <TableCell>{domain.lessonCount || 0}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color={
                              domain.isActive ? "success.main" : "error.main"
                            }
                          >
                            {domain.isActive ? "Active" : "Inactive"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {domain.image ? (
                            <img
                              src={`http://localhost:5000/${domain.image}`}
                              alt={domain.name}
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                                borderRadius: 4,
                              }}
                              onError={(e) => {
                                console.error(
                                  "Image failed to load:",
                                  domain.image
                                );
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            "No image"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(domain)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              domain._id && handleDelete(domain._id)
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
              count={totalCount}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={pageSize}
              onRowsPerPageChange={handlePageSizeChange}
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
          {editingDomain ? "Edit Domain" : "Add New Domain"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Domain Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />

            {!editingDomain && (
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={formData.languageId}
                  label="Language"
                  onChange={(e) =>
                    setFormData({ ...formData, languageId: e.target.value })
                  }
                  required
                >
                  {languages.map((language) => (
                    <MenuItem key={language._id} value={language._id}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {editingDomain && (
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={formData.languageId}
                  label="Language"
                  onChange={(e) =>
                    setFormData({ ...formData, languageId: e.target.value })
                  }
                >
                  {languages.map((language) => (
                    <MenuItem key={language._id} value={language._id}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Lesson Count"
              type="number"
              value={formData.lessonCount}
              onChange={(e) =>
                setFormData({ ...formData, lessonCount: e.target.value })
              }
              fullWidth
              inputProps={{ min: 0 }}
            />

            {editingDomain && (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.isActive ? "true" : "false"}
                  label="Status"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.value === "true",
                    })
                  }
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            )}

            <Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                fullWidth
              >
                Upload Image
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
              {formData.image && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Selected: {formData.image.name}
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
            disabled={!isFormValid()}
          >
            {editingDomain ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DomainsManagement;
