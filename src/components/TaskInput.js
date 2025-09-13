
export default function Taskinput({ taskText, setTaskText, handleClick, error,handleKeyPress }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-3">
      <input
        type="text"
        placeholder="العنوان الرئيسي"
        className="form-control mb-2"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {error && <div className="alert alert-danger mt-2">يجب عليك الكتابة للاضافه </div>}
      <button onClick={handleClick} className="btn btn-success w-100">
        إضافة
      </button>
    </div>
  );
}
