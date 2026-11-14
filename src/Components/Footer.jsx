import React, { useState } from "react";

function Footer() {
  const [showCookieNotice, setShowCookieNotice] = useState(true);

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-column">
          <h4>For job seekers</h4>
          <ul>
            <li><a href="#search-jobs">Search jobs</a></li>
            <li><a href="#search-salary">Search salary</a></li>
            <li><a href="#tax-calculator">Tax calculator</a></li>
            <li><a href="#salary-converter">Salary converter</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>For employers</h4>
          <ul>
            <li><a href="#enterprise">Enterprise</a></li>
            <li><a href="#ats">ATS</a></li>
            <li><a href="#publisher-programs">Publisher programs</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>Talent.com</h4>
          <ul>
            <li><a href="#more-countries">More countries</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#cookie-policy">Cookie Policy</a></li>
            <li><a href="#cookies-settings">Cookies Settings</a></li>
            <li><a href="#personal-data">Personal Data Request</a></li>
            <li><a href="#help-center">Help Center</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Cookie Notice Bar */}
      {showCookieNotice && (
        <div className="cookie-banner">
          <p>
            This website uses cookies to enhance site navigation, analyze site
            usage and assist in our marketing efforts. You can find out more
            about our use of cookies in our{" "}
            <a href="#cookie-policy">Cookie Policy</a>.
          </p>
          <button
            className="cookie-close-btn"
            onClick={() => setShowCookieNotice(false)}
            aria-label="Close cookie notice"
          >
            ✕
          </button>
        </div>
      )}
    </footer>
  );
}

export default Footer;