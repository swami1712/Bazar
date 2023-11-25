import React from "react";
import "./../styles/Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="inner_footer">
        <div className="inner_footer_header">Quick links</div>
        <li>
          <a href="/">Bags</a>
        </li>
        <li>
          <a href="/">Shoes</a>
        </li>
      </div>
      <div className="inner_footer">
        <div className="inner_footer_header">info</div>
        <li>About</li>
        <li>ContactUs</li>
      </div>
      <div className="footer_right"></div>

      <div className="footer_mailsubscrAndicons">
        <div className="subscribeTomail">
          <div className="inner_footer_header">Subscribe to our emails</div>
          <input type="text" placeholder="Email" />
        </div>
        <div className="footer_icons"></div>
      </div>
    </div>
  );
};

export default Footer;
