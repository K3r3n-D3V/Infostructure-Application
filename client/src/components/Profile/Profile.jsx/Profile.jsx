import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core";
import "./Profile.css";

// Navigation structure
const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "My account",
    title: "My Account",
    icon: <PersonIcon />,
    path: "/Profile",
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/orders",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
        path: "/reports/sales",
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
        path: "/reports/traffic",
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
    path: "/integrations",
  },
];

// Modern Material UI theme
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

// User Profile Component
const UserProfile = () => {
  const [username, setUsername] = useState("JohnDoe"); // Default username
  const [email, setEmail] = useState("john@example.com"); // Default email

  const handleSaveChanges = (event) => {
    event.preventDefault();
    alert("Changes saved!");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deleted!");
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="profile">
      <Box
        className="profile-container"
        sx={{ p: 2, maxWidth: 550, mx: "auto", textAlign: "center" }}
      >
        <div className="profile-pic">
          <img src="../../Screens/profile.jpg" alt="" />
        </div>
        <Typography variant="h4">User Profile</Typography>
        <form onSubmit={handleSaveChanges}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
        <button onClick={handleDeleteAccount} className="profile">
          Delete Account
        </button>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: "blue", color: "white", width: "100%" }}
        >
          Log Out
        </button>
      </Box>
    </div>
  );
};

// Layout Component
function Profile() {
  return (
    <ThemeProvider theme={demoTheme}>
      <AppProvider navigation={NAVIGATION}>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route
              path="/orders"
              element={<Typography>Orders Page</Typography>}
            />
            <Route
              path="/reports/sales"
              element={<Typography>Sales Report</Typography>}
            />
            <Route
              path="/reports/traffic"
              element={<Typography>Traffic Report</Typography>}
            />
            <Route
              path="/integrations"
              element={<Typography>Integrations Page</Typography>}
            />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

export default Profile;
