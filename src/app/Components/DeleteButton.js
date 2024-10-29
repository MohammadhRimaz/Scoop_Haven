import { useState } from "react";

export default function DeleteButton({ label, icon, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/60 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="mb-4">Are sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              className="primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setShowConfirm(true)} type="button">
      {label && <span>{label}</span>}
      {icon && <span>{icon}</span>}
    </button>
  );
}
