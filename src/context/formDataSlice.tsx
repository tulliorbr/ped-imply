"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

interface DataFormContextType {
  dataForm: IForm;
  setDataForm: React.Dispatch<React.SetStateAction<IForm>>;
}

interface IForm {
  number?: string | undefined;
  city?: string | undefined;
  district?: string | undefined;
  place?: string | undefined;
  cpf: string;
  cep: string;
  phone: string;
  name: string;
  email: string;
}

const DataFormContext = createContext<DataFormContextType | undefined>(
  undefined
);

export const DataFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataForm, setDataForm] = useState<IForm>({} as IForm);
  return (
    <DataFormContext.Provider value={{ setDataForm, dataForm }}>
      {children}
    </DataFormContext.Provider>
  );
};

export const useDataForm = (): DataFormContextType => {
  const context = useContext(DataFormContext);
  if (!context) {
    throw new Error("useDataForm deve ser usado dentro de um DataFormProvider");
  }
  return context;
};
