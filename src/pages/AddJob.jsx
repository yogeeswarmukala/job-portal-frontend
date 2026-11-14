
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    jobType: "",
    experience: "",
    salary: "",
    description: "",
    companyLogo: "",
    skills: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(previousData => ({
      ...previousData,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const salaryValue = Number(formData.salary);

      if (!Number.isFinite(salaryValue) || salaryValue <= 0) {
        alert("Please enter a valid annual salary.");
        return;
      }

      const jobData = {
        ...formData,
        salary: salaryValue,

        // Save skills as an array
        skills: formData.skills
          .split(",")
          .map(skill => skill.trim())
          .filter(Boolean),

        requirements: [],
        qualification: "",

        postedDate: new Date()
          .toISOString()
          .slice(0, 10),

        deadline: ""
      };

      await api.post("/jobs", jobData);

      alert("Job added successfully!");

      navigate("/jobs");

    } catch (error) {
      console.error("Error adding job:", error);
      alert("Unable to add job. Please try again.");
    }
  }

  return (
    <div className="form-container">

      <h2>Add New Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Job Role (Java Developer)"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Python Developer">Python Developer</option>
          <option value="Java Developer">Java Developer</option>
        </select>

        {/* JOB TYPE */}
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <input
          type="text"
          name="experience"
          placeholder="Experience (Fresher / 1-3 Years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        {/* ANNUAL SALARY */}
        <input
          type="number"
          name="salary"
          placeholder="Annual Salary (Example: 1200000)"
          value={formData.salary}
          onChange={handleChange}
          min="1"
          required
        />

        {/* SKILLS */}
        <input
          type="text"
          name="skills"
          placeholder="Skills (Java, Spring Boot, SQL)"
          value={formData.skills}
          onChange={handleChange}
        />

        <input
          type="text"
          name="companyLogo"
          placeholder="Company Logo URL"
          value={formData.companyLogo}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="submit-btn"
        >
          Add Job
        </button>

      </form>

    </div>
  );
}

export default AddJob;
