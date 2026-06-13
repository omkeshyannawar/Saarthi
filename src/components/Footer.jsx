import '../styles/footer.css'
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { SiGmail } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="footer">

      <h2 className="footerTitle">
        Let's Connect
      </h2>

      <div className="socialLinks">

        <a
          href="https://linkedin.com/in/omkeshyannawar"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://github.com/omkeshyannawar"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://omkeshyannawar@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <SiGmail />
        </a>

        <a
          href="https://www.instagram.com/omkeshyannawar?igsh=eHA0aHo1M2g2cHgy"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>

      </div>

      <p className="footerText">
        Thanks for visiting my dashboard 
      </p>

      <p className="copyright">
        © 2026 Omkesh. All Rights Reserved.
      </p>

    </footer>
  );
};

export default Footer;
