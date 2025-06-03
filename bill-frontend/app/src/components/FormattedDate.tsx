// components/FormattedDate.tsx
import React from "react";
import { format, parseISO } from "date-fns";

interface FormattedDateProps {
  date: string | Date;
  formatStr?: string; // optional, allows flexibility
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, formatStr = "yyyy-MM-dd" }) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;

  return <span>{format(parsedDate, formatStr)}</span>;
};

export default FormattedDate;