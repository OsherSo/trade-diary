import React from "react";

const FormField = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  required = false,
  step = "1",
}) => (
  <div className="col-span-2 sm:col-span-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {type === "select" ? (
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      ></textarea>
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
        step={step}
      />
    )}
  </div>
);

export default FormField;
