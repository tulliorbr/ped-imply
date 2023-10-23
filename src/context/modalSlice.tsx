"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { Alert, AlertColor, Modal } from "@mui/material";
import Button from "@/components/Button";

interface ModalContextType {
  handleModal: (message: string, severity?: AlertColor) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  const handleModal = (message: string, severity?: AlertColor) => {
    setModalMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setModalMessage("");
    setSeverity(undefined);
  };

  return (
    <ModalContext.Provider value={{ handleModal }}>
      {children}
      <Modal open={open} onClose={handleCloseModal}>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white flex w-36 p-10 rounded-md">
            <div style={{ padding: "10px", textAlign: "center" }}>
              <Alert severity={severity}>
                {modalMessage}
              </Alert>
              <Button
                label="Ok"
                onClick={handleCloseModal}
                className="mx-5 my-3"
              />
            </div>
          </div>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider");
  }
  return context;
};
