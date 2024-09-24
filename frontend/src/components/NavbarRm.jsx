import { useAtomValue, useSetAtom } from "jotai";
import { tokenAtom } from "../App";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { extractPayload, isValidToken } from "../utils/jwUtils";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { grey } from '@mui/material/colors';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Typography,
} from "@mui/material";

export default function NavbarRm() {

  const token = useAtomValue(tokenAtom);
  const setToken = useSetAtom(tokenAtom);
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isValidToken(token)) {
      const payload = extractPayload(token);
      setName(payload.name || "Please Log In");
    }
  }, [token]);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/rm-login');
  };

  return (
    <AppBar position="static">
      <div className="rm-navbar">
        <div className="icon-part">
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="logout">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon  className="profileIcon" sx={{ color: grey[50], fontSize: 35 }} />
              </IconButton>
            </Tooltip>
            
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="signOut" onClick={handleLogout}>
                Signout
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6">{name}</Typography>
        </div>
      </div>
    </AppBar>
  );
}
