
import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../Components/JobCard";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [salaryRange, setSalaryRange] = useState("All");
  const [sort, setSort] = useState("");

  // FETCH JOBS
  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    try {
      const response = await api.get("/jobs");

      setJobs(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  // CONVERT SALARY INTO A NUMBER
  function getSalaryValue(value) {
    if (typeof value === "number") {
      return value;
    }

    if (!value) return 0;

    const salaryText = String(value)
      .toLowerCase()
      .replace(/₹|,/g, "")
      .trim();

    const number = parseFloat(salaryText);

    if (Number.isNaN(number)) return 0;

    // Convert LPA into annual rupees
    if (salaryText.includes("lpa")) {
      return number * 100000;
    }

    return number;
  }

  // DELETE JOB
  async function deleteJob(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs(previousJobs =>
        previousJobs.filter(
          job => String(job.id) !== String(id)
        )
      );
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Unable to delete job.");
    }
  }

  // FILTER JOBS
  const filteredJobs = jobs.filter(job => {
    const searchText = search.toLowerCase().trim();

    const skills = Array.isArray(job.skills)
      ? job.skills.join(" ").toLowerCase()
      : String(job.skills || "").toLowerCase();

    const searchContent = [
      job.title,
      job.company,
      job.location,
      job.category,
      job.description,
      job.jobType,
      skills
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    // SEARCH FILTER
    const searchMatch =
      searchText === "" ||
      searchContent.includes(searchText);

    // CATEGORY FILTER
    const categoryMatch =
      category === "All" ||
      job.category?.toLowerCase() === category.toLowerCase() ||
      job.title?.toLowerCase().includes(category.toLowerCase());

    // JOB TYPE FILTER
    const jobTypeMatch =
      jobType === "All" ||
      job.jobType?.toLowerCase() === jobType.toLowerCase();

    // SALARY FILTER
    const salary = getSalaryValue(job.salary);

    let salaryMatch = true;

    if (salaryRange === "Low") {
      salaryMatch = salary > 0 && salary < 500000;
    } else if (salaryRange === "Medium") {
      salaryMatch = salary >= 500000 && salary <= 1000000;
    } else if (salaryRange === "High") {
      salaryMatch = salary > 1000000;
    }

    return (
      searchMatch &&
      categoryMatch &&
      jobTypeMatch &&
      salaryMatch
    );
  });

  // SORT JOBS
  const finalJobs = [...filteredJobs].sort((a, b) => {
    const salaryA = getSalaryValue(a.salary);
    const salaryB = getSalaryValue(b.salary);

    if (sort === "highest") {
      return salaryB - salaryA;
    }

    if (sort === "lowest") {
      return salaryA - salaryB;
    }

    return 0;
  });

  // CLEAR FILTERS
  function clearFilters() {
    setSearch("");
    setCategory("All");
    setJobType("All");
    setSalaryRange("All");
    setSort("");
  }

  return (
    <div className="jobs-container">

      <h1>Latest Job Opportunities</h1>

      <Link to="/add-job" className="add-btn">
        + Add Job
      </Link>

      {/* FILTER SECTION */}
      <div className="filters">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search Java, Python, company or location"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Python Developer">Python Developer</option>
          <option value="Java Developer">Java Developer</option>
        </select>

        {/* JOB TYPE */}
        <select
          value={jobType}
          onChange={e => setJobType(e.target.value)}
        >
          <option value="All">All Job Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        {/* SALARY RANGE */}
        <select
          value={salaryRange}
          onChange={e => setSalaryRange(e.target.value)}
        >
          <option value="All">All Salary Ranges</option>
          <option value="Low">Below ₹5 LPA</option>
          <option value="Medium">₹5 LPA - ₹10 LPA</option>
          <option value="High">Above ₹10 LPA</option>
        </select>

        {/* SORT BY SALARY */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="">Sort By Salary</option>
          <option value="highest">Highest Salary First</option>
          <option value="lowest">Lowest Salary First</option>
        </select>

        {/* CLEAR FILTERS */}
        <button
          type="button"
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {/* JOB COUNT */}
      <p className="job-count">
        Showing {finalJobs.length} of {jobs.length} jobs
      </p>

      {/* JOB CARDS */}
      <div className="jobs">
        {finalJobs.length > 0 ? (
          finalJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={deleteJob}
            />
          ))
        ) : (
          <p className="no-jobs">
            No jobs found. Try changing your filters.
          </p>
        )}
      </div>

    </div>
  );
}

export default Jobs;
