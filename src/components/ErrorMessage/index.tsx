import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="border-t-4 border-red-500 bg-red-100 text-red-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;
