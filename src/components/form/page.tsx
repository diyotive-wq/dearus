// form/context/FormProvider.tsx
'use client';

import { createContext, useContext, useState } from 'react';

type FormState = Record<string, any>;

interface FormContextType {
  values: FormState;
  setFieldValue: (key: string, value: any) => void;
  getValues: () => FormState;
}

const FormContext = createContext<FormContextType | null>(null);

export const useForm = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used inside a <FormProvider>');
  return ctx;
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = useState<FormState>({});

  const setFieldValue = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const getValues = () => values;

  return (
    <FormContext.Provider value={{ values, setFieldValue, getValues }}>
      {children}
    </FormContext.Provider>
  );
};
