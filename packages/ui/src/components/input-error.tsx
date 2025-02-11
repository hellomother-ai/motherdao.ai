export function InputError({ error }: { error?: string }) {
  return error ? (
    <p className="-mt-1 text-xs text-red-400">{error}</p>
  ) : (
    <div className="h-3 w-1" />
  );
}
