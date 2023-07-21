import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import github from "./icone-github-noir.png";
import linkedin from "./logo-linkedin-removebg-preview.png";

function Footer() {
  return (
    <div className="footer">
      <div>
        <a href="https://github.com/franquesino">
          <img src={github} className="footer-icon-github" alt="" />
          <a href="https://www.linkedin.com/in/franco-rojas-596382248/">
            <img src={linkedin} className="footer-icon-linkedin" alt />
          </a>
        </a>
      </div>
      <div>
        Pi countries Henry. by{" "}
        <span>Franco Rojas</span>
      </div>
    </div>
  );
}

export default Footer;
