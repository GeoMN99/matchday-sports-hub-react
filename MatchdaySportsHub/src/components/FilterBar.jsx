function FilterBar({
    searchQuery,
    onSearchChange,
    selectedLeague,
    onLeagueChange,
    selectedStatus,
    onStatusChange,
    onResetFilters,
}) {
    return (
        <section className="card glass-card text-white shadow-sm p-4 mb-5 rounded-3">
            <div className="row g-3 align-items-end">
                {/* Team Search Input */}
                <div className="col-ms-4">
                    <label htmlFor="search-team" className="form-label fw-semibold text-info small">
                        Search Team
                    </label>
                    <div className="input-group">
                        <span className="input-group-text bg-dark border-secondary text-secondary">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                           type="text"
                           id="search-team"
                           className="form-control bg-dark text-white border-secondary"
                           placeholder="e.g Manchester united, Real Madrid..."
                           value={searchQuery}
                           onChange={(e) => onSearchChange(e.target.value)}
                        />   
                    </div>
                </div>

                {/* League Selector */}
                <div className="col-md-4">
                    <label htmlFor="select-league" className="form-label fw-semibold text-info small">
                        League
                    </label>
                    <select
                       id="select-league"
                       className="form-select bg-dark text-white border-secondary"
                       value={selectedLeague}
                       onChange={(e) => onLeagueChange(e.target.value)}
                    >
                       <option value="all">All Leagues</option>
                       <option value="4328">English Premier league</option>   
                       <option value="4335">Spanish La Liga</option>
                       <option value="4331">German Bundesliga</option>
                       <option value="4332">Italian Serie A</option>
                       <option value="4480">UEFA Champions League</option>
                    </select>   
                </div>

                {/* Match Status */}
                <div className="col-md-2">
                    <label htmlFor="swlwct-status" className="form-label fw-semibold text-info small">
                        Status
                    </label>
                    <select
                       id="select-status"
                       className="form-select bg-dark text-white border-secondary"
                       value={selectedStatus}
                       onChange={(e) => onStatusChange(e.target.value)}
                    >
                       <option value="all">All</option>
                       <option value="FT">Finished (FT)</option>
                       <option value="NS">Upcoming (NS)</option> 
                    </select>   
                </div>

                {/* Reset Btn */}
                <div className="col-md-2">
                    <button
                       type="button"
                       className="btn btn-outline-secondary w-100 text-light"
                       onClick={onResetFilters}
                    >
                        Reset
                    </button>   
                </div>
            </div>
        </section>
    );
}

export default FilterBar;