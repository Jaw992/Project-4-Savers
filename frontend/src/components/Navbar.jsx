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
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Typography,
} from "@mui/material";

export default function Navbar() {

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

  const handleProfile = () => {
    navigate("/client-profile");
  }

  const handleLogout = () => {
    setToken(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <div className="client-navbar">
        <div className="icon-part">
          <Box >
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
              <MenuItem key="profile" onClick={handleProfile}>
                My Profile
              </MenuItem>
              <MenuItem key="signOut" onClick={handleLogout}>
                Signout
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{name}</Typography>
          </div>
          
          <Box className="client-pages">
            <ButtonGroup color="inherit" variant="text" aria-label="Basic button group">
              <Button href="/client-main">Home</Button>
              <Button href="/client-history">Transaction History</Button>
              <Button href="/client-transactions">Deposit / Withdrawal</Button>
              <Button href="/client-transfers">Transfer</Button>
            </ButtonGroup>
          </Box>
      </div>
    </AppBar>
  );
}
