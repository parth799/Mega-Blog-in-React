/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700" >
        {label}
      </label>}
      <input
        id={id}
        type={type}
        ref={ref}
        className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}` }
        {...props}
      />
    </div>
  );
});

export default Input;