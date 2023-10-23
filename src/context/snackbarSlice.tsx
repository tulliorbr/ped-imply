"use client";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, useContext, ReactNode, useState } from "react";

interface SnackbarFuncType {
  handleSnackbar: (message: string, severity: AlertColor | undefined) => void;
}

const SnackbarFunc = createContext<SnackbarFuncType | undefined>(undefined);

export const SnackbarFuncProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleSnackbar = (
    message: string,
    severity: AlertColor | undefined
  ) => {
    setSnackbarMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
    setSnackbarMessage("");
    setSeverity(undefined);
  };

  return (
    <SnackbarFunc.Provider value={{ handleSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarFunc.Provider>
  );
};

export const useSnackbarFunc = (): SnackbarFuncType => {
  const context = useContext(SnackbarFunc);
  if (!context) {
    throw new Error(
      "useSnackbarFunc deve ser usado dentro de um SnackbarFuncProvider"
    );
  }
  return context;
};
