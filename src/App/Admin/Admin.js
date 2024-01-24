
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import AppBar from "../Appbar/Appbar.js";
import AdminStats from "./AdminStats/AdminStats.js";

export default function Admin() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Admin')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    usertype: useSelector((state) => state.userSlice.type),
  };

  return (
    <Box>
      <AppBar route="admin" title={"ADMIN"} />
      <Box sx={{ height: 100 }} />
      {select.authLoaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? null : (
        <Box>
          {select.usertype !== "admin" ? null : (
            <Box>
              <AdminStats />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
