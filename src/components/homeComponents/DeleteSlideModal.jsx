export default function DeleteSlideModal({ onConfirm, onCancel }) {
  return (
    <dialog id="delete_slide_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Delete</h3>
        <p className="py-4">Are you sure you want to delete this slide? This action cannot be undone.</p>
        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => {
              onConfirm();
              document.getElementById('delete_slide_modal').close();
            }}
          >
            Delete
          </button>
          <form method="dialog">
            <button className="btn" onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onCancel}>close</button>
      </form>
    </dialog>
  );
}
