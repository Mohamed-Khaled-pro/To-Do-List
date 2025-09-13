import React from "react";

export default function FilterButtons({ setFilter, setSubtask }) {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center p-3">
      <button className="btn btn-primary m-2 btn-sm" onClick={() => { setFilter("all"); setSubtask(false); }}>
        الكل
      </button>
      <button className="btn btn-warning text-light m-2 btn-sm" onClick={() => { setFilter("pending"); setSubtask(false); }}>
        قيد الأنتظار
      </button>
      <button className="btn btn-success m-2 btn-sm" onClick={() => { setFilter("completed"); setSubtask(false); }}>
        أكتملت
      </button>
    </div>
  );
}
