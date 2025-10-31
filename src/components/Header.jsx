import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingDialog from "./SettingDialog";

export default function Header() {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceWalletIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jiggy Budget Tracker
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenSettings(true)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SettingDialog
        open={openSettings}
        handleClose={() => setOpenSettings(false)}
      />
    </>
  );
}
