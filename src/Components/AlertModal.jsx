import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";

const AlertModal = ({ open, type, message, onClose, title }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Title section */}
        {title && (
          <Typography variant="h6" component="div">
            {type === "error" ? "Error" : "Alert"} - {title}
          </Typography>
        )}

        {/* Message section */}
        <Typography
          variant="body2"
          color={type === "error" ? "error" : "text.primary"}
        >
          {message}
        </Typography>

        {/* Close button */}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};
export default AlertModal;
