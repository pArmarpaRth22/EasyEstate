import React from "react";
import "./aboutPage.scss";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="header">
        <h1>About Us</h1>
      </div>
      <div className="content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At DreamPlace Realty, our mission is to help you find the perfect
            property that fits your lifestyle and needs. We are dedicated to
            providing exceptional service and expert guidance throughout your
            real estate journey.
          </p>
        </section>
        <section className="experience">
          <h2>Our Experience</h2>
          <p>
            With over 16 years of experience in the real estate industry, we
            have garnered a deep understanding of the market and built a robust
            network of satisfied clients. Our expertise ensures that you receive
            the best advice and support in making informed decisions.
          </p>
        </section>
        <section className="values">
          <h2>Our Values</h2>
          <p>
            We believe in integrity, transparency, and customer satisfaction.
            These core values drive our efforts to provide reliable and honest
            services, ensuring that every client feels valued and confident in
            their real estate transactions.
          </p>
        </section>
        <section className="team">
          <h2>Meet Our Team</h2>
          <p>
            Our team of dedicated professionals is here to assist you every step
            of the way. From seasoned real estate agents to knowledgeable
            support staff, we work together to deliver a seamless and positive
            experience for all our clients.
          </p>
        </section>
        <section className="awards">
          <h2>Awards and Recognition</h2>
          <p>
            Over the years, we have been honored with numerous awards,
            recognizing our excellence in the real estate industry. These
            accolades reflect our commitment to providing outstanding service
            and achieving remarkable results for our clients.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
