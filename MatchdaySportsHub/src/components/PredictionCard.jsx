function PredictionCard({ item, onEdit, onDelete }) {
  return (
    <div className="card glass-card text-white p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <span className="badge bg-secondary mb-1">{item.league}</span>
          <h5 className="fw-bold mb-1">{item.matchLabel}</h5>
          <p className="mb-1 text-info fw-semibold">
            Predicted Score: {item.homeGoals} - {item.awayGoals}
          </p>
          {item.comment && (
            <p className="small text-white-50 fst-italic mb-1">"{item.comment}"</p>
          )}
          <span className="small text-secondary">By {item.fanName}</span>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={() => onEdit(item)}
            title="Edit prediction"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(item.id)}
            title="Delete prediction"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;