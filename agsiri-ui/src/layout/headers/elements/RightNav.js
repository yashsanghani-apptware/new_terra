import React, { useState, Fragment } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Avatar,
  Button,
} from "@mui/material";
import { User as UserIcon } from "react-feather";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Language from "./rightNavComponents/Language";
import { useTranslation } from "react-i18next";

const RightNav = ({ landingPage }) => {
  const { t } = useTranslation("common");

  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    router.push("/agsiri");
    handleMenuClose();
  };
  const handleProfile = () => {
    router.push("/profile");
    handleMenuClose();
  };

  return (
    <ul
      className="header-right"
      style={{
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      <li className="right-menu">
        <ul className="nav-menu">
          <Language />
        </ul>
      </li>
      {landingPage ? (
        <li className="right-menu" style={{ marginLeft: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginRight: "8px" }}
            onClick={() => router.push("/auth/login")}
            >
            {t("LOGIN_SIGN_UP")}
          </Button>
        </li>
      ) : (
        <li className="right-menu">
          <Tooltip title="Profile Options">
            <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <UserIcon size={20} />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfile}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <UserIcon size={16} style={{ marginRight: "8px" }} />
                {t("PROFILE")}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LogoutIcon fontSize="small" sx={{ marginRight: "8px" }} />
                {t("LOGOUT")}
              </Typography>
            </MenuItem>
          </Menu>
        </li>
      )}
    </ul>
  );
};

export default RightNav;
