export default function NumberInput({ label, value, onChange, placeholder = "Enter a number", min = 0, unit = "" }) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="number"
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
        />
        {unit && <span className="text-base-content/70">{unit}</span>}
      </label>
    </div>
  );
}
