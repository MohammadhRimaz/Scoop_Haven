export default function Successbox({ children }) {
  return (
    <div className="text-center bg-green-100 p-4 rounded-lg border border-green-500">
      {children}
    </div>
  );
}
