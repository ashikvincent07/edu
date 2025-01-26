import React, { useState } from "react";
import { Box, Typography, Button, Paper, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

// Color Palette
const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

// Timetable data structure
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["I", "II", "III", "IV", "V", "VI"];

const Mtimetable = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [timetable, setTimetable] = useState(
    days.reduce((acc, day) => {
      acc[day] = periods.map(() => "");
      return acc;
    }, {})
  );

  const handleHomeNavigate = () => {
    navigate("/teacher");
  };

  const handleBackNavigate = () => {
    navigate("/teacher/timetable");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (day, periodIndex, value) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day].map((item, index) => (index === periodIndex ? value : item)),
    }));
  };

  const handleSave = () => {
    console.log("Saved timetable:", timetable);
    // Add your save logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }} // Full width and no horizontal scroll
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%", // Ensures full width without scrolling
          overflowX: "hidden", // Avoid horizontal scroll
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          position: "relative",
        }}
      >
        {/* Responsive Buttons and Logo */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "20px", // Back button to top left corner
            display: { xs: "none", md: "block" }, // Hide on small screens
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBackNavigate}
            sx={{
              color: "#5a3d31",
              borderColor: "#5a3d31",
              "&:hover": {
                backgroundColor: "#e7dccd",
                borderColor: buttonHoverColor,
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px", // Home button to top right corner
            display: { xs: "none", md: "block" }, // Hide on small screens
          }}
        >
          <Button
            variant="outlined"
            onClick={handleHomeNavigate}
            sx={{
              color: "#5a3d31",
              borderColor: "#5a3d31",
              "&:hover": {
                backgroundColor: "#e7dccd",
                borderColor: buttonHoverColor,
              },
            }}
          >
            Home
          </Button>
        </Box>

        {/* Dropdown Menu for Small Screens */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px",
            display: { xs: "block", md: "none" }, // Show only on small screens
          }}
        >
          <IconButton onClick={handleMenuClick} sx={{ color: "#5a3d31" }}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: primaryColor,
                color: "#5a3d31",
              },
            }}
          >
            <MenuItem onClick={handleBackNavigate}>Back</MenuItem>
            <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
          </Menu>
        </Box>

        {/* Heading and Logo Section */}
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#5a3d31",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Manage Timetable
          </Typography>
          <img
            src="/images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px", // Logo size is reduced
              objectFit: "contain",
              marginTop: "5px", // Space between the heading and logo
            }}
          />
        </Box>

        {/* Editable Timetable Section */}
        <Paper
          elevation={3}
          sx={{
            margin: "0px auto 0",
            maxWidth: "90%", // Ensure it's responsive for smaller screens
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: primaryColor,
          }}
        >
          {/* Horizontal scrolling with custom scrollbar */}
          <Box
            sx={{
              overflowX: "auto",
              padding: "10px",
              width: "100%",
              "&::-webkit-scrollbar": {
                height: "8px", // Scrollbar height
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7a5e51", // Scrollbar thumb color
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1", // Scrollbar track color
              },
            }}
          >
            <table
              style={{
                minWidth: "600px", // Minimum width to ensure horizontal scroll
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed", // Ensure columns fit well on all screen sizes
              }}
            >
              <thead>
                <tr style={{ backgroundColor: secondaryColor }}>
                  <th
                    style={{
                      padding: "10px",
                      border: "2px solid #5a3d31",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Period
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      style={{
                        padding: "10px",
                        border: "2px solid #5a3d31",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period, periodIndex) => (
                  <tr key={periodIndex}>
                    <td
                      style={{
                        padding: "10px",
                        border: "2px solid #5a3d31",
                        backgroundColor: secondaryColor,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {period}
                    </td>
                    {days.map((day) => (
                      <td
                        key={day}
                        style={{
                          padding: "10px",
                          border: "2px solid #5a3d31",
                          textAlign: "center",
                        }}
                      >
                        <TextField
                          variant="outlined"
                          size="small"
                          value={timetable[day][periodIndex]}
                          onChange={(e) =>
                            handleInputChange(day, periodIndex, e.target.value)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: secondaryColor,
                            },
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              marginTop: "20px",
              backgroundColor: "#5a3d31",
              color: "#fff",
              "&:hover": {
                backgroundColor: buttonHoverColor,
              },
            }}
          >
            Save Timetable
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Mtimetable;
