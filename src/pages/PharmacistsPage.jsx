import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Chip,
  Drawer,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  TablePagination,
  Autocomplete,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import CodeIcon from "@mui/icons-material/Code";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import GroupsIcon from "@mui/icons-material/Groups";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MedicationIcon from "@mui/icons-material/Medication";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SpeedIcon from "@mui/icons-material/Speed";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VerifiedIcon from "@mui/icons-material/Verified";
import Groups2Icon from "@mui/icons-material/Groups2";
import FilterListIcon from "@mui/icons-material/FilterList";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const NavItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      px: 2,
      py: 1.5,
      borderRadius: "12px",
      mb: 0.5,
      cursor: "pointer",
      ...(active
        ? {
            bgcolor: "#137fec",
            color: "white",
            boxShadow: "0 4px 6px -1px rgba(19, 127, 236, 0.2)",
          }
        : {
            color: "#475569",
            "&:hover": {
              bgcolor: "#f8fafc",
              "& .MuiSvgIcon-root": { color: "#137fec" },
            },
          }),
      transition: "all 0.2s",
    }}
  >
    <Icon sx={{ fontSize: 24, ...(active ? {} : { color: "inherit" }) }} />
    <Typography sx={{ fontWeight: active ? 600 : 500, fontSize: "0.9rem" }}>
      {label}
    </Typography>
    {badge && (
      <Box
        sx={{
          ml: "auto",
          bgcolor: active ? "rgba(255,255,255,0.2)" : "#f1f5f9",
          color: active ? "white" : "#475569",
          fontSize: "0.625rem",
          fontWeight: 700,
          px: 1,
          py: 0.25,
          borderRadius: "99px",
        }}
      >
        {badge}
      </Box>
    )}
  </Box>
);

// Helper: get initials from a full name
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Helper: format ISO date nicely
const formatLoginTime = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

const PharmacistsPage = () => {
  const [authUser, setAuthUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Overview");
  const [prescriptions, setPrescriptions] = React.useState([]);
  const [drugs, setDrugs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [addDrugModalOpen, setAddDrugModalOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [editingDrugId, setEditingDrugId] = React.useState(null);
  const [drugData, setDrugData] = React.useState({
    name: "",
    category: "",
    manufacturerCompany: "",
    stock: "",
    price: "",
    expiryDate: "",
  });
  const [selectedPrescription, setSelectedPrescription] = React.useState(null);
  const [prescriptionModalOpen, setPrescriptionModalOpen] =
    React.useState(false);

  // Pagination state for Prescriptions
  const [prescriptionPage, setPrescriptionPage] = React.useState(0);
  const [prescriptionRowsPerPage, setPrescriptionRowsPerPage] =
    React.useState(10);
  const [prescriptionTotal, setPrescriptionTotal] = React.useState(0);

  // Pagination state for Drugs
  const [drugPage, setDrugPage] = React.useState(0);
  const [drugRowsPerPage, setDrugRowsPerPage] = React.useState(10);
  const [drugTotal, setDrugTotal] = React.useState(0);

  // Billing (Invoice) state
  const [invoices, setInvoices] = React.useState([]);
  const [invoicePage, setInvoicePage] = React.useState(0);
  const [invoiceRowsPerPage, setInvoiceRowsPerPage] = React.useState(10);
  const [invoiceTotal, setInvoiceTotal] = React.useState(0);
  const [addInvoiceModalOpen, setAddInvoiceModalOpen] = React.useState(false);
  const [newInvoiceData, setNewInvoiceData] = React.useState({
    patientName: "",
    mobileNumber: "",
    emailId: "",
    items: [],
  });
  const [generatedInvoice, setGeneratedInvoice] = React.useState(null);
  const [summaryModalOpen, setSummaryModalOpen] = React.useState(false);
  const [selectedDrugForInvoice, setSelectedDrugForInvoice] =
    React.useState(null);
  const [quantityForInvoice, setQuantityForInvoice] = React.useState(1);
  const [stats, setStats] = React.useState({
    totalMedicines: 0,
    outOfStock: 0,
    totalMonthlyRevenue: 0,
    completedInvoices: 0,
  });

  const [viewInvoiceModalOpen, setViewInvoiceModalOpen] = React.useState(false);
  const [viewingInvoice, setViewingInvoice] = React.useState(null);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = React.useState(false);

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    React.useState(false);
  const [selectedDrugForDeletion, setSelectedDrugForDeletion] =
    React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("authUser"));
    if (storedUser) {
      setAuthUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchPrescriptions = async (page = 0, limit = 10) => {
    try {
      setLoading(true);
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(
        `${api}/doctor/prescriptions?page=${page + 1}&limit=${limit}`,
      );
      setPrescriptions(response.data.data || []);
      setPrescriptionTotal(response.data.total || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setLoading(false);
    }
  };

  const fetchDrugs = async (page = 0, limit = 10) => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(
        `${api}/pharmacist/drugs?page=${page + 1}&limit=${limit}`,
      );
      setDrugs(response.data.data || []);
      setDrugTotal(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching drugs:", error);
    }
  };

  const fetchInvoices = async (page = 0, limit = 10) => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(
        `${api}/pharmacist/invoices?page=${page + 1}&limit=${limit}`,
      );
      setInvoices(response.data.data || []);
      setInvoiceTotal(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.get(`${api}/pharmacist/stats`);
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  React.useEffect(() => {
    fetchPrescriptions(prescriptionPage, prescriptionRowsPerPage);
    fetchDashboardStats();
  }, [prescriptionPage, prescriptionRowsPerPage]);

  React.useEffect(() => {
    fetchDrugs(drugPage, drugRowsPerPage);
    fetchDashboardStats();
  }, [drugPage, drugRowsPerPage]);

  React.useEffect(() => {
    fetchInvoices(invoicePage, invoiceRowsPerPage);
    fetchDashboardStats();
  }, [invoicePage, invoiceRowsPerPage]);

  const handleOpenPrescription = (row) => {
    setSelectedPrescription(row);
    setPrescriptionModalOpen(true);
  };

  const handleClosePrescription = () => {
    setPrescriptionModalOpen(false);
    setSelectedPrescription(null);
  };

  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    navigate("/login");
  };

  const handleAddDrugToInvoice = () => {
    if (!selectedDrugForInvoice) return;

    const qty = parseInt(quantityForInvoice);
    if (isNaN(qty) || qty < 1) {
      toast.error("Please enter a valid quantity (minimum 1)");
      return;
    }

    if (qty > selectedDrugForInvoice.stock) {
      toast.error(
        `Not enough stock. Available: ${selectedDrugForInvoice.stock}`,
      );
      return;
    }

    const newItem = {
      drugId: selectedDrugForInvoice._id,
      name: selectedDrugForInvoice.name,
      quantity: parseInt(quantityForInvoice),
      price: selectedDrugForInvoice.price,
      total: selectedDrugForInvoice.price * quantityForInvoice,
    };

    setNewInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    setSelectedDrugForInvoice(null);
    setQuantityForInvoice(1);
  };

  const calculateInvoiceTotal = () => {
    const subtotal = newInvoiceData.items.reduce(
      (sum, item) => sum + item.total,
      0,
    );
    return Number((subtotal * 1.05).toFixed(2));
  };

  const generateInvoicePDF = (invoice) => {
    const doc = new jsPDF();

    // Theme Colors
    const primaryBlue = [19, 127, 236]; // #137fec
    const lightBlue = [207, 230, 253]; // #cfe6fd (Light blue for notes)
    const grayText = [100, 116, 139]; // #64748b
    const darkSlate = [15, 23, 42]; // #0f172a

    // -- HEADER SECTION (Ultra Compact Solid Blue) --
    doc.setFillColor(...primaryBlue);
    doc.rect(0, 0, 210, 28, "F");

    // Monitor/Invoice Icon Placeholder (Scaled Down)
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.roundedRect(15, 4, 12, 9, 2, 2, "D"); // Monitor screen
    doc.line(18, 13, 18, 15); // Monitor neck
    doc.line(24, 13, 24, 15);
    doc.line(16, 15, 26, 15); // Monitor base
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(6);
    doc.text("</>", 21, 10, { align: "center" });

    // "Invoice" Text (Compact Font)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", 15, 24);

    // Hospital Details (Ultra Compact & Centered in new height)
    doc.setFontSize(14);
    doc.text("City General Hospital", 195, 12, { align: "right" });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("Ahmedabad, Gujarat, India", 195, 19, { align: "right" });
    doc.text("Postal Code: 380001", 195, 23, { align: "right" });

    // -- WATERMARK (Premium LocalHospitalIcon Vector) --
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.015 })); // Extreme subtlety for true watermark look
    doc.setFillColor(180, 180, 180);

    // Draw Icon Body (Filled Rounded Square)
    doc.roundedRect(65, 105, 80, 80, 12, 12, "F");

    // Draw Centered Cross (Plus sign as a knockout/white fill)
    doc.setFillColor(255, 255, 255);
    doc.rect(100, 120, 10, 50, "F"); // Vertical bar
    doc.rect(80, 140, 50, 10, "F"); // Horizontal bar
    doc.restoreGraphicsState();

    // -- MIDDLE SECTION (Bill To & Metadata) --
    const middleY = 45;
    doc.setTextColor(...darkSlate);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 15, middleY);
    doc.setFontSize(14);
    doc.text(invoice.patientName, 15, middleY + 8);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text(`Contact: ${invoice.mobileNumber}`, 15, middleY + 15);
    if (invoice.emailId) {
      doc.text(`Email: ${invoice.emailId}`, 15, middleY + 20);
    }

    // Invoice Metadata (Right Aligned)
    doc.setTextColor(...darkSlate);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE #", 195, middleY, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkSlate);
    doc.text(invoice.invoiceNumber || "N/A", 195, middleY + 5, {
      align: "right",
    });

    doc.setFont("helvetica", "bold");
    doc.text("DATE", 195, middleY + 15, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(
      new Date(invoice.createdAt || Date.now()).toLocaleDateString(),
      195,
      middleY + 20,
      { align: "right" },
    );

    // -- ITEMS TABLE --
    const tableData = invoice.items.map((item, index) => [
      `Item ${index + 1}`,
      item.name,
      item.quantity,
      `Rs. ${item.price.toLocaleString()}`,
      `Rs. ${item.total.toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: middleY + 30,
      head: [["ITEMS", "DESCRIPTION", "QUANTITY", "PRICE", "AMOUNT"]],
      body: tableData,
      theme: "plain",
      headStyles: {
        textColor: [0, 0, 0],
        fontSize: 8,
        fontStyle: "bold",
        cellPadding: 4,
      },
      bodyStyles: {
        textColor: darkSlate,
        fontSize: 9,
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: "auto" },
        2: { halign: "center", cellWidth: 25 },
        3: { halign: "center", cellWidth: 28 },
        4: { halign: "right", cellWidth: 32 },
      },
      margin: { left: 15, right: 15 },
    });

    // -- SUMMARY SECTION (Calculations) --
    const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * 0.05;
    const summaryY = doc.lastAutoTable.finalY + 8;

    doc.setFontSize(8);
    doc.setTextColor(...grayText);
    doc.text(`Sub-total:`, 160, summaryY, { align: "right" });
    doc.text(`Rs. ${subtotal.toLocaleString()}`, 195, summaryY, {
      align: "right",
    });

    doc.text(`Tax (5%):`, 160, summaryY + 5, { align: "right" });
    doc.text(`Rs. ${taxAmount.toLocaleString()}`, 195, summaryY + 5, {
      align: "right",
    });

    // -- FOOTER BOXES (Notes & Total Due) --
    const footerY = summaryY + 10;

    // Notes Box (Light Blue)
    doc.setFillColor(...lightBlue);
    doc.rect(15, footerY, 105, 28, "F");
    doc.setTextColor(...darkSlate);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("NOTES:", 20, footerY + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      "Medicine once sold cannot be returned. Please keep this invoice for your records. This invoice was generated with MedCore.",
      20,
      footerY + 15,
      { maxWidth: 95 },
    );

    // Total Box (Solid Blue)
    doc.setFillColor(...primaryBlue);
    doc.rect(120, footerY, 75, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL DUE", 188, footerY + 10, { align: "right" });
    doc.setFontSize(16);
    doc.text(`Rs. ${invoice.totalAmount.toLocaleString()}`, 188, footerY + 22, {
      align: "right",
    });
    doc.save(`Invoice_${invoice.invoiceNumber || Date.now()}.pdf`);
  };

  const handleGenerateInvoice = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      if (
        !newInvoiceData.patientName ||
        !newInvoiceData.mobileNumber ||
        newInvoiceData.items.length === 0
      ) {
        toast.error("Please fill in required fields and add at least one drug");
        return;
      }

      // 10-digit Mobile Number Validation
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(newInvoiceData.mobileNumber)) {
        toast.error("Please enter a valid 10-digit mobile number");
        return;
      }

      // Email ID Validation (if provided)
      if (newInvoiceData.emailId) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newInvoiceData.emailId)) {
          toast.error("Please enter a valid email address");
          return;
        }
      }

      setIsGeneratingInvoice(true);
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(`${api}/pharmacist/invoices`, {
        patientName: newInvoiceData.patientName,
        mobileNumber: newInvoiceData.mobileNumber,
        emailId: newInvoiceData.emailId,
        pharmacistId: authUser?.id,
        items: newInvoiceData.items,
        totalAmount: calculateInvoiceTotal(),
      });

      if (response.data.success) {
        toast.success("Invoice generated successfully!");
        setGeneratedInvoice(response.data.invoice);
        setAddInvoiceModalOpen(false);
        setSummaryModalOpen(true);
        setNewInvoiceData({
          patientName: "",
          mobileNumber: "",
          emailId: "",
          items: [],
        });
        fetchInvoices(invoicePage, invoiceRowsPerPage);
        fetchDrugs(drugPage, drugRowsPerPage); // Refresh stock
        fetchDashboardStats();
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error(error.response?.data?.message || "Failed to create invoice");
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  const resetDrugForm = () => {
    setDrugData({
      name: "",
      category: "",
      manufacturerCompany: "",
      stock: "",
      price: "",
      expiryDate: "",
      content: "",
    });
    setIsEditMode(false);
    setEditingDrugId(null);
  };

  const handleEditDrugClick = (drug) => {
    setDrugData({
      name: drug.name,
      category: drug.category,
      manufacturerCompany: drug.manufacturerCompany,
      stock: drug.stock,
      price: drug.price,
      expiryDate: drug.expiryDate ? drug.expiryDate.split("T")[0] : "",
      content: drug.content || "",
    });
    setEditingDrugId(drug._id);
    setIsEditMode(true);
    setAddDrugModalOpen(true);
  };

  const handleAddDrugChange = (e) => {
    const { name, value } = e.target;
    setDrugData({ ...drugData, [name]: value });
  };

  const handleAddDrugSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      let response;

      if (isEditMode) {
        response = await axios.put(
          `${api}/pharmacist/update-drug/${editingDrugId}`,
          {
            ...drugData,
            pharmacistId: authUser?.id,
          },
        );
      } else {
        response = await axios.post(`${api}/pharmacist/add-drug`, {
          ...drugData,
          pharmacistId: authUser?.id,
        });
      }

      if (response.data.success) {
        toast.success(
          isEditMode
            ? "Drug updated successfully!"
            : "Drug added successfully!",
        );
        setAddDrugModalOpen(false);
        resetDrugForm();
        fetchDrugs(drugPage, drugRowsPerPage);
        fetchDashboardStats();
      }
    } catch (error) {
      console.error("Error saving drug:", error);
      toast.error(error.response?.data?.message || "Failed to save drug");
    }
  };

  const handleDeleteDrug = (drug) => {
    setSelectedDrugForDeletion(drug);
    setDeleteConfirmDialogOpen(true);
  };

  const confirmDeleteDrug = async () => {
    if (!selectedDrugForDeletion) return;

    try {
      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.delete(
        `${api}/pharmacist/delete-drug/${selectedDrugForDeletion._id}`,
      );

      if (response.data.success) {
        toast.success("Medicine deleted successfully!");
        setDeleteConfirmDialogOpen(false);
        setSelectedDrugForDeletion(null);
        fetchDrugs(drugPage, drugRowsPerPage);
        fetchDashboardStats();
      }
    } catch (error) {
      console.error("Error deleting drug:", error);
      toast.error(error.response?.data?.message || "Failed to delete drug");
    }
  };

  const pharmacistName = authUser?.name || "Dr. Sarah Mills";

  const pharmacistRole = authUser?.role || "Head Pharmacist";
  const pharmacistAvatar =
    authUser?.avatar ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZNiET0YdMIwGquYxf-z3nhsq03H1b4hj35hFX9rbxm5fTBRGA_HgYpTVC-GanlJs8Hd7g65Yilc0xWHpTxWQZOXbpvCRSpz-h2YUFKkgrGuoWyYx7iEFBp_8bxggJQpRwB6Fn19IjiYvvkbHhKTYqC4te8a5--v_fvV3R2Gi3lmkOgnkAgeMUsVtjWvcY0erBbkzhHKchEIEU64Qco_2_69A_QFk3DrvIf--PsW5r-8oXG-FQMnK5HjDqMA8T_rUc16iJwhVe2lj";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        overflowY: "auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: 288,
          flexDirection: "column",
          bgcolor: "white",
          borderRight: "1px solid #e2e8f0",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* <Box sx={{ p: 3, borderBottom: "1px solid #f8fafc" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "#137fec",
            }}
          >
            <HealthAndSafetyIcon sx={{ fontSize: 32 }} />
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.025em",
                color: "#0f172a",
              }}
            >
              MedCore
            </Typography>
          </Box>
          <Box sx={{ mt: 2, px: 0.5 }}>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Main Branch
            </Typography>
            <Typography
              sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}
            >
              Station PH-204
            </Typography>
          </Box>
        </Box> */}

        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <NavItem
            icon={DashboardIcon}
            label="Overview"
            active={activeTab === "Overview"}
            onClick={() => setActiveTab("Overview")}
          />
          <NavItem
            icon={Inventory2Icon}
            label="Drugs Inventory"
            active={activeTab === "Drugs Inventory"}
            onClick={() => setActiveTab("Drugs Inventory")}
          />
          <NavItem
            icon={AccountBalanceWalletIcon}
            label="Billing"
            active={activeTab === "Billing"}
            onClick={() => setActiveTab("Billing")}
          />
        </Box>

        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: "#f8fafc",
              borderRadius: "16px",
              p: 2,
              border: "1px solid #f1f5f9",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              {/* <Avatar
                src={pharmacistAvatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              /> */}
              {/* <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {pharmacistName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  {pharmacistRole}
                </Typography>
              </Box> */}
            </Box>
            {/* <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setProfileOpen(true)}
                sx={{
                  flex: 1,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "6px",
                  borderColor: "#e2e8f0",
                  color: "#64748b",
                }}
              >
                Profile
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  flex: 1,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "6px",
                  borderColor: "#fee2e2",
                  color: "#ef4444",
                  "&:hover": { bgcolor: "#fef2f2", borderColor: "#fca5a5" },
                }}
              >
                Sign Out
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Box>

      {/* Main Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "rgba(248, 250, 252, 0.5)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
            bgcolor: "white",
            borderBottom: "1px solid #e2e8f0",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            zIndex: 1100,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.025em",
              }}
            >
              Pharmacist {activeTab}
            </Typography>
            <Typography
              sx={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}
            >
              Daily operational summary for{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                border: "2px solid rgba(19, 127, 236, 0.2)",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                },
              }}
            >
              {/* <Avatar
                src={pharmacistAvatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid white",
                }}
              /> */}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
              sx={{ mt: 1 }}
              PaperProps={{
                sx: {
                  minWidth: 200,
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  setProfileOpen(true);
                }}
                sx={{ gap: 1.5, fontSize: "0.875rem", py: 1.2 }}
              >
                <BadgeIcon fontSize="small" sx={{ color: "#64748b" }} />
                Manage Profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{
                  gap: 1.5,
                  color: "#dc2626",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1.2,
                }}
              >
                <LogoutIcon fontSize="small" />
                Sign Out
              </MenuItem>
            </Menu>

            {(activeTab === "Drugs Inventory" || activeTab === "Billing") && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  if (activeTab === "Drugs Inventory") {
                    resetDrugForm();
                    setAddDrugModalOpen(true);
                  } else {
                    setAddInvoiceModalOpen(true);
                  }
                }}
                sx={{
                  bgcolor: "#137fec",
                  color: "white",
                  fontWeight: 700,
                  borderRadius: "12px",
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  boxShadow: "0 10px 15px -3px rgba(19, 127, 236, 0.2)",
                  "&:hover": { bgcolor: "rgba(19, 127, 236, 0.9)" },
                }}
              >
                {activeTab === "Drugs Inventory" ? "Add Drugs" : "New Invoice"}
              </Button>
            )}
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            px: 4,
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            overflow: "visible",
          }}
        >
          {activeTab === "Overview" && (
            <>
              <Grid container spacing={2}>
                {/* Monthly Revenue Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "20px",
                      p: 2.5,
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          mb: 0.5,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Monthly Revenue
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "#0f172a",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={`₹${stats.totalMonthlyRevenue?.toLocaleString()}`}
                      >
                        ₹{(() => {
                          const val = stats.totalMonthlyRevenue || 0;
                          if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr";
                          if (val >= 100000) return (val / 100000).toFixed(1) + "L";
                          if (val >= 1000) return (val / 1000).toFixed(1) + "k";
                          return val.toLocaleString();
                        })()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "#eff6ff",
                        p: 1.25,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <AccountBalanceWalletIcon sx={{ fontSize: 24, color: "#2563eb" }} />
                    </Box>
                  </Box>
                </Grid>

                {/* Total Medicines Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "20px",
                      p: 2.5,
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          mb: 0.5,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Total Medicines
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "#0f172a",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {stats.totalMedicines}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "#f0fdf4",
                        p: 1.25,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MedicationIcon sx={{ fontSize: 24, color: "#16a34a" }} />
                    </Box>
                  </Box>
                </Grid>

                {/* Low Stock Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "20px",
                      p: 2.5,
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          mb: 0.5,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Low Stock
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "#dc2626",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {stats.outOfStock}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "#fef2f2",
                        p: 1.25,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ErrorOutlineIcon sx={{ fontSize: 24, color: "#dc2626" }} />
                    </Box>
                  </Box>
                </Grid>

                {/* Total Invoices Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "20px",
                      p: 2.5,
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          mb: 0.5,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Total Invoices
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "#0f172a",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {stats.completedInvoices}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "#faf5ff",
                        p: 1.25,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <AssignmentIcon sx={{ fontSize: 24, color: "#9333ea" }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <Box>
                  {/* Recent Transactions Table */}
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "24px",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <Box
                      sx={{
                        px: 3,
                        py: 2.5,
                        borderBottom: "1px solid #f1f5f9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                        Recent Transactions
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{
                          color: "#94a3b8",
                          "&:hover": { bgcolor: "#f8fafc" },
                          borderRadius: "8px",
                        }}
                      >
                        <FilterListIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <TableContainer>
                      <Table sx={{ minWidth: 600 }}>
                        <TableHead sx={{ bgcolor: "rgba(248, 250, 252, 0.5)" }}>
                          <TableRow>
                            {[
                              "Patient Name",
                              "Doctor Name",
                              "Concern",
                              "Prescription",
                            ].map((h, i) => (
                              <TableCell
                                key={i}
                                sx={{
                                  color: "#94a3b8",
                                  fontSize: "0.625rem",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  py: 1.5,
                                  borderBottom: "1px solid #f1f5f9",
                                }}
                              >
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {prescriptions.map((row) => (
                            <TableRow
                              key={row._id}
                              hover
                              sx={{
                                "&:hover": {
                                  bgcolor: "rgba(248, 250, 252, 0.5)",
                                },
                                transition: "background-color 0.2s",
                              }}
                            >
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  color: "#334155",
                                  borderBottom: "1px solid #f8fafc",
                                }}
                              >
                                {row.patientId?.firstName}{" "}
                                {row.patientId?.lastName}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#334155",
                                  borderBottom: "1px solid #f8fafc",
                                }}
                              >
                                Dr. {row.doctorId?.firstName}{" "}
                                {row.doctorId?.lastName}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#64748b",
                                  fontSize: "0.875rem",
                                  borderBottom: "1px solid #f8fafc",
                                }}
                              >
                                {row.concern}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 600,
                                  color: "#137fec",
                                  borderBottom: "1px solid #f8fafc",
                                  maxWidth: "250px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                  "&:hover": { textDecoration: "underline" },
                                }}
                                onClick={() => handleOpenPrescription(row)}
                              >
                                {row.prescription}
                              </TableCell>
                            </TableRow>
                          ))}
                          {!loading && prescriptions.length === 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                align="center"
                                sx={{ py: 4, color: "#94a3b8" }}
                              >
                                No prescriptions found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={prescriptionTotal}
                      rowsPerPage={prescriptionRowsPerPage}
                      page={prescriptionPage}
                      onPageChange={(e, newPage) =>
                        setPrescriptionPage(newPage)
                      }
                      onRowsPerPageChange={(e) => {
                        setPrescriptionRowsPerPage(
                          parseInt(e.target.value, 10),
                        );
                        setPrescriptionPage(0);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </>
          )}

          {activeTab === "Drugs Inventory" && (
            <Box>
              {/* Drug Inventory Table */}
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2.5,
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Drug Inventory
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#94a3b8",
                      "&:hover": { bgcolor: "#f8fafc" },
                      borderRadius: "8px",
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: "rgba(248, 250, 252, 0.5)" }}>
                      <TableRow>
                        {[
                          "Product Name",
                          "Manufacturer",
                          "Category",
                          "Stock",
                          "Price",
                          "Expiry Date",
                          "Actions",
                        ].map((h, i) => (
                          <TableCell
                            key={i}
                            sx={{
                              color: "#94a3b8",
                              fontSize: "0.625rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              py: 1.5,
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {drugs.map((row) => (
                        <TableRow
                          key={row._id}
                          hover
                          sx={{
                            "&:hover": { bgcolor: "rgba(248, 250, 252, 0.5)" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color: "#334155",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {row.name}
                              </Typography>
                              <Typography
                                sx={{ color: "#64748b", fontSize: "0.75rem" }}
                              >
                                {row.content}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#475569",
                              fontSize: "0.875rem",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {row.manufacturerCompany}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <Chip
                              label={row.category}
                              sx={{
                                bgcolor: "#eff6ff",
                                color: "#137fec",
                                fontWeight: 600,
                                fontSize: "0.625rem",
                                borderRadius: "6px",
                                height: 24,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 700,
                              color:
                                row.stock > 100
                                  ? "#059669"
                                  : row.stock > 10
                                    ? "#d97706"
                                    : "#dc2626",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {row.stock}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 700,
                              color: "#1e293b",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            ₹{row.price}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#64748b",
                              fontSize: "0.75rem",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {new Date(row.expiryDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditDrugClick(row)}
                              sx={{
                                color: "#137fec",
                                "&:hover": { bgcolor: "#eff6ff" },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteDrug(row)}
                              sx={{
                                color: "#dc2626",
                                "&:hover": { bgcolor: "#fef2f2" },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {!loading && drugs.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            align="center"
                            sx={{ py: 4, color: "#94a3b8" }}
                          >
                            No drugs found in inventory.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={drugTotal}
                  rowsPerPage={drugRowsPerPage}
                  page={drugPage}
                  onPageChange={(e, newPage) => setDrugPage(newPage)}
                  onRowsPerPageChange={(e) => {
                    setDrugRowsPerPage(parseInt(e.target.value, 10));
                    setDrugPage(0);
                  }}
                />
              </Box>
            </Box>
          )}

          {activeTab === "Billing" && (
            <Box>
              {/* Billing History Table */}
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2.5,
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                    Invoice History
                  </Typography>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: "rgba(248, 250, 252, 0.5)" }}>
                      <TableRow>
                        {[
                          "Invoice #",
                          "Patient Name",
                          "Date",
                          "Items",
                          "Total Amount",
                          "Status",
                          "Actions",
                        ].map((h, i) => (
                          <TableCell
                            key={i}
                            sx={{
                              color: "#94a3b8",
                              fontSize: "0.625rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              py: 1.5,
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoices.map((row) => (
                        <TableRow
                          key={row._id}
                          hover
                          sx={{
                            "&:hover": { bgcolor: "rgba(248, 250, 252, 0.5)" },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: "#0f172a",
                                fontSize: "0.8125rem",
                              }}
                            >
                              {row.invoiceNumber}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#475569",
                              fontSize: "0.875rem",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {row.patientName}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#64748b",
                              fontSize: "0.75rem",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {new Date(row.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "#64748b",
                              fontSize: "0.75rem",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            {row.items.length} items
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 700,
                              color: "#1e293b",
                              borderBottom: "1px solid #f8fafc",
                            }}
                          >
                            ₹{row.totalAmount}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <Chip
                              label={row.status}
                              sx={{
                                bgcolor: "#f0fdf4",
                                color: "#16a34a",
                                fontWeight: 600,
                                fontSize: "0.625rem",
                                borderRadius: "6px",
                                height: 24,
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ borderBottom: "1px solid #f8fafc" }}>
                            <IconButton
                              size="small"
                              onClick={() => {
                                setViewingInvoice(row);
                                setViewInvoiceModalOpen(true);
                              }}
                              sx={{
                                color: "#137fec",
                                "&:hover": {
                                  bgcolor: "rgba(19, 127, 236, 0.1)",
                                },
                              }}
                              title="Preview & Print"
                            >
                              <ReceiptIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      {invoices.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            align="center"
                            sx={{ py: 4, color: "#94a3b8" }}
                          >
                            No invoices generated yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={invoiceTotal}
                  rowsPerPage={invoiceRowsPerPage}
                  page={invoicePage}
                  onPageChange={(e, newPage) => setInvoicePage(newPage)}
                  onRowsPerPageChange={(e) => {
                    setInvoiceRowsPerPage(parseInt(e.target.value, 10));
                    setInvoicePage(0);
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Profile Drawer ── */}
      <Drawer
        anchor="right"
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 380 },
            borderRadius: "16px 0 0 16px",
          },
        }}
      >
        {authUser && (
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #137fec 0%, #0f6bd1 100%)",
                p: 3,
                pb: 4,
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => setProfileOpen(false)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "white",
                }}
              >
                <CloseIcon />
              </IconButton>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                SESSION PROFILE
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  src={pharmacistAvatar}
                  sx={{
                    width: 72,
                    height: 72,
                    border: "3px solid rgba(255,255,255,0.4)",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                    }}
                  >
                    {authUser.name}
                  </Typography>
                  <Chip
                    label={authUser.role}
                    size="small"
                    sx={{
                      mt: 1,
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {[
                {
                  icon: <BadgeIcon />,
                  label: "Full Name",
                  value: authUser.name,
                },

                { icon: <EmailIcon />, label: "Email", value: authUser.email },
                { icon: <WorkIcon />, label: "Role", value: authUser.role },
                {
                  icon: <AccessTimeIcon />,
                  label: "Login Time",
                  value: formatLoginTime(authUser.loginTime),
                },
              ].map(({ icon, label, value }) => (
                <Box
                  key={label}
                  sx={{
                    p: 2,
                    bgcolor: "#f8fafc",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    {React.cloneElement(icon, {
                      sx: { fontSize: "1rem", color: "#64748b" },
                    })}
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        color: "#94a3b8",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#1e293b",
                      pl: 3,
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ p: 3, borderTop: "1px solid #e2e8f0" }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ color: "#dc2626", borderColor: "#fca5a5" }}
              >
                Sign Out
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
      {/* Add Drug Modal */}
      <Dialog
        open={addDrugModalOpen}
        onClose={() => {
          setAddDrugModalOpen(false);
          resetDrugForm();
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: handleAddDrugSubmit,
          sx: { borderRadius: "20px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
          {isEditMode ? "Edit Drug Details" : "Add New Drug to Inventory"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              mt: 2,
            }}
          >
            <TextField
              fullWidth
              label="Drug Name"
              name="name"
              value={drugData.name}
              onChange={handleAddDrugChange}
              placeholder="e.g. Amoxicillin 500mg"
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={drugData.content}
              onChange={handleAddDrugChange}
              placeholder="e.g. 500mg"
            />
            <TextField
              fullWidth
              label="Manufacturer Company"
              name="manufacturerCompany"
              value={drugData.manufacturerCompany}
              onChange={handleAddDrugChange}
              placeholder="e.g. Square Pharmaceuticals Ltd"
            />

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={drugData.category}
                label="Category"
                onChange={handleAddDrugChange}
              >
                <MenuItem value="Antibiotic">Antibiotic</MenuItem>
                <MenuItem value="Analgesic">Analgesic</MenuItem>
                <MenuItem value="Antipyretic">Antipyretic</MenuItem>
                <MenuItem value="Antiseptic">Antiseptic</MenuItem>
                <MenuItem value="Supplement">Supplement</MenuItem>
                <MenuItem value="Antacid">Antacid</MenuItem>
                <MenuItem value="Antihistamine">Antihistamine</MenuItem>
                <MenuItem value="Antiviral">Antiviral</MenuItem>
                <MenuItem value="Antifungal">Antifungal</MenuItem>
                <MenuItem value="Vaccine">Vaccine</MenuItem>
                <MenuItem value="Hormone">Hormone</MenuItem>
                <MenuItem value="Vitamin">Vitamin</MenuItem>
                <MenuItem value="Cardiovascular">Cardiovascular</MenuItem>
                <MenuItem value="Gastrointestinal">Gastrointestinal</MenuItem>
                <MenuItem value="Respiratory">Respiratory</MenuItem>
                <MenuItem value="Neurological">Neurological</MenuItem>
                <MenuItem value="Dermatological">Dermatological</MenuItem>
                <MenuItem value="Cholesterol">Cholesterol</MenuItem>
                <MenuItem value="Diabetes">Diabetes</MenuItem>
                <MenuItem value="Blood Pressure">Blood Pressure</MenuItem>
                <MenuItem value="Pain Relief">Pain Relief</MenuItem>
                <MenuItem value="Allergy">Allergy</MenuItem>
                <MenuItem value="Eye Care">Eye Care</MenuItem>
                <MenuItem value="Ear Care">Ear Care</MenuItem>
                <MenuItem value="Oral Care">Oral Care</MenuItem>
                <MenuItem value="Skin Care">Skin Care</MenuItem>
                <MenuItem value="Vitamins">Vitamins</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock"
                type="text"
                placeholder="e.g. 100"
                value={drugData.stock}
                onChange={handleAddDrugChange}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Price per Unit"
                name="price"
                type="text"
                placeholder="e.g. 10"
                value={drugData.price}
                onChange={handleAddDrugChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                onKeyPress={(e) => {
                  if (!/[0-9.]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={drugData.expiryDate}
                onChange={(e)=>handleAddDrugChange(e)}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => {
              setAddDrugModalOpen(false);
              resetDrugForm();
            }}
            
            sx={{
              color: "#64748b",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#137fec",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              px: 4,
            }}
          >
            {isEditMode ? "Update Drug" : "Save Drug"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Prescription Detail Modal */}
      <Dialog
        open={prescriptionModalOpen}
        onClose={handleClosePrescription}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "24px", p: 1 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 900,
            fontSize: "1.5rem",
            color: "#0f172a",
            pb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Prescription Details
          <IconButton
            onClick={handleClosePrescription}
            sx={{ color: "#94a3b8" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedPrescription && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  p: 2.5,
                  bgcolor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Patient Name
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                    {selectedPrescription.patientId?.firstName}{" "}
                    {selectedPrescription.patientId?.lastName}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Date
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                    {new Date(
                      selectedPrescription.updatedAt,
                    ).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Doctor Name
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                    Dr. {selectedPrescription.doctorId?.firstName}{" "}
                    {selectedPrescription.doctorId?.lastName}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#64748b",
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    Condition/Concern
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                    {selectedPrescription.concern}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <MedicationIcon sx={{ color: "#137fec" }} />
                  Full Prescription
                </Typography>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "rgba(19, 127, 236, 0.03)",
                    borderRadius: "16px",
                    border: "1px dashed #137fec",
                    minHeight: "100px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#334155",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                      fontWeight: 500,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {selectedPrescription.prescription}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="contained"
            onClick={handleClosePrescription}
            sx={{
              bgcolor: "#137fec",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
            }}
          >
            Close Details
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Invoice Modal */}
      <Dialog
        open={addInvoiceModalOpen}
        onClose={() => setAddInvoiceModalOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          component: "form",
          onSubmit: handleGenerateInvoice,
          sx: { borderRadius: "24px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
          Generate New Invoice
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#475569",
                  mb: 1,
                }}
              >
                1. Patient Information
              </Typography>
              <TextField
                fullWidth
                label="Patient Name"
                placeholder="Enter patient name"
                required
                autoComplete="off"
                value={newInvoiceData.patientName}
                onChange={(e) =>
                  setNewInvoiceData({
                    ...newInvoiceData,
                    patientName: e.target.value,
                  })
                }
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Mobile Number"
                placeholder="e.g. 9876543210"
                required
                autoComplete="off"
                inputProps={{ maxLength: 10 }}
                value={newInvoiceData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNewInvoiceData({
                    ...newInvoiceData,
                    mobileNumber: value,
                  });
                }}
              />
              <TextField
                fullWidth
                label="Email ID (Optional)"
                placeholder="e.g. patient@example.com"
                autoComplete="off"
                value={newInvoiceData.emailId}
                onChange={(e) =>
                  setNewInvoiceData({
                    ...newInvoiceData,
                    emailId: e.target.value,
                  })
                }
              />
            </Box>

            <Divider />

            <Box>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#475569",
                  mb: 1,
                }}
              >
                2. Add Drugs to Invoice
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Autocomplete
                  sx={{ flex: 2 }}
                  options={drugs.filter((d) => d.stock > 0)}
                  getOptionLabel={(option) =>
                    `${option.name} (Stock: ${option.stock}, Price: ₹${option.price})`
                  }
                  value={selectedDrugForInvoice}
                  onChange={(event, newValue) =>
                    setSelectedDrugForInvoice(newValue)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Drug" />
                  )}
                />
                <TextField
                  sx={{ flex: 0.5 }}
                  label="Qty"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={quantityForInvoice}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val < 1) {
                      setQuantityForInvoice(1);
                    } else {
                      setQuantityForInvoice(e.target.value);
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleAddDrugToInvoice}
                  sx={{
                    height: "56px",
                    px: 3,
                    borderRadius: "12px",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>

            {newInvoiceData.items.length > 0 && (
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#475569",
                    mb: 1,
                  }}
                >
                  3. Invoice Summary
                </Typography>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ borderRadius: "16px", overflow: "hidden" }}
                >
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#f8fafc" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Item</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Price
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Qty
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          Total
                        </TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newInvoiceData.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align="right">₹{item.price}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">₹{item.total}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setNewInvoiceData({
                                  ...newInvoiceData,
                                  items: newInvoiceData.items.filter(
                                    (_, i) => i !== index,
                                  ),
                                });
                              }}
                              sx={{ color: "#ef4444" }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ bgcolor: "#f8fafc" }}>
                        <TableCell
                          colSpan={3}
                          align="right"
                          sx={{ fontWeight: 900 }}
                        >
                          Grand Total:
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: 900,
                            color: "#137fec",
                            fontSize: "1.1rem",
                          }}
                        >
                          ₹{calculateInvoiceTotal()}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setAddInvoiceModalOpen(false)}
            sx={{ color: "#64748b", fontWeight: 700, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={
              isGeneratingInvoice ||
              newInvoiceData.items.length === 0 ||
              !newInvoiceData.patientName
            }
            sx={{
              bgcolor: "#137fec",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              minWidth: "160px", // Maintain width when loading
            }}
          >
            {isGeneratingInvoice ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Generate Invoice"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invoice Summary Modal */}
      <Dialog
        open={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 0,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogContent sx={{ p: 0, bgcolor: "white" }}>
          {generatedInvoice && (
            <Box>
              {/* -- HEADER SECTION (Compact Blue) -- */}
              <Box
                sx={{
                  bgcolor: "#137fec",
                  px: 4,
                  py: 3,
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 0.5,
                      }}
                    >
                      <DesktopWindowsIcon sx={{ fontSize: 40 }} />
                      <ReceiptIcon
                        sx={{
                          position: "absolute",
                          fontSize: 14,
                          top: "22%",
                          color: "white",
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}
                    >
                      Invoice
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{ fontSize: "1.25rem", fontWeight: 900, mb: 0.5 }}
                  >
                    City General Hospital
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", opacity: 0.9 }}>
                    Ahmedabad, Gujarat, India
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", opacity: 0.9 }}>
                    Postal Code: 380001
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* -- MIDDLE SECTION (Compact) -- */}
                <Grid
                  container
                  spacing={2}
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        color: "#000",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      BILL TO:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#000",
                        mb: 0.5,
                      }}
                    >
                      {generatedInvoice.patientName}
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#475569" }}>
                      Contact: {generatedInvoice.mobileNumber}
                    </Typography>
                    {generatedInvoice.emailId && (
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#475569" }}
                      >
                        Email: {generatedInvoice.emailId}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        alignItems: "flex-end",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 900,
                            color: "#000",
                          }}
                        >
                          INVOICE #
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: "#000" }}>
                          {generatedInvoice.invoiceNumber}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "0.65rem",
                            fontWeight: 900,
                            color: "#000",
                          }}
                        >
                          DATE
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: "#000" }}>
                          {new Date(
                            generatedInvoice.createdAt || Date.now(),
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* -- ITEMS TABLE (Compact) -- */}
                <TableContainer component={Box} sx={{ mb: 3 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: 900, fontSize: "0.65rem", py: 0.5 }}
                        >
                          ITEMS
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: 900, fontSize: "0.65rem", py: 0.5 }}
                        >
                          DESCRIPTION
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: 900, fontSize: "0.65rem", py: 0.5 }}
                        >
                          QUANTITY
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontWeight: 900, fontSize: "0.65rem", py: 0.5 }}
                        >
                          PRICE
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 900, fontSize: "0.65rem", py: 0.5 }}
                        >
                          AMOUNT
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {generatedInvoice.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ fontSize: "0.75rem", border: "none" }}
                          >
                            Item {index + 1}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: "0.75rem", border: "none" }}
                          >
                            {item.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: "0.75rem", border: "none" }}
                          >
                            {item.quantity}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: "0.75rem", border: "none" }}
                          >
                            ₹{item.price.toLocaleString()}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              border: "none",
                            }}
                          >
                            ₹{item.total.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* -- SUMMARY CALCULATION (Clean Breakdown) -- */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 0.5,
                    px: 1,
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      gap: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 500,
                      }}
                    >
                      Sub-total:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#0f172a",
                        fontWeight: 700,
                        width: 80,
                        textAlign: "right",
                      }}
                    >
                      ₹{(generatedInvoice.totalAmount / 1.05).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      gap: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 500,
                      }}
                    >
                      Tax (5%):
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#0f172a",
                        fontWeight: 700,
                        width: 80,
                        textAlign: "right",
                      }}
                    >
                      ₹
                      {(
                        generatedInvoice.totalAmount -
                        generatedInvoice.totalAmount / 1.05
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                {/* -- FOOTER BOXES (Compact) -- */}
                <Box
                  sx={{
                    display: "flex",
                    height: "64px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1.5,
                      bgcolor: "#cfe6fd",
                      p: 1.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "0.65rem", fontWeight: 900, mb: 0.2 }}
                    >
                      NOTES:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.625rem",
                        lineHeight: 1.1,
                        color: "#1e293b",
                      }}
                    >
                      Medicine once sold cannot be returned. Please keep this
                      invoice for your records. This invoice was generated with
                      MedCore.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: "#137fec",
                      p: 1.5,
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        mb: 0.2,
                        opacity: 0.9,
                        letterSpacing: "0.05em",
                      }}
                    >
                      TOTAL DUE
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.75rem",
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      ₹{generatedInvoice.totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0, gap: 2 }}>
          <Button
            onClick={() => setSummaryModalOpen(false)}
            sx={{
              color: "#64748b",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "0.95rem",
              px: 3,
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => generateInvoicePDF(generatedInvoice)}
            sx={{
              bgcolor: "#137fec",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
              px: 4,
              fontSize: "1rem",
              boxShadow: "0 10px 15px -3px rgba(19, 127, 236, 0.2)",
              "&:hover": {
                bgcolor: "#0f6bd1",
                boxShadow: "0 20px 25px -5px rgba(19, 127, 236, 0.3)",
              },
            }}
          >
            Print Invoice
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialogOpen}
        onClose={() => setDeleteConfirmDialogOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();
            confirmDeleteDrug();
          },
          sx: { borderRadius: "24px", p: 1, maxWidth: "400px" },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
          <Box
            sx={{
              bgcolor: "#fef2f2",
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              mb: 2,
            }}
          >
            <ErrorOutlineIcon sx={{ color: "#dc2626", fontSize: 35 }} />
          </Box>
          <Typography
            sx={{ fontWeight: 900, fontSize: "1.25rem", color: "#0f172a" }}
          >
            Confirm Deletion
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 1 }}>
          <Typography sx={{ color: "#64748b", mb: 2 }}>
            Are you sure you want to delete{" "}
            <Box
              component="span"
              sx={{ fontWeight: 800, color: "#0f172a", fontSize: "1.1rem" }}
            >
              {selectedDrugForDeletion?.name}
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1, justifyContent: "center" }}>
          <Button
            onClick={() => setDeleteConfirmDialogOpen(false)}
            sx={{
              color: "#64748b",
              fontWeight: 700,
              textTransform: "none",
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#dc2626",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              "&:hover": { bgcolor: "#b91c1c" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Invoice Preview Modal */}
      <Dialog
        open={viewInvoiceModalOpen}
        onClose={() => setViewInvoiceModalOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: "24px", p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.5rem" }}>
          Invoice Details
        </DialogTitle>
        <DialogContent>
          {viewingInvoice && (
            <Box
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
              }}
            >
              {/* -- HOSPITAL HEADER (Premium Branding) -- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 4,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      color: "#137fec",
                      letterSpacing: "-0.02em",
                      mb: 0.5,
                    }}
                  >
                    CITY GENERAL HOSPITAL
                  </Typography>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    123 HEALTHCARE AVE, SUITE 500
                  </Typography>
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    PHONE: +91 1234567890 | EMAIL: SUPPORT@CITYGENERAL.IN
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#0f172a",
                      fontSize: "1.25rem",
                      mb: 0.5,
                    }}
                  >
                    INVOICE
                  </Typography>
                  <Typography
                    sx={{
                      color: "#137fec",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    #{viewingInvoice.invoiceNumber}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4, borderColor: "#f1f5f9" }} />

              {/* -- PATIENT & INVOICE META -- */}
              <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      mb: 1,
                      letterSpacing: "0.05em",
                    }}
                  >
                    BILL TO
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem" }}
                  >
                    {viewingInvoice.patientName}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                    Ph: {viewingInvoice.mobileNumber}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                    Email: {viewingInvoice.emailId || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      mb: 1,
                      letterSpacing: "0.05em",
                    }}
                  >
                    INVOICE DATE
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, color: "#1e293b", fontSize: "1rem" }}
                  >
                    {new Date(viewingInvoice.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>

              {/* -- ITEMS TABLE (Compact & Clean) -- */}
              <TableContainer
                sx={{
                  mb: 4,
                  borderRadius: "12px",
                  border: "1px solid #f1f5f9",
                }}
              >
                <Table size="small">
                  <TableHead sx={{ bgcolor: "#f8fafc" }}>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: "0.65rem", fontWeight: 900, py: 1.5 }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "0.65rem", fontWeight: 900, py: 1.5 }}
                      >
                        ITEM DESCRIPTION
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "0.65rem", fontWeight: 900, py: 1.5 }}
                      >
                        QTY
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "0.65rem", fontWeight: 900, py: 1.5 }}
                      >
                        PRICE
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: "0.65rem", fontWeight: 900, py: 1.5 }}
                      >
                        SUBTOTAL
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {viewingInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "0.75rem", border: "none" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.75rem", border: "none" }}>
                          {item.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "0.75rem", border: "none" }}
                        >
                          {item.quantity}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: "0.75rem", border: "none" }}
                        >
                          ₹{item.price.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            border: "none",
                          }}
                        >
                          ₹{item.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* -- SUMMARY CALCULATION (Clean Breakdown) -- */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 0.5,
                  px: 1,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 500,
                    }}
                  >
                    Sub-total:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#0f172a",
                      fontWeight: 700,
                      width: 80,
                      textAlign: "right",
                    }}
                  >
                    ₹{(viewingInvoice.totalAmount / 1.05).toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                      fontWeight: 500,
                    }}
                  >
                    Tax (5%):
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#0f172a",
                      fontWeight: 700,
                      width: 80,
                      textAlign: "right",
                    }}
                  >
                    ₹
                    {(
                      viewingInvoice.totalAmount -
                      viewingInvoice.totalAmount / 1.05
                    ).toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              {/* -- FOOTER BOXES (Compact) -- */}
              <Box
                sx={{
                  display: "flex",
                  height: "64px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    flex: 1.5,
                    bgcolor: "#cfe6fd",
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "0.65rem", fontWeight: 900, mb: 0.2 }}
                  >
                    NOTES:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.625rem",
                      lineHeight: 1.1,
                      color: "#1e293b",
                    }}
                  >
                    Medicine once sold cannot be returned. Please keep this
                    invoice for your records. This invoice was generated with
                    MedCore.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: "#137fec",
                    p: 1.5,
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 900,
                      mb: 0.2,
                      opacity: 0.9,
                      letterSpacing: "0.05em",
                    }}
                  >
                    TOTAL DUE
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    ₹{viewingInvoice.totalAmount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0, gap: 2 }}>
          <Button
            onClick={() => setViewInvoiceModalOpen(false)}
            sx={{
              color: "#64748b",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "0.95rem",
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => generateInvoicePDF(viewingInvoice)}
            sx={{
              bgcolor: "#137fec",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
              px: 4,
              fontSize: "1rem",
              boxShadow: "0 10px 15px -3px rgba(19, 127, 236, 0.2)",
              "&:hover": {
                bgcolor: "#0f6bd1",
                boxShadow: "0 20px 25px -5px rgba(19, 127, 236, 0.3)",
              },
            }}
          >
            Print Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PharmacistsPage;
