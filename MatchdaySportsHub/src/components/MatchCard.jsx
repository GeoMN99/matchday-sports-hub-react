import { useNavigate } from 'react-router-dom';

function MatchCard({ match }) {
    const navigate = useNavigate();

    const {
        strHomeTeam,
        strAwayTeam,
        strHomeBadge,
        strAwayBadge,
        intHomeScore,
        intAwayScore,
        strLeague,
        strStatus,
        dateEvent,
        strVenue,
    } = match;

    const isFinished = strStatus === 'FT' || (intHomeScore !== null && intHomeScore !== '');

    const formattedDate = dateEvent
        ? new Date(dateEvent).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        })
        : 'Scheduled';

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 glass-card text-white shadow">
                <div className="card-body d-flex flex-column justify-content-between p-3">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-secondary border border-secondary text-light">
                            {strLeague}
                        </span>
                        <span
                           className={`badge fw-bold ${
                              isFinished ? 'bg-success text-white' : 'gb-warning text-dark'
                           }`}
                        >
                           {isFinished ? 'Finished' : 'Upcoming'} 
                        </span>   
                    </div>

                    {/* Teams & Scoreline */}
                    <div className="d-flex justify-content-around align-items-center text-center my-2">
                        <div className="flex-fill">
                            <img
                              src={strHomeBadge}
                              alt={strHomeTeam}
                              className="team-badge mb-2 d-block mx-auto"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.target.src= 'https://via.placeholder.com/48?text=FC';
                              }}
                            />
                            <span className="fw-bold fs-6 d-block">{strHomeTeam}</span>  
                        </div>

                        <div className="px-2">
                            <span className="badge bg-primary fs-6 px-3 py-2">
                                {isFinished ? `${intHomeScore} - ${intAwayScore}` : 'vs'}
                            </span>
                        </div>

                        <div className="flex-fill">
                            <img
                               src={strAwayBadge}
                               alt={strAwayTeam}
                               className="team-badge mb-2 d-block mx-auto"
                               referrerPolicy="no-referrer"
                               onError={(e) => {
                                  e.target.src= 'https://via.placeholder.com/48?text=FC';
                               }}
                            />
                            <span className="fw-bold fs-6 d-block">{strAwayTeam}</span>   
                        </div>
                    </div>

                    <div className="border-top border-secondary pt-2 mt-3 small text-white-50">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>
                                <i className="bi bi-calendar-event me-1"></i>
                                {formattedDate}
                            </span>
                        </div>

                        {!isFinished && (
                            <button
                               type="button"
                               className="btn btn-outline-info btn-sm w-100 mt-3 fw-semibold"
                               onClick={() => navigate('/predictions', { state: {fixture: match} })}
                            >
                                <i className="bi bi-pencil-square me-1"></i> Predict Score
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );    
}


export default MatchCard;