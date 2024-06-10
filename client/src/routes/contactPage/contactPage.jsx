import React from "react";
import "./contactPage.scss";

function ContactPage() {
  return (
    <div className="contactPage">
      <h1>Contact Us</h1>
      <div className="contactInfo">
        <div>
          <h2>Address</h2>
          <p>123 Main Street</p>
          <p>City, State, Zip</p>
        </div>
        <div>
          <h2>Email</h2>
          <p>info@example.com</p>
        </div>
        <div>
          <h2>Phone</h2>
          <p>(123) 456-7890</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
