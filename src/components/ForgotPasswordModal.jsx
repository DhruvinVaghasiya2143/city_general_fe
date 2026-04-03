import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ open, onClose, role }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    let processingToast;
    try {
      // Close modal immediately and show a processing toast
      onClose();
      processingToast = toast.info("Processing password reset...", { autoClose: false });

      const api = import.meta.env.VITE_API_BASE_BACKEND_URL;
      const response = await axios.post(`${api}/auth/reset-password`, {
        email,
        password: newPassword,
        role: role,
      });

      if (response.data.success) {
        toast.success("Password reset successfully! You can now sign in.");
      }
      
      // Reset fields
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      if (processingToast) toast.dismiss(processingToast);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        component: "form",
        onSubmit: handleReset,
        sx: { borderRadius: "20px", p: 1 },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 900 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
            }}
          >
            <LockResetIcon fontSize="medium" />
          </Box>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 900 }}>
            Reset Password
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            Enter your email and new password to reset it.
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              placeholder="name@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "#94a3b8", fontSize: "20px" }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
              New Password
            </Typography>
            <TextField
              fullWidth
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#94a3b8", fontSize: "20px" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
              }}
            />
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#334155" }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#94a3b8", fontSize: "20px" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{ fontWeight: 700, textTransform: "none", color: "#64748b" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            px: 4,
            minWidth: "140px",
            boxShadow: "0 4px 12px rgba(19, 127, 236, 0.2)",
          }}
        >
          
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Reset Password"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
