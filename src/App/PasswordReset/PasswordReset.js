import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components

export default function PasswordReset() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("PasswordReset");
  }
  // i18n
  const { t } = useTranslation();

  return <Box></Box>;
}
