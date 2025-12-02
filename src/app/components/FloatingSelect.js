"use client";
export default function FloatingSelect({
  label,
  name,
  value,
  onChange,
  options,
  required
}) {
  return (
    <div className="relative w-full">
      <select
  name={name}
  value={value}
  onChange={onChange}
  required={required}
  className="
    peer w-full border border-pink-300 rounded-lg px-3 py-3 
    bg-pink-50 text-gray-900 appearance-none
    focus:outline-none focus:ring-2 focus:ring-pink-500
    overflow-hidden text-ellipsis whitespace-nowrap
  "
>

        <option value="" disabled>{label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
{/* pr-40 sm:pr-80 md:pr-85 */}
      <label
  className="
    absolute left-3 top-3 px-1  bg-pink-50 text-gray-600 pointer-events-none
    transition-all duration-200 
    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-pink-700
    peer-placeholder-shown:text-sm
    peer-placeholder-shown:top-3
  "
>
  {label}
</label>

    </div>
  );
}
