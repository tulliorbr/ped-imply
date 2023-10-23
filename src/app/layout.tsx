import type { Metadata } from "next";
import "./globals.css";
import { SnackbarFuncProvider } from "@/context/snackbarSlice";
import { ModalProvider } from "@/context/modalSlice";
import { DataFormProvider } from "@/context/formDataSlice";

export const metadata: Metadata = {
  title: "Front-end - IMPLY",
  description:
    "Projeto criado para teste técnico para vaga de front-end na empresa Imply",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-Br">
      <body className="bg-backgroundColor overflow-x-hidden h-screen">
        <DataFormProvider>
          <ModalProvider>
            <SnackbarFuncProvider>{children}</SnackbarFuncProvider>
          </ModalProvider>
        </DataFormProvider>
      </body>
    </html>
  );
}
