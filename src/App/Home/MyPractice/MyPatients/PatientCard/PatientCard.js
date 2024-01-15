import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Typography,
  IconButton,
  List,
  ListItem
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
import CircularProgress from "@mui/material/CircularProgress";

// Services
//import { servicePatientDelete } from "../../services/game/game.services.js";
// Shared
//import ConfirmModal from "../modals/ConfirmModal.js";
import { random_id } from "../../../../services/toolkit.js";

export default function PatientCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("PatientCard " + props.patient.patientid);
  }
  // i18n
  const { t } = useTranslation();

  // Confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  function confirmCallback(choice) {
    switch (choice) {
      case "close":
        setConfirmOpen(false);
        break;
      case "delete":
        setConfirmOpen(false);
        setDeleting(true);
        serviceGameDelete(props.game.gameid).then(() => {
          setDeleting(false);
          serviceTableGetHistory();
        });
        break;
      default:
        console.error("PatientCard.confirmCallback unmatched " + choice);
    }
  }

  return (
    <Card 
      index={props.index}
      sx={{ 
        width: "100%", 
        p: 1 
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
            <Typography>
                {props.patient.key}
            </Typography>
        </Box>
      </Box>

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: "patient.confirm.delete.title",
            content: "patient.confirm.delete.content",
            callToActions: [
              {
                label: "generic.button.cancel",
                choice: "close",
              },
              {
                label: "generic.button.proceed",
                choice: "delete",
                variant: "contained",
                color: "error",
              },
            ],
          }}
          callback={confirmCallback}
        />
      )}
    </Card>
  );
}

/**
 

        <IconButton 
            id={props.patient.patientid}
            data-testid={"component-my patients-listitem-patient-button-delete patient"}
            index={props.index}
            onClick={() => setConfirmOpen(true)} disabled={deleting}
        >
            {deleting ? (
                <CircularProgress size={24} sx={{ color: "grey.500" }} />
            ) : (
                <RemoveCircleOutlineIcon />
            )}
            </IconButton>
 */