
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavorite,
  removeFavorite
} from "../features/favoriteSlice";

function JobCard({ job, onDelete }) {

  const dispatch = useDispatch();

  // Get favorites from Redux
  const favorites = useSelector(
    state => state.favorites || []
  );

  // Check whether job is already favorite
  const isFavorite = favorites.some(
    item => String(item.id) === String(job.id)
  );

  // Add or remove favorite
  function handleFavorite() {

    if (isFavorite) {
      dispatch(removeFavorite(job.id));
    } else {
      dispatch(addFavorite(job));
    }

  }

  // Format salary
  const formattedSalary = Number(job.salary || 0)
    .toLocaleString("en-IN");

  return (

    <div className="card">

      {/* COMPANY LOGO */}

      <img
        src={
          job.companyLogo ||
          "https://placehold.co/100x100?text=Company"
        }
        alt={job.company || "Company"}
        className="company-logo"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/100x100?text=Company";
        }}
      />

      {/* JOB DETAILS */}

      <h3>{job.title}</h3>

      <p>
        <strong>Company:</strong> {job.company}
      </p>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <p>
        <strong>Job Type:</strong> {job.jobType}
      </p>

      <p>
        <strong>Experience:</strong> {job.experience}
      </p>

      <p className="job-salary">
        <strong>Salary:</strong> ₹{formattedSalary} / year
      </p>

      {/* CARD ACTIONS */}

      <div className="card-actions">

        <Link
          className="view-btn"
          to={`/jobs/${job.id}`}
        >
          View
        </Link>

        <Link
          className="edit-btn"
          to={`/edit-job/${job.id}`}
        >
          Edit
        </Link>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>

        <button
          type="button"
          className="favorite-btn"
          onClick={handleFavorite}
        >
          {isFavorite ? "♥ Saved" : "♡ Favorite"}
        </button>

      </div>

    </div>

  );

}

export default JobCard;
