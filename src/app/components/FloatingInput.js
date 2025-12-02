"use client";
export default function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required
}) {
  return (
    <div className="relative w-full transition-all hover:border-pink-400 hover:shadow-sm"
>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          peer w-full border border-pink-300 rounded-lg px-3 py-3 
          bg-pink-50 text-gray-900
          placeholder-transparent
          focus:outline-none focus:ring-2 focus:ring-pink-500
        "
        placeholder={label}
      />

      <label
        className="
          absolute left-3 top-3 px-1 bg-pink-50 text-gray-600 
          transition-all duration-200 
          peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-gray-500 
          peer-focus:-top-2 peer-focus:text-xs 
          peer-focus:text-pink-700 
          peer-focus:bg-pink-50
          peer-placeholder-shown:text-sm
        "
      >
        {label}
      </label>
    </div>
  );
}
