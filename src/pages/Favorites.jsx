
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFavorite
} from "../features/favoriteSlice";

function Favorites() {

  const dispatch = useDispatch();

  // Get favorite jobs from Redux
  const favorites = useSelector(
    state => state.favorites || []
  );

  // Remove favorite job
  function handleRemove(id) {

    dispatch(removeFavorite(id));

  }

  return (

    <div className="favorites-container">

      <h1 className="page-title">
        My Favorite Jobs
      </h1>

      <p className="favorites-count">
        You have saved {favorites.length} favorite jobs.
      </p>

      {/* EMPTY FAVORITES */}

      {favorites.length === 0 ? (

        <div className="empty-favorites">

          <h2>No Favorite Jobs Yet</h2>

          <p>
            You haven't saved any jobs yet.
            Explore jobs and add your favorites.
          </p>

          <Link to="/jobs" className="browse-jobs-btn">
            Browse Jobs
          </Link>

        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map(job => {

            const logo = job.companyLogo;

            const salary = Number(job.salary || 0)
              .toLocaleString("en-IN");

            return (

              <div
                className="favorite-card"
                key={job.id}
              >

                {/* COMPANY LOGO */}

                <div className="company-logo">

                  <img
                    src={
                      logo ||
                      "https://placehold.co/100x100?text=Company"
                    }
                    alt={`${job.company || "Company"} logo`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/100x100?text=Company";
                    }}
                  />

                </div>

                {/* JOB DETAILS */}

                <div className="favorite-content">

                  <h2>{job.title}</h2>

                  <h3>{job.company}</h3>

                  <p>
                    📍 {job.location}
                  </p>

                  <p>
                    💼 {job.category}
                  </p>

                  <p>
                    ⏳ {job.jobType}
                  </p>

                  <p>
                    🎓 {job.experience}
                  </p>

                  <p className="favorite-salary">
                    💰 ₹{salary} / year
                  </p>

                  <p className="favorite-description">
                    {job.description}
                  </p>

                  {/* ACTION BUTTONS */}

                  <div className="favorite-actions">

                    <Link
                      to={`/jobs/${job.id}`}
                      className="view-favorite-btn"
                    >
                      View Job
                    </Link>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(job.id)}
                    >
                      Remove Favorite
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}

export default Favorites;
