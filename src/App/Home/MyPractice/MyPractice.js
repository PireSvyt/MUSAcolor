import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import MyPatients from "./MyPatients/MyPatients.js";
//import MyNotes from "./MyNotes/MyNotes.js";

export default function MyPractice() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("MyPractice");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box>
      <MyPatients />
    </Box>
  );
}
