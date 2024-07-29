const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {labelText || name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;
