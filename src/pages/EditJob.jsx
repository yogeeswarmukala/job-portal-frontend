import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

function EditJob() {

  const { id } = useParams();

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
    companyLogo: ""
  });

  useEffect(() => {
    getJob();
  }, [id]);

  async function getJob() {

    try {

      const response = await api.get(`/jobs/${id}`);

      setFormData({
        ...response.data,
        salary: String(response.data.salary)
      });

    } catch (error) {

      console.log(error);

    }
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.put(`/jobs/${id}`, {
        ...formData,
        salary: Number(formData.salary)
      });

      navigate("/jobs");

    } catch (error) {

      console.log(error);

    }
  }

  return (
    <div className="form-container">

      <h2>Edit Job</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />

        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          required
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <input
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          placeholder="Job Type"
          required
        />

        <input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          required
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />

        <input
          name="companyLogo"
          value={formData.companyLogo}
          onChange={handleChange}
          placeholder="Logo URL"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
        />

        <button className="submit-btn">
          Update Job
        </button>

      </form>

    </div>
  );
}

export default EditJob;