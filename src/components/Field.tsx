interface FieldProps {
  label: string;
  value: string;
}

export function Field({ label, value }: FieldProps) {
  if (!value) return null;
  return (
    <p className="mb-1">
      <strong className="text-[#9e4f60] uppercase">{label}:</strong>{" "}
      <span className="text-[#aaa] capitalize">{value}</span>
    </p>
  );
}
