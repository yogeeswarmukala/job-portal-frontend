
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function Home() {
  return (
    <>
      <div className="home">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Find Your Dream Job</h1>

            <p>
              Discover exciting career opportunities from top companies.
              Search thousands of jobs, explore different industries,
              and find the perfect opportunity that matches your skills.
            </p>

            <div className="hero-buttons">
              <Link to="/jobs" className="add-btn">
                Explore Jobs
              </Link>

              <Link to="/add-job" className="post-job-btn">
                Post a Job
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000"
              alt="Professional team working together"
            />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="home-stats">
          <div>
            <h2>1000+</h2>
            <p>Job Opportunities</p>
          </div>

          <div>
            <h2>500+</h2>
            <p>Companies</p>
          </div>

          <div>
            <h2>10000+</h2>
            <p>Job Seekers</p>
          </div>

          <div>
            <h2>50+</h2>
            <p>Job Categories</p>
          </div>
        </section>

        {/* Job Categories */}
        <section className="home-categories">
          <h2>Popular Job Categories</h2>

          <p>
            Explore opportunities across different industries.
          </p>

          <div className="category-grid">

            <div className="category-card">
              <span>💻</span>
              <h3>Technology</h3>
              <p>Software Development, Java, React and Web Development.</p>
            </div>

            <div className="category-card">
              <span>📊</span>
              <h3>Data Science</h3>
              <p>Data Analytics, Artificial Intelligence and Machine Learning.</p>
            </div>

            <div className="category-card">
              <span>🎨</span>
              <h3>UI/UX Design</h3>
              <p>Create attractive and user-friendly digital experiences.</p>
            </div>

            <div className="category-card">
              <span>📱</span>
              <h3>Digital Marketing</h3>
              <p>Explore SEO, social media and digital marketing roles.</p>
            </div>

            <div className="category-card">
              <span>🏢</span>
              <h3>Business</h3>
              <p>Discover management, finance and business opportunities.</p>
            </div>

            <div className="category-card">
              <span>🎓</span>
              <h3>Internships</h3>
              <p>Gain practical experience and start your career.</p>
            </div>

          </div>

          <Link to="/jobs" className="add-btn">
            View All Jobs
          </Link>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-section">
          <h2>Why Choose JobPortal?</h2>

          <p>
            Everything you need to discover your next career opportunity.
          </p>

          <div className="why-grid">

            <div className="why-card">
              <span>🔍</span>
              <h3>Easy Job Search</h3>
              <p>
                Find suitable jobs using categories, locations
                and job types.
              </p>
            </div>

            <div className="why-card">
              <span>🚀</span>
              <h3>Career Growth</h3>
              <p>
                Discover new opportunities and take your
                professional career forward.
              </p>
            </div>

            <div className="why-card">
              <span>⚡</span>
              <h3>Simple Experience</h3>
              <p>
                Explore job details and find opportunities
                through a simple interface.
              </p>
            </div>

          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2>How It Works</h2>

          <p>Start your job search in three simple steps.</p>

          <div className="steps-grid">

            <div className="step-card">
              <span>01</span>
              <h3>Explore Jobs</h3>
              <p>Browse available job opportunities.</p>
            </div>

            <div className="step-card">
              <span>02</span>
              <h3>Find Your Match</h3>
              <p>Choose a job that matches your skills and interests.</p>
            </div>

            <div className="step-card">
              <span>03</span>
              <h3>Apply for Jobs</h3>
              <p>Take the next step towards your dream career.</p>
            </div>

          </div>
        </section>

        {/* Career CTA */}
        <section className="home-cta">
          <h2>Ready to Build Your Future?</h2>

          <p>
            Your dream job is waiting. Explore opportunities
            and take the first step today.
          </p>

          <Link to="/jobs" className="cta-button">
            Find Jobs Now
          </Link>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
