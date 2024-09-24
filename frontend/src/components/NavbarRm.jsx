import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useState } from "react";
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
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
              <MenuItem key="signOut" onClick=''>
                Signout
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant="h6">Name</Typography>
        </div>
      </div>
    </AppBar>
  );
}
